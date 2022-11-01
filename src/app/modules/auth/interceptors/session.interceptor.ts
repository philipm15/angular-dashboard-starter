import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {BehaviorSubject, catchError, filter, Observable, switchMap, take} from 'rxjs';
import {AuthTokenService} from "../services/auth-token.service";
import {AuthService} from "../services/auth.service";

@Injectable()
export class SessionInterceptor implements HttpInterceptor {

  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(private tokenService: AuthTokenService, private authService: AuthService) {
  }

  /**
   * the auth token will appended to each request.
   * If the request returns a 401 the user is signed out automatically.
   *
   * @param request request
   * @param next next handler
   */
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
    const token = this.tokenService.getToken();

    if (token !== null) {
      request = this.addToken(request, token);
    }

    request = request.clone({
      withCredentials: false,
    });

    console.log('SessionInterceptor', request.url.toString());

    return next.handle(request).pipe(
      catchError(error => {
        if (error instanceof HttpErrorResponse) {
          if (request.url.includes('auth/refresh')) {
            this.tokenService.clear();
          }
          if (error.status === 401) {
            const refreshToken = this.tokenService.getRefreshToken();

            if (!refreshToken) {
              this.authService.logout();
              throw error;
            }

            return this.handle401Error(request, next);
          } else {
            throw error;
          }
        } else {
          throw error;
        }
      }),
    );
  }

  private addToken(request: HttpRequest<any>, token: string) {
    return request.clone({setHeaders: {Authorization: `Bearer ${token}`}});
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      return this.authService.refreshToken().pipe(
        switchMap((token: any) => {
          this.isRefreshing = false;
          this.refreshTokenSubject.next(token);
          return next.handle(this.addToken(request, token));
        }));
    } else {
      return this.refreshTokenSubject.pipe(
        filter(token => token != null),
        take(1),
        switchMap(jwt => {
          return next.handle(this.addToken(request, jwt));
        }),
      );
    }
  }

}

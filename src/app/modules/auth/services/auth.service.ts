import {Injectable} from '@angular/core';
import {AuthTokenService} from "./auth-token.service";
import {Observable, of} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private authTokenService: AuthTokenService, private http: HttpClient) {
  }

  initializeSession(): Promise<void> {
    return new Promise(resolve => {
        if (this.authTokenService.getToken()) {
          resolve();
        } else {
          this.logout().subscribe(
            () => resolve()
          )
        }
      }
    )
  }

  // TODO: Typing
  login(email: string, password: string): Observable<any> {
    return this.http.post('http://localhost:3000/auth/login', {email, password});
  }

  logout(): Observable<null> {
    this.authTokenService.clear();
    return of(null);
  }

  // TODO: implement refresh logic & typing
  refreshToken(): Observable<any> {
    return this.http.post('http://localhost:3000/auth/refresh', {refreshToken: this.authTokenService.getRefreshToken()});
  }

}

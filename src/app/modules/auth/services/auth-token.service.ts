import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthTokenService {
  private readonly authTokenKey = 'auth-token';
  private readonly authTokenRefreshKey = 'refresh-token';

  getToken(): string | null {
    try {
      return localStorage.getItem(this.authTokenKey) ?? null;
    } catch (e) {
      return null;
    }
  }

  // set token
  setToken(token: string): void {
    localStorage.setItem(this.authTokenKey, token);
  }

  // get refresh token
  getRefreshToken(): string | null {
    try {
      return localStorage.getItem(this.authTokenRefreshKey) ?? null;
    } catch (e) {
      return null;
    }
  }

  // set refresh token
  setRefreshToken(token: string): void {
    localStorage.setItem(this.authTokenRefreshKey, token);
  }

  // clear tokens
  clear(): void {
    localStorage.removeItem(this.authTokenKey);
    localStorage.removeItem(this.authTokenRefreshKey);
  }
}

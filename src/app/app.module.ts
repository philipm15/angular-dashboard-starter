import {APP_INITIALIZER, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from "@angular/common/http";
import {AuthService} from "./modules/auth/services/auth.service";
import {SessionInterceptor} from "./modules/auth/interceptors/session.interceptor";

export function initializeApp(authService: AuthService) {
  return (): Promise<void> => authService.initializeSession();
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [
    {provide: APP_INITIALIZER, useFactory: initializeApp, deps: [AuthService], multi: true},
    SessionInterceptor
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

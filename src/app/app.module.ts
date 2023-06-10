import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';


import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AuthModule} from "./modules/auth/auth.module";
import {DataModule} from "./data/data.module";
import {AuthLayoutComponent} from "./layout/auth-layout/auth-layout.component";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {TokenInterceptor} from "./core/interceptor/token.interceptor";
import {NgxSpinnerModule} from 'ngx-spinner';
import {ToastrModule, ToastNoAnimationModule} from 'ngx-toastr';
import { SpinnerComponent } from './shared/component/spinner/spinner.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { ContentLayoutComponent } from './layout/content-layout/content-layout.component';
import { AccountLayoutComponent } from './layout/account-layout/account-layout.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthLayoutComponent,
    SpinnerComponent,
    HeaderComponent,
    FooterComponent,
    ContentLayoutComponent,
    AccountLayoutComponent,
  ],
  imports: [
    ToastrModule.forRoot(),
    ToastNoAnimationModule.forRoot(),
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,
    AuthModule,
    DataModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

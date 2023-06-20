import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';


import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AuthModule} from "./modules/auth/auth.module";
import {DataModule} from "./data/data.module";
import {AuthLayoutComponent} from "./layout/auth-layout/auth-layout.component";
import {NgxSpinnerModule} from 'ngx-spinner';
import {ToastrModule, ToastNoAnimationModule} from 'ngx-toastr';
import {SpinnerComponent} from './shared/component/spinner/spinner.component';
import {HeaderComponent} from './layout/header/header.component';
import {FooterComponent} from './layout/footer/footer.component';
import {ContentLayoutComponent} from './layout/content-layout/content-layout.component';
import {AccountLayoutComponent} from './layout/account-layout/account-layout.component';
import {RideModule} from "./modules/ride/ride.module";
import {HomeModule} from "./modules/home/home.module";
import {DatePipe} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {UserModule} from "./modules/user/user.module";


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
    AppRoutingModule,
    ToastrModule.forRoot(),
    ToastNoAnimationModule.forRoot(),
    BrowserModule,
    UserModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,
    AuthModule,
    HomeModule,
    RideModule,
    DataModule,
    ReactiveFormsModule,
    FormsModule
  ],

  providers: [
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: TokenInterceptor,
    //   multi: true
    // }
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

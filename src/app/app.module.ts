import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';


import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AuthModule} from "./modules-user/auth/auth.module";
import {DataModule} from "./data/data.module";
import {AuthLayoutComponent} from "./layout/layout-user/auth-layout/auth-layout.component";
import {NgxSpinnerModule} from 'ngx-spinner';
import {ToastrModule, ToastNoAnimationModule} from 'ngx-toastr';

import { HeaderComponent } from './layout/layout-user/header/header.component';
import { FooterComponent } from './layout/layout-user/footer/footer.component';
import { ContentLayoutComponent } from './layout/layout-user/content-layout/content-layout.component';
import {RideModule} from "./modules-user/ride/ride.module";
import {HomeModule} from "./modules-user/home/home.module";
import {DatePipe} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { AdminHeaderComponent } from './layout/layout-admin/admin-header/admin-header.component';
import { AdminContentLayout } from './layout/layout-admin/admin-content-layout/admin-content-layout.component';
import { AdminSideBarComponent } from './layout/layout-admin/admin-side-bar/admin-side-bar.component';
import {AccountLayoutComponent} from "./layout/layout-user/account-layout/account-layout.component";
import {AdminDashboardModule} from "./modules-admin/dashboard/admin-dashboard.module";
import {UserModule} from "./modules-user/user/user.module";
import {SharedModule} from "./shared/shared.module";


@NgModule({
  declarations: [
    AppComponent,
    AuthLayoutComponent,
    AccountLayoutComponent,
    HeaderComponent,
    FooterComponent,
    ContentLayoutComponent,
    AccountLayoutComponent,
    AdminContentLayout,
    AdminHeaderComponent,
    AdminContentLayout,
    AdminSideBarComponent,
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
    AdminDashboardModule,
    HomeModule,
    RideModule,
    DataModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule
  ],

  providers: [
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

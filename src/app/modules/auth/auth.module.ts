import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AuthRoutingModule} from './auth-routing.module';
import {LoginComponent} from "./page/login/login.component";
import {SignUpOneComponent} from "./page/register/sign-up-1/sign-up-one.component";
import {SignUpTwoComponent} from "./page/register/sign-up-2/sign-up-two.component";
import {TwoFactorAuthComponent} from "./page/register/two-factor-auth/two-factor-auth.component";


@NgModule({
  declarations: [LoginComponent,
    SignUpOneComponent,
    SignUpTwoComponent,
    TwoFactorAuthComponent,],
  imports: [
    CommonModule,
    AuthRoutingModule,

  ]
})
export class AuthModule {
}

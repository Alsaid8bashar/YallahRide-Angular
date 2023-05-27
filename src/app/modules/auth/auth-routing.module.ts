import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./page/login/login.component";
import {SignUpOneComponent} from "./page/register/sign-up-1/sign-up-one.component";
import {SignUpTwoComponent} from "./page/register/sign-up-2/sign-up-two.component";
import {TwoFactorAuthComponent} from "./page/register/two-factor-auth/two-factor-auth.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: '/auth/login',
    pathMatch: 'full',
  },
  {
    path: '',
    children: [
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'sign-up',
        component: SignUpOneComponent,
      },
      {
        path: 'user-info',
        component: SignUpTwoComponent,
      },
      {
        path: 'two-factor-authentication',
        component: TwoFactorAuthComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {
}

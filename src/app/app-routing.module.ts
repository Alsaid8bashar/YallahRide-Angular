import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthLayoutComponent} from "./layout/auth-layout/auth-layout.component";
import {ContentLayoutComponent} from "./layout/content-layout/content-layout.component";
import {ErrorComponent} from "./core/error/error.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: '/auth/login',
    pathMatch: 'full'
  },
  {
    path: '',
    component: ContentLayoutComponent,
    // canActivate: [NoAuthGuard], // Should be replaced with actual auth guard
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./modules/home/home.module').then(m => m.HomeModule)
      },
      {
        path: 'user',
        loadChildren: () =>
          import('./modules/user/user.module').then(m => m.UserModule)
      },
      {
        path: 'ride',
        loadChildren: () =>
          import('./modules/ride/ride.module').then(m => m.RideModule)
      },

    ]
  },
  {
    path: 'auth',
    component: AuthLayoutComponent,
    loadChildren: () =>
      import('./modules/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'account',
    // component: AccountLayoutComponent,
    loadChildren: () =>
      import('./modules/account/account.module').then((m) => m.AccountModule),
  },
  {
    path: '**',
    component: ErrorComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: true,
    })
  ],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule {
}

import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ErrorComponent} from "./core/error/error.component";
import {ContentLayoutComponent} from "./layout/layout-user/content-layout/content-layout.component";
import {AdminContentLayout} from "./layout/layout-admin/admin-content-layout/admin-content-layout.component";

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
          import('./modules-user/home/home.module').then(m => m.HomeModule)
      },
      {

        path: 'ride',
        loadChildren: () =>
          import('./modules-user/ride/ride.module').then(m => m.RideModule)
      },
      {
        path: 'user',
        loadChildren: () =>
          import('./modules-user/user/user.module').then(m => m.UserModule)
      },
      {
        path: 'report',
        loadChildren: () =>
          import('./modules-user/report/report.module').then(m => m.ReportModule)
      },
      {
        path: 'account',
        loadChildren: () =>
          import('./modules-user/account/account.module').then((m) => m.AccountModule),
      },
    ]
  },
  {
    path: 'admin',
    component: AdminContentLayout,
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./modules-admin/dashboard/admin-dashboard.module').then(m => m.AdminDashboardModule)
      },

    ]
  },


  {
    path: 'auth',
    loadChildren: () =>
      import('./modules-user/auth/auth.module').then((m) => m.AuthModule),
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

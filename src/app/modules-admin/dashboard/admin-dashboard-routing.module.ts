import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {AddRideComponent} from "../../modules-user/account/page/account-rides/add-ride/add-ride.component";
import {AdminHomeComponent} from "./page/admin-home/admin-home.component";
import {AdminAccountSettingsComponent} from "./page/admin-account-settings/admin-account-settings.component";
import {AdminReportDetailsComponent} from "./page/report/report-details/admin-report-details.component";
import {AdminUsersListComponent} from "./page/users-list/admin-users-list.component";
import {AdminUserDetailsComponent} from "./page/user-details/admin-user-details.component";
import {AdminRideListComponent} from "./page/ride-list/admin-ride-list.component";
import {ReportComponent} from "./page/report/report.component";


const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: '',
    children: [
      {
        path: 'home',
        component: AdminHomeComponent,
      },
      {
        path: 'account/settings',
        component: AdminAccountSettingsComponent,
      },
      {
        path: 'report/user/details/:id',
        component: AdminReportDetailsComponent, data: {routeName: 'users'}
      },
      {
        path: 'report/ride/details/:id',
        component: AdminReportDetailsComponent, data: {routeName: 'rides'}
      },
      {
        path: 'reports/users',
        component: ReportComponent, data: {routeName: 'users'}
      },
      {
        path: 'reports/rides',
        component: ReportComponent, data: {routeName: 'rides'}
      },
      {
        path: 'users/list',
        component: AdminUsersListComponent,
      },
      {
        path: 'rides/list',
        component: AdminRideListComponent,
      },
      {
        path: 'users/details/:id',
        component: AdminUserDetailsComponent,
      },
    ],
  },
  {
    path: 'add-ride',
    component: AddRideComponent
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminDashboardRoutingModule {
}

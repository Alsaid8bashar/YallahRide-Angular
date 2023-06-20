import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {AddRideComponent} from "../../modules-user/account/page/account-rides/add-ride/add-ride.component";
import {AdminContentLayout} from "../../layout/layout-admin/admin-content-layout/admin-content-layout.component";
import {AdminHomeComponent} from "./page/admin-home/admin-home.component";
import {AdminAccountSettingsComponent} from "./page/admin-account-settings/admin-account-settings.component";
import {AdminReportDetailsComponent} from "./page/report-details/admin-report-details.component";
import {AdminUsersListComponent} from "./page/users-list/admin-users-list.component";
import {AdminUserDetailsComponent} from "./page/user-details/admin-user-details.component";


const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard/home',
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
        path: 'reports/details',
        component: AdminReportDetailsComponent,
      },
      {
        path: 'users/list',
        component: AdminUsersListComponent,
      },
      {
        path: 'users/details',
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

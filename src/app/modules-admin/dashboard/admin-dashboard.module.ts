import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AdminAccountSettingsComponent} from "./page/admin-account-settings/admin-account-settings.component";
import {AdminHomeComponent} from "./page/admin-home/admin-home.component";
import {AdminReportDetailsComponent} from "./page/report-details/admin-report-details.component";
import {AdminUsersListComponent} from "./page/users-list/admin-users-list.component";
import {AdminUserDetailsComponent} from "./page/user-details/admin-user-details.component";
import {AdminDashboardRoutingModule} from "./admin-dashboard-routing.module";
import {SharedModule} from "../../shared/shared.module";


@NgModule({
  declarations: [
    AdminAccountSettingsComponent,
    AdminHomeComponent,
    AdminReportDetailsComponent,
    AdminUsersListComponent,
    AdminUserDetailsComponent
  ],
  imports: [
    CommonModule,
    AdminDashboardRoutingModule,
    SharedModule
  ]
})
export class AdminDashboardModule {

}

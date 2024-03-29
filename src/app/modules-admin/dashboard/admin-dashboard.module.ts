import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AdminAccountSettingsComponent} from "./page/admin-account-settings/admin-account-settings.component";
import {AdminHomeComponent} from "./page/admin-home/admin-home.component";
import {AdminReportDetailsComponent} from "./page/report/report-details/admin-report-details.component";
import {AdminUsersListComponent} from "./page/users-list/admin-users-list.component";
import {AdminUserDetailsComponent} from "./page/user-details/admin-user-details.component";
import {AdminDashboardRoutingModule} from "./admin-dashboard-routing.module";
import {SharedModule} from "../../shared/shared.module";
import {RideModule} from "../../modules-user/ride/ride.module";
import { AdminRideListComponent } from './page/ride-list/admin-ride-list.component';
import { UserCardComponent } from './page/users-list/user-card/user-card.component';
import {UserModule} from "../../modules-user/user/user.module";
import {AccountModule} from "../../modules-user/account/account.module";
import { ReportComponent } from './page/report/report.component';
import { ReportTableComponent } from './page/report/report-table/report-table.component';


@NgModule({
    declarations: [
        AdminAccountSettingsComponent,
        AdminHomeComponent,
        AdminReportDetailsComponent,
        AdminUsersListComponent,
        AdminUserDetailsComponent,
        AdminRideListComponent,
        UserCardComponent,
        ReportComponent,
        ReportTableComponent
    ],
    exports: [
        UserCardComponent
    ],

  imports: [
    SharedModule,
    CommonModule,
    AdminDashboardRoutingModule,
    RideModule,
    AccountModule,
    UserModule
  ]
})
export class AdminDashboardModule {

}

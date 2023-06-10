import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountProfileComponent } from './page/account-profile/account-profile.component';
import { AccountRidesComponent } from './page/account-rides/account-rides.component';
import { AccountBookingsComponent } from './page/account-bookings/account-bookings.component';
import { AccountTravelPreferencesComponent } from './page/account-travel-preferences/account-travel-preferences.component';
import { AccountVehiclesComponent } from './page/account-vehicles/account-vehicles.component';
import { AccountDeleteComponent } from './page/account-delete/account-delete.component';
import { AccountFeedbackComponent } from './page/account-feedback/account-feedback.component';
import {AccountRoutingModule} from "./account-routing.module";



@NgModule({
  declarations: [
    AccountProfileComponent,
    AccountRidesComponent,
    AccountBookingsComponent,
    AccountTravelPreferencesComponent,
    AccountVehiclesComponent,
    AccountDeleteComponent,
    AccountFeedbackComponent
  ],
  imports: [
    CommonModule,
    AccountRoutingModule
  ]
})
export class AccountModule { }

import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AccountProfileComponent} from './page/account-profile/account-profile.component';
import {AccountRidesComponent} from './page/account-rides/account-rides.component';
import {AccountBookingsComponent} from './page/account-bookings/account-bookings.component';
import {
  AccountTravelPreferencesComponent
} from './page/account-travel-preferences/account-travel-preferences.component';
import {AccountVehiclesComponent} from './page/account-vehicles/account-vehicles.component';
import {AccountDeleteComponent} from './page/account-delete/account-delete.component';
import {AccountFeedbackComponent} from './page/account-feedback/account-feedback.component';
import {AccountRoutingModule} from "./account-routing.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "../../shared/shared.module";
import {RideCardComponent} from './page/account-rides/ride-card/ride-card.component';
import {HomeRoutingModule} from "../home/home-routing.module";
import {RideDetailsComponent} from './page/account-rides/ride-details/ride-details.component';
import {RideModule} from "../ride/ride.module";
import {RideRequestComponent} from './page/account-rides/ride-request/ride-request.component';
import {SpinnerComponent} from "../../shared/component/spinner/spinner.component";


@NgModule({
  declarations: [
    AccountProfileComponent,
    AccountRidesComponent,
    AccountBookingsComponent,
    AccountTravelPreferencesComponent,
    AccountVehiclesComponent,
    AccountDeleteComponent,
    AccountFeedbackComponent,
    RideCardComponent,
    RideDetailsComponent,
    RideRequestComponent,
  ],
  imports: [
    CommonModule,
    AccountRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    RideModule,
  ]
})
export class AccountModule {
}

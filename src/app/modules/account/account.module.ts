import {NgModule} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
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
import {RideDetailsComponent} from './page/account-rides/ride-details/ride-details.component';
import {RideModule} from "../ride/ride.module";
import {RideRequestComponent} from './page/account-rides/ride-request/ride-request.component';
import {AddRideComponent} from './page/account-rides/add-ride/add-ride.component';
import {MatSelectModule} from "@angular/material/select";

import {VehiclesDetailsComponent} from './page/account-vehicles/vehicles-details/vehicles-details.component';
import { AddVehicleComponent } from './page/account-vehicles/add-vehicle/add-vehicle.component';
import { ManageVehicleComponent } from './page/account-vehicles/manage-vehicle/manage-vehicle.component';
import { PassengerCardComponent } from './page/account-bookings/passenger-card/passenger-card.component';


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
    AddRideComponent,

    VehiclesDetailsComponent,
    AddVehicleComponent,
    ManageVehicleComponent,

    PassengerCardComponent,

  ],
  imports: [
    MatSelectModule,
    CommonModule,
    AccountRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    RideModule,
    NgOptimizedImage,
  ]
})
export class AccountModule {

}

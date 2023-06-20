import {NgModule} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';

import {RideRoutingModule} from './ride-routing.module';
import {RideListComponent} from './page/ride-list/ride-list.component';
import {RideDetailsComponent} from './page/ride-details/ride-details.component';
import {RideCardComponent} from './page/ride-card/ride-card.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RideDetailsCardComponent} from './page/ride-details-card/ride-details-card.component';
import {BookingConfirmComponent} from './page/booking-confirm/booking-confirm.component';
import {NouisliderComponent, NouisliderModule} from "ng2-nouislider";
import {UserRoutingModule} from "../user/user-routing.module";
import {UserModule} from "../user/user.module";
import {User} from "../../data/schema/user";


@NgModule({
  declarations: [
    RideListComponent,
    RideDetailsComponent,
    RideCardComponent,
    RideDetailsCardComponent,
    BookingConfirmComponent,
  ],
  exports: [
    RideDetailsCardComponent
  ],
  imports: [
    CommonModule,
    RideRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgOptimizedImage,
    NouisliderComponent,
    NouisliderModule
  ]
})
export class RideModule {
}

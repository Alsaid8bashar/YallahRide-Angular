import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RideRoutingModule } from './ride-routing.module';
import { RideListComponent } from './page/ride-list/ride-list.component';
import { RideDetailsComponent } from './page/ride-details/ride-details.component';
import { RideCardComponent } from './page/ride-card/ride-card.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    RideListComponent,
    RideDetailsComponent,
    RideCardComponent
  ],
  imports: [
    CommonModule,
    RideRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class RideModule { }

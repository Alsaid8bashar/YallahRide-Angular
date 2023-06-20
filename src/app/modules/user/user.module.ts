import {NgModule} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';

import {UserRoutingModule} from './user-routing.module';
import {UserCardComponent} from './page/user-card/user-card.component';
import {UserDetailsComponent} from './page/user-details/user-details.component';
import {RideRoutingModule} from "../ride/ride-routing.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NouisliderComponent, NouisliderModule} from "ng2-nouislider";


@NgModule({
  declarations: [
    UserCardComponent,
    UserDetailsComponent
  ],
  exports: [
    UserCardComponent, UserDetailsComponent
  ],
  imports: [
    UserRoutingModule,
    CommonModule,
  ]
})
export class UserModule {
}

import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {UserRoutingModule} from './user-routing.module';
import {UserCardComponent} from './page/user-card/user-card.component';
import {UserDetailsComponent} from './page/user-details/user-details.component';
import { UserCardDetailsComponent } from './page/user-card-details/user-card-details.component';
import { UserRatesCardComponent } from './page/user-rates-card/user-rates-card.component';
import { RaterCardComponent } from './page/rater-card/rater-card.component';
import {SharedModule} from "../../shared/shared.module";


@NgModule({
  declarations: [
    UserCardComponent,
    UserDetailsComponent,
    UserCardDetailsComponent,
    UserRatesCardComponent,
    RaterCardComponent
  ],
  exports: [
    UserCardComponent, UserDetailsComponent
  ],
  imports: [
    UserRoutingModule,
    CommonModule,
    SharedModule,
  ]
})
export class UserModule {
}

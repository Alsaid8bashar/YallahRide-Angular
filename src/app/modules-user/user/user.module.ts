import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {UserRoutingModule} from './user-routing.module';
import {UserCardComponent} from './page/user-card/user-card.component';
import {UserDetailsComponent} from './page/user-details/user-details.component';
import { UserCardDetailsComponent } from './page/user-card-details/user-card-details.component';
import { UserRatesCardComponent } from './page/user-rates-card/user-rates-card.component';


@NgModule({
  declarations: [
    UserCardComponent,
    UserDetailsComponent,
    UserCardDetailsComponent,
    UserRatesCardComponent
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

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserCardComponent } from './page/user-card/user-card.component';
import { UserDetailsComponent } from './page/user-details/user-details.component';


@NgModule({
  declarations: [
    UserCardComponent,
    UserDetailsComponent
  ],
  exports: [
    UserCardComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule
  ]
})
export class UserModule { }

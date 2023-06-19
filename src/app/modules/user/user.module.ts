import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserCardComponent } from './page/user-card/user-card.component';


@NgModule({
  declarations: [
    UserCardComponent
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

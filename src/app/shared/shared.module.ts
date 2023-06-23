import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {ControlMessagesComponent} from "./component/control-messages/control-messages.component";
import {MatFormFieldModule} from "@angular/material/form-field";
import {SpinnerComponent} from "./component/spinner/spinner.component";
import {NgxSpinnerModule} from "ngx-spinner";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    NgxSpinnerModule,
  ],
  declarations: [ControlMessagesComponent,SpinnerComponent],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    RouterModule,
    ControlMessagesComponent,
    SpinnerComponent
  ]
})
export class SharedModule {

}

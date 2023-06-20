import { NgModule } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import { ErrorComponent } from './error/error.component';



@NgModule({
  declarations: [
    ErrorComponent
  ],
    imports: [
        CommonModule,
        NgOptimizedImage
    ]
})
export class CoreModule { }

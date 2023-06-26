import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {HomeRoutingModule} from './home-routing.module';
import {HomeComponent} from './page/home.component';
import {SharedModule} from "../../shared/shared.module";
import { FaqComponent } from './page/faq/faq.component';
import { AboutComponent } from './page/about/about.component';


@NgModule({
  declarations: [
    HomeComponent,
    FaqComponent,
    AboutComponent
  ],
    imports: [
        CommonModule,
        HomeRoutingModule,
        SharedModule
    ]
})

export class HomeModule {
}

import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ReportComponent} from "./Page/report.component";

const routes: Routes = [
  {
    path: 'user/:id',
    component: ReportComponent, data: {routeName: 'users'}
  },
  {
    path: 'ride/:id',
    component: ReportComponent, data: {routeName: 'rides'}
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportRoutingModule {
}

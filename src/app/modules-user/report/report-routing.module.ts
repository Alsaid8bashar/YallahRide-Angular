import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RideListComponent} from "../ride/page/ride-list/ride-list.component";
import {ReportComponent} from "./Page/report.component";

const routes: Routes = [
  {
    path: 'report-member',
    component: ReportComponent,
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportRoutingModule {
}

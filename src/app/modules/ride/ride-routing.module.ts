import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RideDetailsComponent} from "./page/ride-details/ride-details.component";
import {RideListComponent} from "./page/ride-list/ride-list.component";
import {BookingConfirmComponent} from "./page/booking-confirm/booking-confirm.component";

const routes: Routes = [
  {
    path: 'details/:id',
    component: RideDetailsComponent,
  },
  {
    path: 'list',
    component: RideListComponent,
  },
  {
    path: 'booking-confirm/:id',
    component: BookingConfirmComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RideRoutingModule {
}

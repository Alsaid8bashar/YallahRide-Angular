import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RideDetailsComponent} from "./page/ride-details/ride-details.component";
import {RideListComponent} from "./page/ride-list/ride-list.component";

const routes: Routes = [{
  path: 'ride-details/:id',
  component: RideDetailsComponent,
},
  {
    path: 'rides',
    component: RideListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RideRoutingModule {
}

import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RideDetailsComponent} from "../ride/page/ride-details/ride-details.component";
import {UserDetailsComponent} from "./page/user-details/user-details.component";

const routes: Routes = [
  {
    path: 'details/:id',
    component: UserDetailsComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {
}

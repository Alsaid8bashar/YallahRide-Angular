import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {AccountProfileComponent} from "./page/account-profile/account-profile.component";
import {AccountFeedbackComponent} from "./page/account-feedback/account-feedback.component";
import {AccountDeleteComponent} from "./page/account-delete/account-delete.component";
import {AccountBookingsComponent} from "./page/account-bookings/account-bookings.component";
import {AccountRidesComponent} from "./page/account-rides/account-rides.component";
import {
  AccountTravelPreferencesComponent
} from "./page/account-travel-preferences/account-travel-preferences.component";


const routes: Routes = [
  {
    path: '',
    redirectTo: '/account/profile',
    pathMatch: 'full',
  },
  {
    path: '',
    children: [
      {
        path: 'profile',
        component: AccountProfileComponent,
      },
      {
        path: 'feedback',
        component: AccountFeedbackComponent,
      },
      {
        path: 'delete',
        component: AccountDeleteComponent,
      },
      {
        path: 'bookings',
        component: AccountBookingsComponent,
      },
      {
        path: 'rides',
        component: AccountRidesComponent,
      },
      {
        path: 'travel-preferences',
        component: AccountTravelPreferencesComponent,
      },
      {
        path: 'vehicles',
        component: AccountBookingsComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule {

}

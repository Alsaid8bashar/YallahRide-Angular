import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./page/home.component";
import {FaqComponent} from "./page/faq/faq.component";
import {AboutComponent} from "./page/about/about.component";

const routes: Routes = [{
  path: '',
  redirectTo: '/home',
  pathMatch: 'full'
},
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'faq',
    component: FaqComponent
  },
  {
    path: 'about',
    component: AboutComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule {
}

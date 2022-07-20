import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AqwalListingComponent } from "./aqwal-listing/aqwal-listing.component";
import { AqwalDetailComponent } from "./aqwal-detail/aqwal-detail.component";
import { AqwalLayoutComponent } from "./aqwal-layout/aqwal-layout.component";
const routes: Routes = [
  { path:'aqwal',  component: AqwalLayoutComponent ,children:[
    {
      path:'', redirectTo:'aqwal-listing' , pathMatch:"full"
    },
    {
      path:'aqwal-listing', component:AqwalListingComponent
    },
    {
      path:'aqwal-detail',
      component: AqwalDetailComponent,
    },
  ]
  }];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AqwalRoutingModule { }

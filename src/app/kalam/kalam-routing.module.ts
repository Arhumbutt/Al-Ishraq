import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { KalamListingComponent } from "./kalam-listing/kalam-listing.component";
import { KalamDetailComponent } from "./kalam-detail/kalam-detail.component";
import { KalamLayoutComponent } from "./kalam-layout/kalam-layout.component";
const routes: Routes = [
  { path:'kalam',  component: KalamLayoutComponent ,children:[
    {
      path:'',redirectTo:'kalam-listing' , pathMatch:"full"
    },
    {
      path:'kalam-listing', component:KalamListingComponent
    },
    {
      path:'kalam-detail',
      component: KalamDetailComponent,
    },
  ]
  }];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class KalamRoutingModule { }

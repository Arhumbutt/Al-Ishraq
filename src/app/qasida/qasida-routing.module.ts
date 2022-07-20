import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QasidaListingComponent } from "./qasida-listing/qasida-listing.component";
import { QasidaDetailComponent } from "./qasida-detail/qasida-detail.component";
import { QasidaLayoutComponent } from "./qasida-layout/qasida-layout.component";
const routes: Routes = [
  { path:'qasida',  component: QasidaLayoutComponent ,children:[
    {
      path:'',redirectTo:'qasida-listing' , pathMatch:"full"
    },
    {
      path:'qasida-listing', component:QasidaListingComponent
    },
    {
      path:'qasida-detail',
      component: QasidaDetailComponent,
    },
  ]
  }];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QasidaRoutingModule { }

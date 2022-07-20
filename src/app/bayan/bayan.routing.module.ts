import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BayanMenuComponent } from "./bayan-menu/bayan-menu.component";
import { BayanDetailComponent } from "./bayan-detail/bayan-detail.component";
import { BayanLayoutComponent } from "./bayan-layout/bayan-layout.component";
const routes: Routes = [
  { path:'bayan',  component: BayanLayoutComponent ,children:[
    {
      path:'',redirectTo:'bayan-menu' , pathMatch:"full"
    },
    {
      path:'bayan-menu', component:BayanMenuComponent
    },
    {
      path:'bayan-detail',
      component: BayanDetailComponent,
    },
  ]
  }];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BayaanRoutingModule { }

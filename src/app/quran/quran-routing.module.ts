import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QuranListingComponent } from "./quran-listing/quran-listing.component";
import { QuranDetailComponent } from "./quran-detail/quran-detail.component";
import { QuranLayoutComponent } from "./quran-layout/quran-layout.component";
const routes: Routes = [
  { path:'quran',  component: QuranLayoutComponent ,children:[
    {
      path:'',redirectTo:'quran-listing' , pathMatch:"full"
    },
    {
      path:'quran-listing', component:QuranListingComponent
    },
    {
      path:'quran-detail',
      component: QuranDetailComponent,
    },
  ]
  }];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuranRoutingModule { }

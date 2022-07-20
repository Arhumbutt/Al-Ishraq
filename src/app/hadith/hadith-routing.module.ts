import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HadithListingComponent } from "./hadith-listing/hadith-listing.component";
import { HadithDetailComponent } from "./hadith-detail/hadith-detail.component";
import { HadithLayoutComponent } from "./hadith-layout/hadith-layout.component";
const routes: Routes = [
  { path:'hadith',  component: HadithLayoutComponent ,children:[
    {
      path:'',redirectTo:'hadith-listing' , pathMatch:"full"
    },
    {
      path:'hadith-listing', component:HadithListingComponent
    },
    {
      path:'hadith-detail',
      component: HadithDetailComponent,
    },
  ]
  }];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HadithRoutingModule { }

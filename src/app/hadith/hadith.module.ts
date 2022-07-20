import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HadithListingComponent } from './hadith-listing/hadith-listing.component';
import { SharedModule } from "./../shared/module/shared.module";
import { HadithRoutingModule } from "./hadith-routing.module";
import { ReactiveFormsModule , FormsModule } from '@angular/forms';
import { HadithDetailComponent } from './hadith-detail/hadith-detail.component';
import { HadithLayoutComponent } from './hadith-layout/hadith-layout.component';
import { HomeModule } from "./../home/home.module";


@NgModule({
  declarations: [HadithListingComponent, HadithDetailComponent, HadithLayoutComponent ],
  imports: [
    CommonModule , SharedModule , HadithRoutingModule , ReactiveFormsModule , FormsModule ,HomeModule
  ]
})
export class HadithModule { }

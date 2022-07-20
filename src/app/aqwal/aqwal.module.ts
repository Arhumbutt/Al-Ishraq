import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AqwalListingComponent } from './aqwal-listing/aqwal-listing.component';
import { SharedModule } from "./../shared/module/shared.module";
import { AqwalRoutingModule } from "./aqwal-routing-modue";
import { ReactiveFormsModule , FormsModule } from '@angular/forms';
import { AqwalDetailComponent } from './aqwal-detail/aqwal-detail.component';
import { AqwalLayoutComponent } from './aqwal-layout/aqwal-layout.component';
import { HomeModule } from "./../home/home.module";


@NgModule({
  declarations: [AqwalListingComponent, AqwalDetailComponent, AqwalLayoutComponent ],
  imports: [
    CommonModule , SharedModule , AqwalRoutingModule , ReactiveFormsModule , FormsModule ,HomeModule
  ]
})
export class AqwaalModule { }

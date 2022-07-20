import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KalamListingComponent } from './kalam-listing/kalam-listing.component';
import { KalamLayoutComponent } from './kalam-layout/kalam-layout.component';
import { KalamDetailComponent } from './kalam-detail/kalam-detail.component';
import { SharedModule } from "./../shared/module/shared.module";
import { KalamRoutingModule } from "./kalam-routing.module";
import { HomeModule } from "./../home/home.module";



@NgModule({
  declarations: [KalamListingComponent, KalamLayoutComponent, KalamDetailComponent],
  imports: [
    CommonModule , SharedModule , KalamRoutingModule , HomeModule
  ]
})
export class KalamModule { }

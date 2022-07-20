import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QasidaLayoutComponent } from './qasida-layout/qasida-layout.component';
import { QasidaListingComponent } from './qasida-listing/qasida-listing.component';
import { QasidaDetailComponent } from './qasida-detail/qasida-detail.component';
import { QasidaRoutingModule } from "./qasida-routing.module";
import { HomeModule } from "../home/home.module";
import { SharedModule } from "./../shared/module/shared.module";


@NgModule({
  declarations: [QasidaLayoutComponent, QasidaListingComponent, QasidaDetailComponent],
  imports: [
    CommonModule , QasidaRoutingModule , HomeModule , SharedModule
  ]
})
export class QasidaModule { }

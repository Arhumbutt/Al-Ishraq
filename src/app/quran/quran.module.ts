import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuranDetailComponent } from './quran-detail/quran-detail.component';
import { QuranListingComponent } from './quran-listing/quran-listing.component';
import { QuranLayoutComponent } from './quran-layout/quran-layout.component';
import {QuranRoutingModule} from './quran-routing.module'
import { HomeModule } from './../home/home.module';
import { SharedModule } from "./../shared/module/shared.module";


@NgModule({
  declarations: [ QuranDetailComponent, QuranListingComponent, QuranLayoutComponent],
  imports: [
    CommonModule , QuranRoutingModule , HomeModule , SharedModule
  ]
})
export class QuranModule { }

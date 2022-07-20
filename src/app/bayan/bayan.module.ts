import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BayanMenuComponent } from './bayan-menu/bayan-menu.component';
import { BayaanRoutingModule } from "./bayan.routing.module";
import { SharedModule } from './../shared/module/shared.module';
import { BayanDetailComponent } from "./bayan-detail/bayan-detail.component";
import { BayanLayoutComponent } from "./bayan-layout/bayan-layout.component";
import { HomeModule } from "../home/home.module";
import { FormsModule , ReactiveFormsModule} from '@angular/forms';
@NgModule({
  declarations: [BayanMenuComponent , BayanDetailComponent , BayanLayoutComponent],
  imports: [
    CommonModule, BayaanRoutingModule , SharedModule ,HomeModule , FormsModule , ReactiveFormsModule
  ]
})
export class BayanModule { }

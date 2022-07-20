import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NavAdminRoutingModule } from './nav-admin-routing.module';
import { NavAdminMenuComponent } from './nav-admin-menu/nav-admin-menu.component';


@NgModule({
  declarations: [NavAdminMenuComponent],
  imports: [
    CommonModule,
    NavAdminRoutingModule
  ],
})
export class NavAdminModule { }

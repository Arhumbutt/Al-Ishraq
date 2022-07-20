import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { SharedModule } from '@app/shared/module/shared.module';
import { NavRoutingModule } from './nav-routing.module';

import { FooterModule } from '@app/nav/shared/footer/footer.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [NavMenuComponent],
  imports: [
    CommonModule,
    NavRoutingModule,
    SharedModule,
    FooterModule,
    RouterModule
  ]
})
export class NavModule { }

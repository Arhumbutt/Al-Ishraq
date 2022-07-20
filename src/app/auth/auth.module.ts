import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { SharedModule } from './../shared/module/shared.module';
import { SigninComponent } from './signin/signin.component';
import { UnsubscribeEmailComponent } from './unsubscribe-email/unsubscribe-email.component';


@NgModule({
  declarations: [SigninComponent, UnsubscribeEmailComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    SharedModule
  ]
})
export class AuthModule { }

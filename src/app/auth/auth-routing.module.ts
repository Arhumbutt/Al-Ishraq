import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SigninComponent } from './signin/signin.component';
import { UnsubscribeEmailComponent } from './unsubscribe-email/unsubscribe-email.component';

const routes: Routes = [
  {
    path: 'login',
    component: SigninComponent,
    data: {
      breadcrumb: null
    },
  },

  {
    path: 'unsubscribe/:email',
    component: UnsubscribeEmailComponent,
    data: {
      breadcrumb: null
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }

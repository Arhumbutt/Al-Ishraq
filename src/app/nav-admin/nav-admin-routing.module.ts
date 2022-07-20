import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NavAdminMenuComponent } from './nav-admin-menu/nav-admin-menu.component';

const myChildren: any = [

  {
    path: '',
    loadChildren: () => import('@app/admin/admin.module').then(m => m.AdminModule),
    data: {
      breadcrumb: 'Admin'
    },
  },

];

const routes: Routes = [
  {
    path: '',
    component: NavAdminMenuComponent,
    children: [...myChildren]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NavAdminRoutingModule { }

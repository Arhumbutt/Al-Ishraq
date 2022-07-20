import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from '@app/home/home-page/home-page.component';
import { NavMenuComponent } from '@app/nav/nav-menu/nav-menu.component';

const myChildren: any = [

  {
    path: 'home',
    loadChildren: () => import('@app/home/home.module').then(m => m.HomeModule),
    data: {
      breadcrumb: 'Home'
    },
  },

];

const routes: Routes = [
  {
    path: '',
    component: NavMenuComponent,
    children: [...myChildren]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NavRoutingModule { }

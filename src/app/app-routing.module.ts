import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from '@app/auth/authguard.service';

const routes: Routes = [

  { path: '', redirectTo: '/', pathMatch: 'full' },
  {
    path: 'admin',
    loadChildren: () => import('@app/nav-admin/nav-admin.module').then(m => m.NavAdminModule),
    data: {
      preload: true,
      delay: false
    },
  },
  {
    path: 'hadith',
    loadChildren: () => import('@app/hadith/hadith.module').then(m => m.HadithModule),
    data: {
      preload: true,
      delay: false
    },
  },
  {
    path: 'quran',
    loadChildren: () => import('@app/quran/quran.module').then(m => m.QuranModule),
    data: {
      preload: true,
      delay: false
    },
  },
  {
    path: 'qasida',
    loadChildren: () => import('@app/qasida/qasida.module').then(m => m.QasidaModule),
    data: {
      preload: true,
      delay: false
    },
  },
  {
    path: 'aqwal',
    loadChildren: () => import('@app/aqwal/aqwal.module').then(m => m.AqwaalModule),
    data: {
      preload: true,
      delay: false
    },
  },
  {
    path: 'kalam',
    loadChildren: () => import('@app/kalam/kalam.module').then(m => m.KalamModule),
    data: {
      preload: true,
      delay: false
    },
  },
  {
    path: 'bayan',
    loadChildren: () => import('./bayan/bayan.module').then(m => m.BayanModule),
    data: {
      preload: true,
      delay: false
    },
  },
  {
    path: '',
    loadChildren: () => import('@app/home/home.module').then(m => m.HomeModule),
    data: {
      preload: true,
      delay: false
    },
  },
  {
    path: 'auth',
    loadChildren: () => import('@app/auth/auth.module').then(m => m.AuthModule),
    data: {
      preload: true,
      delay: false
    },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

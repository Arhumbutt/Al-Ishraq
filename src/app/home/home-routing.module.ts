import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { MenuFormComponent } from './menu-form/menu-form.component';
import { BayanMenuComponent } from "./../bayan/bayan-menu/bayan-menu.component";
import { QuestionFormComponent } from './question-form/question-form.component';
import { TranslationDetailComponent } from './translation-detail/translation-detail.component';
import { HomeLayoutComponent } from "./home-layout/home-layout.component";
import { HadithListingComponent } from "./../hadith/hadith-listing/hadith-listing.component";
const routes: Routes = [
  { path:'', component: HomeLayoutComponent, children:[
    { path: '', pathMatch: 'full', component: HomePageComponent },
        {
          path: 'tranlation-detail',
          component: TranslationDetailComponent,
          data: {
            breadcrumb: 'Translation Detail'
          },
        },
        {
          path: 'question',
          component: QuestionFormComponent,
          data: {
          breadcrumb: 'Add Translation'
         }},
         {
          path: 'qamoose',
          component: MenuFormComponent,
          data: {
          breadcrumb: 'Add Translation'
         }}

  ]}

];

// const routes: Routes = [
//   {
//     path: '',
//     component: HomePageComponent,
//     data: {
//       breadcrumb: ''
//     },
//   },
//   {
//     path: 'question',
//     component: QuestionFormComponent,
//     data: {
//       breadcrumb: 'Add Translation'
//     },
//   },
//   {
//     path: 'question/:id',
//     component: QuestionFormComponent,
//     data: {
//       breadcrumb: 'Edit Translation'
//     },
//   },
//   {
//     path: 'tranlation-detail/:id',
//     component: TranslationDetailComponent,
//     data: {
//       breadcrumb: 'Translation Detail'
//     },
//   },
//   {
//     path: '/:name',
//     component: MenuFormComponent,
//     data: {
//       breadcrumb: 'Translation Detail'
//     },

//   }
// ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }

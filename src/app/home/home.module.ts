import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import {  RouterModule } from '@angular/router';
import { QuestionFormComponent } from './question-form/question-form.component';
import { SharedModule } from '@app/shared/module/shared.module';
import { TranslationDetailComponent } from './translation-detail/translation-detail.component';
import { MenuFormComponent } from './menu-form/menu-form.component';
import { FeedBackComponent } from './feed-back/feed-back.component';
import { FooterComponent } from "./footer/footer.component";
import { HomePageComponent } from "./home-page/home-page.component";
import { HeaderComponent } from './header/header.component';
import { HomeLayoutComponent } from './home-layout/home-layout.component';

@NgModule({
  declarations: [QuestionFormComponent,FooterComponent,HomePageComponent  ,TranslationDetailComponent, MenuFormComponent, FeedBackComponent, HeaderComponent, HomeLayoutComponent,],
  imports: [
    CommonModule,
    HomeRoutingModule,RouterModule,
    SharedModule,
  ],
  exports:[FooterComponent , HeaderComponent]
})
export class HomeModule { }



import { BrowserModule,  } from '@angular/platform-browser';
import { NgModule , CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from '@app/app-routing.module';
import { AppComponent } from '@app/app.component';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { httpInterceptorProviders } from '@app/core/interceptors';
import { ControllerEndpoints } from '@app/shared/endpoints';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {NgxPaginationModule} from 'ngx-pagination';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';
import { HighlightPipe } from './shared/pipe/highlight.pipe';
import { AuthInterceptor } from '@app/core/interceptors/auth.interceptor';
import { AuthGuardService } from '@app/auth/authguard.service';
import { AdminModule } from '@app/admin/admin.module';
import { HadithModule } from "./hadith/hadith.module";
import { BayanModule } from "./bayan/bayan.module";
import { KalamModule } from "./kalam/kalam.module";
import { QasidaModule } from "./qasida/qasida.module";
import {QuranModule} from "./quran/quran.module"
import {AqwaalModule} from "./aqwal/aqwal.module";


@NgModule({
  declarations: [
    AppComponent,
    HighlightPipe,
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,HadithModule,BayanModule,KalamModule,QasidaModule,QuranModule,AqwaalModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NgxPaginationModule,
    AutocompleteLibModule,
    ToastrModule.forRoot({
      preventDuplicates: true
    }),
    AdminModule
  ],
  providers: [
    httpInterceptorProviders,
    ControllerEndpoints,{
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    AuthGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

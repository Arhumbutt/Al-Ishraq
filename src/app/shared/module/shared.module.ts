import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TagInputModule } from 'ngx-chips';
import { BreadcrumbComponent } from '@app/shared/components/breadcrumb/breadcrumb.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [BreadcrumbComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    TagInputModule,
    NgxPaginationModule,
    AutocompleteLibModule,
    NgbModalModule
  ],
  exports: [
    ReactiveFormsModule,
    FormsModule,
    TagInputModule,
    BreadcrumbComponent,
    NgxPaginationModule,
    AutocompleteLibModule,
    NgbModalModule
  ]
})
export class SharedModule { }

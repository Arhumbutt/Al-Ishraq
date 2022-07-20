import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QasidaListingComponent } from './qasida-listing.component';

describe('QasidaListingComponent', () => {
  let component: QasidaListingComponent;
  let fixture: ComponentFixture<QasidaListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QasidaListingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QasidaListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

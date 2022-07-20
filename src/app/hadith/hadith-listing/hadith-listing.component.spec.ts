import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HadithListingComponent } from './hadith-listing.component';

describe('HadithListingComponent', () => {
  let component: HadithListingComponent;
  let fixture: ComponentFixture<HadithListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HadithListingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HadithListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

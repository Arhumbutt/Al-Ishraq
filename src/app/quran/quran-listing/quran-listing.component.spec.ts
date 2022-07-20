import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuranListingComponent } from './quran-listing.component';

describe('QuranListingComponent', () => {
  let component: QuranListingComponent;
  let fixture: ComponentFixture<QuranListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuranListingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuranListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

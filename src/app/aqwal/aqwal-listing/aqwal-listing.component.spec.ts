import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AqwalListingComponent } from './aqwal-listing.component';

describe('AqwalListingComponent', () => {
  let component: AqwalListingComponent;
  let fixture: ComponentFixture<AqwalListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AqwalListingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AqwalListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

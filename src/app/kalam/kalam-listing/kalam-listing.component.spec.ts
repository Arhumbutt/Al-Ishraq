import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KalamListingComponent } from './kalam-listing.component';

describe('KalamListingComponent', () => {
  let component: KalamListingComponent;
  let fixture: ComponentFixture<KalamListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KalamListingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KalamListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

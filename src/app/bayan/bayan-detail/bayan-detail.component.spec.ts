import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BayanDetailComponent } from './bayan-detail.component';

describe('BayanDetailComponent', () => {
  let component: BayanDetailComponent;
  let fixture: ComponentFixture<BayanDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BayanDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BayanDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

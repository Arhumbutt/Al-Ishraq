import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BayanLayoutComponent } from './bayan-layout.component';

describe('BayanLayoutComponent', () => {
  let component: BayanLayoutComponent;
  let fixture: ComponentFixture<BayanLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BayanLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BayanLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

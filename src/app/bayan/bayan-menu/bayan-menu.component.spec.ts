import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BayanMenuComponent } from './bayan-menu.component';

describe('BayanMenuComponent', () => {
  let component: BayanMenuComponent;
  let fixture: ComponentFixture<BayanMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BayanMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BayanMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

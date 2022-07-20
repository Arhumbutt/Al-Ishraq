import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavAdminMenuComponent } from './nav-admin-menu.component';

describe('NavAdminMenuComponent', () => {
  let component: NavAdminMenuComponent;
  let fixture: ComponentFixture<NavAdminMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavAdminMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavAdminMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

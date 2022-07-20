import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AqwalLayoutComponent } from './aqwal-layout.component';

describe('AqwalLayoutComponent', () => {
  let component: AqwalLayoutComponent;
  let fixture: ComponentFixture<AqwalLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AqwalLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AqwalLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

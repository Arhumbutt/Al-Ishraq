import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AqwalDetailComponent } from './aqwal-detail.component';

describe('AqwalDetailComponent', () => {
  let component: AqwalDetailComponent;
  let fixture: ComponentFixture<AqwalDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AqwalDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AqwalDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

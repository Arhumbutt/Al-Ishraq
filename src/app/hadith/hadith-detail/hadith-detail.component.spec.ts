import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HadithDetailComponent } from './hadith-detail.component';

describe('HadithDetailComponent', () => {
  let component: HadithDetailComponent;
  let fixture: ComponentFixture<HadithDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HadithDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HadithDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

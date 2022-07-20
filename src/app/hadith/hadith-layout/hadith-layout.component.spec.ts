import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HadithLayoutComponent } from './hadith-layout.component';

describe('HadithLayoutComponent', () => {
  let component: HadithLayoutComponent;
  let fixture: ComponentFixture<HadithLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HadithLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HadithLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

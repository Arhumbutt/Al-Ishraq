import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuranDetailComponent } from './quran-detail.component';

describe('QuranDetailComponent', () => {
  let component: QuranDetailComponent;
  let fixture: ComponentFixture<QuranDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuranDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuranDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

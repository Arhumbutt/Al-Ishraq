import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuranLayoutComponent } from './quran-layout.component';

describe('QuranLayoutComponent', () => {
  let component: QuranLayoutComponent;
  let fixture: ComponentFixture<QuranLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuranLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuranLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

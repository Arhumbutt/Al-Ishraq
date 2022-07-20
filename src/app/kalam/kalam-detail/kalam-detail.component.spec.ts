import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KalamDetailComponent } from './kalam-detail.component';

describe('KalamDetailComponent', () => {
  let component: KalamDetailComponent;
  let fixture: ComponentFixture<KalamDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KalamDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KalamDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

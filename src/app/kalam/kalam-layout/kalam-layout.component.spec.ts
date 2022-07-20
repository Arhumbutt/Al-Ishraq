import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KalamLayoutComponent } from './kalam-layout.component';

describe('KalamLayoutComponent', () => {
  let component: KalamLayoutComponent;
  let fixture: ComponentFixture<KalamLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KalamLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KalamLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

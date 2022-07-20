import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QasidaLayoutComponent } from './qasida-layout.component';

describe('QasidaLayoutComponent', () => {
  let component: QasidaLayoutComponent;
  let fixture: ComponentFixture<QasidaLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QasidaLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QasidaLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

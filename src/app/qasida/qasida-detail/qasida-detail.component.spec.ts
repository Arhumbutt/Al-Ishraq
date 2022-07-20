import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QasidaDetailComponent } from './qasida-detail.component';

describe('QasidaDetailComponent', () => {
  let component: QasidaDetailComponent;
  let fixture: ComponentFixture<QasidaDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QasidaDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QasidaDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

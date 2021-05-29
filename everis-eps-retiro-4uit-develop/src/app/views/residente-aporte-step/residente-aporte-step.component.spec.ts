import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResidenteAporteStepComponent } from './residente-aporte-step.component';

describe('ResidenteAporteStepComponent', () => {
  let component: ResidenteAporteStepComponent;
  let fixture: ComponentFixture<ResidenteAporteStepComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResidenteAporteStepComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResidenteAporteStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

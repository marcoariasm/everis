import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerificacionIdentidadComponent } from './verificacion-identidad.component';

describe('VerificacionIdentidadComponent', () => {
  let component: VerificacionIdentidadComponent;
  let fixture: ComponentFixture<VerificacionIdentidadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerificacionIdentidadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerificacionIdentidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BannerConfirmLibreDisponibilidadComponent } from './banner-confirm-libre-disponibilidad.component';

describe('BannerConfirmClaveAfpComponent', () => {
  let component: BannerConfirmLibreDisponibilidadComponent;
  let fixture: ComponentFixture<BannerConfirmLibreDisponibilidadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BannerConfirmLibreDisponibilidadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BannerConfirmLibreDisponibilidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

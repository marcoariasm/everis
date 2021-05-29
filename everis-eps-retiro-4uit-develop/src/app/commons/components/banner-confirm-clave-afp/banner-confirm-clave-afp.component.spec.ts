import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BannerConfirmClaveAfpComponent } from './banner-confirm-clave-afp.component';

describe('BannerConfirmClaveAfpComponent', () => {
  let component: BannerConfirmClaveAfpComponent;
  let fixture: ComponentFixture<BannerConfirmClaveAfpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BannerConfirmClaveAfpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BannerConfirmClaveAfpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BannerConfirmComponent } from './banner-confirm.component';

describe('BannerConfirmComponent', () => {
  let component: BannerConfirmComponent;
  let fixture: ComponentFixture<BannerConfirmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BannerConfirmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BannerConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BannerAmountConfirmComponent } from './banner-amount-confirm.component';

describe('BannerAmountConfirmComponent', () => {
  let component: BannerAmountConfirmComponent;
  let fixture: ComponentFixture<BannerAmountConfirmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BannerAmountConfirmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BannerAmountConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

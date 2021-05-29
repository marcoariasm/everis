import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BannerConfirm25Component } from './banner-confirm-25.component';

describe('BannerConfirmComponent', () => {
  let component: BannerConfirm25Component;
  let fixture: ComponentFixture<BannerConfirm25Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BannerConfirm25Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BannerConfirm25Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

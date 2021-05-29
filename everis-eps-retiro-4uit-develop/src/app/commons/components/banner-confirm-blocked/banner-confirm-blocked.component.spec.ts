import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BannerConfirmBlockedComponent } from './banner-confirm-blocked.component';

describe('BannerConfirmBlockedComponent', () => {
  let component: BannerConfirmBlockedComponent;
  let fixture: ComponentFixture<BannerConfirmBlockedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BannerConfirmBlockedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BannerConfirmBlockedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

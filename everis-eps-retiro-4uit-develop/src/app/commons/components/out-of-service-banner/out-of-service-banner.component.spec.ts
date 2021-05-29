import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OutOfServiceBannerComponent } from './out-of-service-banner.component';

describe('OutOfServiceBannerComponent', () => {
  let component: OutOfServiceBannerComponent;
  let fixture: ComponentFixture<OutOfServiceBannerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OutOfServiceBannerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OutOfServiceBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

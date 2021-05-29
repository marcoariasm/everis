import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BannerRejectedLinkComponent } from './banner-rejected-link.component';

describe('BannerRejectedComponent', () => {
  let component: BannerRejectedLinkComponent;
  let fixture: ComponentFixture<BannerRejectedLinkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BannerRejectedLinkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BannerRejectedLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

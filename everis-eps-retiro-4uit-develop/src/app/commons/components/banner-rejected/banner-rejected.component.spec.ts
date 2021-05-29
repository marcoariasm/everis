import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BannerRejectedComponent } from './banner-rejected.component';

describe('BannerRejectedComponent', () => {
  let component: BannerRejectedComponent;
  let fixture: ComponentFixture<BannerRejectedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BannerRejectedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BannerRejectedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BannerContentInfoComponent } from './banner-content-info.component';

describe('BannerContentInfoComponent', () => {
  let component: BannerContentInfoComponent;
  let fixture: ComponentFixture<BannerContentInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BannerContentInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BannerContentInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

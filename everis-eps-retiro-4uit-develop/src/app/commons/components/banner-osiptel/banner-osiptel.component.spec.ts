import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BannerOsiptelComponent } from './banner-osiptel.component';

describe('BannerOsiptelComponent', () => {
  let component: BannerOsiptelComponent;
  let fixture: ComponentFixture<BannerOsiptelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BannerOsiptelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BannerOsiptelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

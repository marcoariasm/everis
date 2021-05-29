import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InitialBannerComponent } from './initial-banner.component';

describe('InitialBannerComponent', () => {
  let component: InitialBannerComponent;
  let fixture: ComponentFixture<InitialBannerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InitialBannerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InitialBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

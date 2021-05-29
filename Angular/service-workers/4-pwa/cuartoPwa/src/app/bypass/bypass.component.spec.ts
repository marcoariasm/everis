import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BypassComponent } from './bypass.component';

describe('BypassComponent', () => {
  let component: BypassComponent;
  let fixture: ComponentFixture<BypassComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BypassComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BypassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

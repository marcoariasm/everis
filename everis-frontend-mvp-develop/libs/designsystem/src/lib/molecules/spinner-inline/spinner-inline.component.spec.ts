import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpinnerInlineComponent } from './spinner-inline.component';

describe('SpinnerInlineComponent', () => {
  let component: SpinnerInlineComponent;
  let fixture: ComponentFixture<SpinnerInlineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpinnerInlineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpinnerInlineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

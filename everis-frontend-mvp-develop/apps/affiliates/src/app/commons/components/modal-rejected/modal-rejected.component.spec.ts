import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalRejectedComponent } from './modal-rejected.component';

describe('ModalRejectedComponent', () => {
  let component: ModalRejectedComponent;
  let fixture: ComponentFixture<ModalRejectedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalRejectedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalRejectedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

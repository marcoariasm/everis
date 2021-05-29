import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAssignedComponent } from './modal-assigned.component';

describe('ModalAssignedComponent', () => {
  let component: ModalAssignedComponent;
  let fixture: ComponentFixture<ModalAssignedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalAssignedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAssignedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

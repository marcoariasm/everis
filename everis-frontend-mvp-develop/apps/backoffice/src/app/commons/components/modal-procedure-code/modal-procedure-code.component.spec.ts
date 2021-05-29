import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalProcedureCodeComponent } from './modal-procedure-code.component';

describe('ModalAssignedComponent', () => {
  let component: ModalProcedureCodeComponent;
  let fixture: ComponentFixture<ModalProcedureCodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalProcedureCodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalProcedureCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

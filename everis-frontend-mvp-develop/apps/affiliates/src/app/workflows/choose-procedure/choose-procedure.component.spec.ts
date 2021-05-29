import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseProcedureComponent } from './choose-procedure.component';

describe('ChooseProcedureComponent', () => {
  let component: ChooseProcedureComponent;
  let fixture: ComponentFixture<ChooseProcedureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChooseProcedureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChooseProcedureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

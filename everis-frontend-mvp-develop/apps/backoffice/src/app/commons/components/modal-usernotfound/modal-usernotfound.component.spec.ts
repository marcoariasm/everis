import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalUserNotFoundComponent } from './modal-usernotfound.component';

describe('ModalUserNotFoundComponent', () => {
  let component: ModalUserNotFoundComponent;
  let fixture: ComponentFixture<ModalUserNotFoundComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalUserNotFoundComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalUserNotFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

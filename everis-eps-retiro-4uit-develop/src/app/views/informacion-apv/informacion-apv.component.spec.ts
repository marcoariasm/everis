import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InformacionApvComponent } from './informacion-apv.component';

describe('InformacionApvComponent', () => {
  let component: InformacionApvComponent;
  let fixture: ComponentFixture<InformacionApvComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InformacionApvComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InformacionApvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

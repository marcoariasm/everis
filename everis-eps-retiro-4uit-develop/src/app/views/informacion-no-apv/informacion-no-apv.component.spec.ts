import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InformacionNoApvComponent } from './informacion-no-apv.component';

describe('InformacionNoApvComponent', () => {
  let component: InformacionNoApvComponent;
  let fixture: ComponentFixture<InformacionNoApvComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InformacionNoApvComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InformacionNoApvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

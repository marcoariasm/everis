import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiCompoComponent } from './mi-compo.component';

describe('MiCompoComponent', () => {
  let component: MiCompoComponent;
  let fixture: ComponentFixture<MiCompoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MiCompoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MiCompoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

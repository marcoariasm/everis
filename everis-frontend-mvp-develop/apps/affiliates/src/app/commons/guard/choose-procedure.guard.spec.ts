import { TestBed } from '@angular/core/testing';

import { ChooseProcedureGuard } from './choose-procedure.guard';

describe('ChooseProcedureGuard', () => {
  let guard: ChooseProcedureGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ChooseProcedureGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { unauthenticatedUserGuard } from './unauthenticated-user.guard';

describe('unauthenticatedUserGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => unauthenticatedUserGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});

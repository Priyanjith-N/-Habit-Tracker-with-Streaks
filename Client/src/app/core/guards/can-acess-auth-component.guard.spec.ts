import { TestBed } from '@angular/core/testing';
import { CanActivateChildFn } from '@angular/router';

import { canAcessAuthComponentGuard } from './can-acess-auth-component.guard';

describe('canAcessAuthComponentGuard', () => {
  const executeGuard: CanActivateChildFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => canAcessAuthComponentGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});

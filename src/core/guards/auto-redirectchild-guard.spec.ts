import { TestBed } from '@angular/core/testing';
import { CanActivateChildFn } from '@angular/router';

import { autoRedirectchildGuard } from './auto-redirectchild-guard';

describe('autoRedirectchildGuard', () => {
  const executeGuard: CanActivateChildFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => autoRedirectchildGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';
import { CanMatchFn } from '@angular/router';

import { autoRedirectPerGuard } from './auto-redirect-per-guard';

describe('autoRedirectPerGuard', () => {
  const executeGuard: CanMatchFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => autoRedirectPerGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});

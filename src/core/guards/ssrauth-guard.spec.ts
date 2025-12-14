import { TestBed } from '@angular/core/testing';
import { CanMatchFn } from '@angular/router';

import { ssrauthGuard } from './ssrauth-guard';

describe('ssrauthGuard', () => {
  const executeGuard: CanMatchFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => ssrauthGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});

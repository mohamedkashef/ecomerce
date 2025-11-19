import { CanActivateFn } from '@angular/router';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { inject } from '@angular/core';
import { Auth } from '../services/auth';

export const autoRedirectGuard: CanActivateFn = (route, state) => {
  const authService = inject(Auth);
  const router = inject(Router);

  if (authService.isAuthenticated()) {
    if (authService.hasRole('admin')) {
      return router.parseUrl('/admin');
    } else if (authService.hasRole('staff')) {
      return router.parseUrl('/staff');
    }
  }
  if (!authService.isAuthenticated()) {console.log('not authenticated');
      return true;

  }
  return false;
};

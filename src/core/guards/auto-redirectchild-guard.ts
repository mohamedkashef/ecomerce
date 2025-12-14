import { CanActivateChildFn } from '@angular/router';
import { inject } from '@angular/core';
import { Auth } from '../services/auth';
import { Router } from '@angular/router';

export const autoRedirectchildGuard: CanActivateChildFn = (childRoute, state) => {

  const authService = inject(Auth);
  const router = inject(Router);

  if (authService.isAuthenticated()) {
    if (authService.hasRole('admin')) {
      return router.parseUrl('/admin');
    } else if (authService.hasRole('staff')) {
      return router.parseUrl('/staff');
    }
  }
 
  if (!authService.isAuthenticated()) {
      return true;
  }


  return false;
};

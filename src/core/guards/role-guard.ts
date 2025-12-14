import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Auth } from '../services/auth';
import { Router } from '@angular/router';

export const roleGuard: CanActivateFn = (route, state) => {
  const authservice = inject(Auth);
  const router = inject(Router);


  // if (authservice.isAuthenticated()) {
  //   const user = authservice.getCurrentUser();
  //   if(user && user.role === 'user') {
  //     router.navigate(['/home']);
  //     return true;
  //   }
  // }

  return true;
}


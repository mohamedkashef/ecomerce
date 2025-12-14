import { CanMatchFn } from '@angular/router';
import { inject } from '@angular/core';
import { Auth } from 'core/services/auth';
import { Router } from '@angular/router';
import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { firstValueFrom } from 'rxjs';
import { Roles } from 'core/models/Roles';


export const authGuard: CanMatchFn = async (route, segments) => {
  const authService = inject(Auth);
  const router = inject(Router);
  const platformId = inject(PLATFORM_ID);
  let currentUserRole: string | Roles | null | 'loading' = 'loading';


  // تحقق من أنه browser
  if (isPlatformBrowser(platformId)) {
    const checkAuth = await firstValueFrom(authService.isAuthenticated());
    if (checkAuth) {
      currentUserRole = await firstValueFrom(authService.getCurrentUserRole());
      if(currentUserRole=='user'){
        return true;
      }
    }
    if (!checkAuth) {
        return false;
    }

  return false;
}
  return false;
};

import { CanMatchFn } from '@angular/router';
import { inject } from '@angular/core';
import { Auth } from '../services/auth';
import { Router } from '@angular/router';

export const autoRedirectPerGuard: CanMatchFn = (route, segments) => {
//   const authService = inject(Auth);
//   const router = inject(Router);

// const token = localStorage.getItem('app_access_token');
// const current_user = localStorage.getItem('app_current_user');

// if (token && current_user) {
//   if (current_user.includes('admin')) {
//     window.location.href = '/admin';
//   } else if (current_user.includes('staff')) {
//     window.location.href = '/staff';
//   }
// }

//   // فقط تحقق من المصادقة للمسار الأساسي '/'
//   if (segments.length === 0) { // المسار الأساسي
//     if (authService.isAuthenticated()) {
//       if (authService.hasRole('admin')) {
//         return router.parseUrl('/admin');
//       } else if (authService.hasRole('staff')) {
//         return router.parseUrl('/staff');
//       }
//     }
//     // إذا لم يكن مسجل، اسمح بالوصول (return true)
//     return true;
//   }

  // للمسارات الأخرى، اسمح بالوصول



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
      return false;
  }


  return false;
};

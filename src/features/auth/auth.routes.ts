import { Routes, RouterModule } from '@angular/router';

export const routes: Routes = [
  {
    path: '',redirectTo: 'login', pathMatch: 'full'
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login-page/login-page')
      .then(m => m.LoginPage)
  },
  {
    path:'register',
    loadComponent: () => import('./pages/register-page/register-page')
      .then(m => m.RegisterPage)
  },
  {
    path:'forgot-password',
    loadComponent: () => import('./pages/forgot-password-page/forgot-password-page')
      .then(m => m.ForgotPasswordPage)
  },


];


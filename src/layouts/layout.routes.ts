import { Routes, RouterModule } from '@angular/router';
import { MainLayout } from './main-layout/main-layout';
import { autoRedirectGuard } from 'core/guards/auto-redirect-guard';
import { authGuard } from 'core/guards/auth-guard';
import path from 'path';
import { StaffLayout } from '../layouts/staff-layout/staff-layout';
import { autoRedirectPerGuard } from 'core/guards/auto-redirect-per-guard';
import { inject } from '@angular/core';
import { Auth } from 'core/services/auth';
import { CanMatch } from '@angular/router';
import { AdminLayout } from './admin-layout/admin-layout';
import { UserLayout } from './user-layout/user-layout';
import { ssrauthGuard } from 'core/guards/ssrauth-guard';

export const LayoutRoutes: Routes = [


  {
    path: 'staff',
    component: StaffLayout,
    // data: { roles: ['staff', 'admin'] },
    children: []
  },
  {
    path: 'admin',
    component: AdminLayout,
    data: { roles: ['admin'] },
    children: [
      {
        path: '',
        loadComponent: () => import('../pages/home/home').then(m => m.Home)
      }
    ]
  },

  {
    path: '',
    component: UserLayout,
    canMatch: [authGuard],
    children: [
      {
        path: '',
        loadComponent: () => import('../pages/home/home').then(m => m.Home)
      }
    ]

  },
  {
    path: '',
    canMatch:[ssrauthGuard],
    component: MainLayout,
    children: [
      {
        path: '',
        loadComponent: () => import('../pages/home/home').then(m => m.Home)
      },

      {
        path: 'auth',
        loadChildren: () => import('../features/auth/auth.routes').then(m => m.routes)
      },
    ]
  },

]

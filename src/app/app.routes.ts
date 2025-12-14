import { Routes } from '@angular/router';
import { AppShell } from './app-shell';
import { autoRedirectchildGuard } from 'core/guards/auto-redirectchild-guard';



export const routes: Routes = [

  {
    path: '',
    component: AppShell,
    children: [
      {
        path: '',
        loadChildren:()=> import('../layouts/layout.routes').then(m=>m.LayoutRoutes)
      }
    ],
  }

        // component: LayoutSelector,
        // children: [
        //   {
        //     path: '',
        //     loadComponent: () => import('../pages/home/home').then(m => m.Home),
        //     title: 'Home'
        //   },
        //   {
        //     path: 'auth',
        //     loadChildren: () => import('../features/auth/auth.routes').then(m => m.routes),
        //   },
        //   {
        //     path: 'admin',
        //     loadChildren: () => import('../roles/admin/admin.routing').then(m => m.routes),
        //   },
        //   {
        //     path: 'staff',
        //     loadChildren: () => import('../roles/staff/staff.routing').then(m => m.routes),
        //   },
        //   {
        //     path: 'not-found',
        //     loadComponent: () => import('../pages/not-found/not-found').then(m => m.NotFound),
        //     title: 'Page Not Found'
        //   },
        //   {
        //     path: 'access-denied',
        //     loadComponent: () => import('../pages/access-denied/access-denied').then(m => m.AccessDenied),
        //     title: 'Access Denied'
        //   },
        //   {
        //     path: '**',
        //     redirectTo: 'not-found'
        //   }
        // ],
  // {
  //     path: '',
  //     component: AppShell,
  //     children: [
  //         {
  //             path: '',
  //             loadChildren: () => import('../layouts/layout.routes').then(m => m.LayoutRoutes)
  //         },
  //     ]
  // },





];

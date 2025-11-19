import { Routes, RouterModule } from '@angular/router';
import { MainLayout } from './main-layout/main-layout';
import { autoRedirectGuard } from 'core/guards/auto-redirect-guard';
import { authGuard } from 'core/guards/auth-guard';
import { roleGuard } from 'core/guards/role-guard';
import path from 'path';
import { StaffLayout } from '../layouts/staff-layout/staff-layout';
import { autoRedirectPerGuard } from 'core/guards/auto-redirect-per-guard';
import { inject } from '@angular/core';
import { Auth } from 'core/services/auth';

export const LayoutRoutes: Routes = [

    // {
    //     path: '',
    //     canMatch: [autoRedirectPerGuard],
    //     pathMatch: 'full',
    //     loadComponent:()=>import('../pages/not-found/not-found').then(m=>m.NotFound)
    // },

    // {
    //     path: 'home',
    //     redirectTo:''
    // },

    {
        path: 'staff',
        component: StaffLayout,
        data: { roles: ['staff', 'admin'] },
        children: []
    },
    {
        path: 'admin',
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

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
                canActivateChild:[autoRedirectchildGuard],
                loadChildren: () => import('../layouts/layout.routes').then(m => m.LayoutRoutes)
            },
        ]
    },
    {
        path: 'not-found',
        loadComponent: () => import('../pages/not-found/not-found').then(m => m.NotFound),
        title: 'Page Not Found'
    },
    {
        path:'access-denied',
        loadComponent: () => import('../pages/access-denied/access-denied').then(m => m.AccessDenied),
        title: 'Access Denied'
    },

    {
        path: '**',
        redirectTo: 'not-found'
    }

];

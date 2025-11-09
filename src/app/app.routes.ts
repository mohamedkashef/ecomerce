import { Routes } from '@angular/router';
import { MainLayout } from '../layouts/main-layout/main-layout';
import { Home } from '../pages/home/home';
import { AppShell } from './app-shell';
import { RegisterPage } from '../features/auth/pages/register-page/register-page';


export const routes: Routes = [

    // {
    //     path: 'auth',
    //     canActivate: [PublicGuard],
    //     loadChildren: () => import(`../features/auth/auth.routes`).then(m => m.authRoutes)
    // },

    //    // 🔐 Auth Routes - بدون authentication
    {
        path: '',
        component: AppShell, children: [
            {
                path: '', component: MainLayout, children: [
                    { path: 'home', redirectTo: '', pathMatch: 'full' },
                    { path: '', component: Home },
                    { path: 'register', component: RegisterPage },
                    {
                        path: 'auth',
                        loadChildren: () => import('../features/auth/auth.routes').then(m => m.routes)
                    }
                ]

            },



        ]
    }
];

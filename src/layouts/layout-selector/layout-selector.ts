import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Roles } from 'core/models/Roles';
import { Auth } from 'core/services/auth';
import { AdminLayout } from 'layouts/admin-layout/admin-layout';
import { StaffLayout } from 'layouts/staff-layout/staff-layout';
import { MainLayout } from 'layouts/main-layout/main-layout';
import { UserLayout } from 'layouts/user-layout/user-layout';
import { firstValueFrom } from 'rxjs';
import e from 'express';
import { first } from 'rxjs';

@Component({
  selector: 'app-layout-selector',
  imports: [AdminLayout,StaffLayout,MainLayout,UserLayout],
  templateUrl: './layout-selector.html',
  styleUrl: './layout-selector.css'
})
export class LayoutSelector {




  private readonly authService = inject(Auth);
  private readonly router = inject(Router);
  currentUserRole: Roles | null | 'loading' = 'loading';
  isLoading: boolean = true;

//  async ngOnInit() {
//     const checkAuth = await firstValueFrom(this.authService.isAuthenticated());
//     if (checkAuth) {
//       const userRole= await firstValueFrom(this.authService.getCurrentUserRole());
//     }


//  }







  Roles = Roles;

  constructor() {
    if (this.authService.isAuthenticated()) {
      if (this.authService.hasRole('admin')) {
        this.currentUserRole = Roles.Admin;
      } else if (this.authService.hasRole('staff')) {
        this.currentUserRole = Roles.Staff;
      } else if (this.authService.hasRole('user')) {
        this.currentUserRole = Roles.User;
      }else {
        this.currentUserRole = null;
      }
    }

  }




}

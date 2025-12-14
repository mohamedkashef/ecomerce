// import { Injectable, inject } from '@angular/core';
// import { BehaviorSubject, Observable, tap, catchError, throwError, from, of } from 'rxjs';
// import { User } from '../models/User';
// import { JwtHelperService } from '@auth0/angular-jwt';
// import { Api } from './api';
// import { Storageservice } from './storageservice';
// import { HttpClient } from '@angular/common/http';
// import { Inject, PLATFORM_ID } from '@angular/core';
// import { LoginRequest } from 'core/models/LoginRequest';
// import { LoginResponse } from 'core/models/LoginResponse';
// import { RegisterRequest } from 'core/models/RegisterRequest';
// import { Config } from 'core/services/config';

// @Injectable({
//   providedIn: 'root'
// })
// export class Auth {
//   private currentUserSubject: BehaviorSubject<User | null>;
//   public currentUser$: Observable<User | null>;
//   private jwtHelper: JwtHelperService;
//   private readonly TOKEN_KEY = 'access_token';
//   private isRefreshing = false;

//   private configservice = inject(Config);
//   private endpoint = this.configservice.apiConfig;

//   constructor(
//     private apiService: Api,
//     private storageService: Storageservice,
//     private http: HttpClient,
//     @Inject(PLATFORM_ID) private platformId: any
//   ) {
//     this.jwtHelper = new JwtHelperService();
//     this.currentUserSubject = new BehaviorSubject<User | null>(null);
//     this.currentUser$ = this.currentUserSubject.asObservable();

//     // تحميل المستخدم عند بداية التطبيق
//     this.initializeUser();
//   }

//   // تهيئة المستخدم عند بدء التطبيق
//   private async initializeUser(): Promise<void> {
//     const token = this.getToken();

//     if (token && !this.jwtHelper.isTokenExpired(token)) {
//       try {
//         const user = await this.verifyTokenAndGetUser().toPromise();
//         this.currentUserSubject.next(user);
//       } catch (error) {
//         console.error('Failed to verify token:', error);
//         this.clearAuthData();
//       }
//     } else {
//       this.clearAuthData();
//     }
//   }

//   // التحقق من الـ token والحصول على بيانات المستخدم
//   private verifyTokenAndGetUser(): Observable<User> {
//     return this.apiService.get<any>(() => '/auth/verifyToken').pipe(
//       tap(response => {
//         if (response.message === 'verified' && response.decoded) {
//           const user: User = {
//             id: response.decoded.id,
//             name: response.decoded.name,
//             email: response.decoded.email, // قد تحتاج لإضافته إذا كان متوفراً
//             role: response.decoded.role
//           };
//           return user;
//         }
//         throw new Error('Token verification failed');
//       }),
//       catchError(error => {
//         this.clearAuthData();
//         return throwError(() => error);
//       })
//     );
//   }

//   // التحقق من الـ role في كل مرة
//   async checkRole(requiredRole: string): Promise<boolean> {
//     const token = this.getToken();

//     if (!token || this.jwtHelper.isTokenExpired(token)) {
//       return false;
//     }

//     try {
//       // استخدام الـ API للتحقق من الـ role بدلاً من localStorage
//       const user = await this.verifyTokenAndGetUser().toPromise();

//       if (user && user.role === requiredRole) {
//         // تحديث حالة المستخدم الحالي
//         this.currentUserSubject.next(user);
//         return true;
//       }

//       return false;
//     } catch (error) {
//       console.error('Role check failed:', error);
//       return false;
//     }
//   }

//   // الحصول على الـ role الحالي (مع التحقق من السيرفر)
//   getCurrentRole(): Observable<string | null> {
//     const token = this.getToken();

//     if (!token || this.jwtHelper.isTokenExpired(token)) {
//       return of(null);
//     }

//     return this.verifyTokenAndGetUser().pipe(
//       tap(user => this.currentUserSubject.next(user)),
//       tap(user => user?.role || null),
//       catchError(() => {
//         this.clearAuthData();
//         return of(null);
//       })
//     );
//   }

//   registration(registrationData: RegisterRequest): Observable<LoginResponse> {
//     return this.apiService.post<RegisterRequest, LoginResponse>(
//       () => '/auth/signup',
//       registrationData,
//       { skipAuth: true }
//     ).pipe(
//       tap(response => {
//         this.setTokens(response.token);
//         // لا نقوم بتخزين المستخدم في localStorage
//         // نستخدم الـ API للتحقق بدلاً من ذلك
//         this.verifyTokenAndGetUser().subscribe(user => {
//           this.currentUserSubject.next(user);
//         });
//       }),
//       catchError(error => {
//         this.clearAuthData();
//         return throwError(() => error);
//       })
//     );
//   }

//   login(credentials: LoginRequest): Observable<LoginResponse> {
//     return this.apiService.post<LoginRequest, LoginResponse>(
//       () => '/auth/signin',
//       credentials,
//       { skipAuth: true }
//     ).pipe(
//       tap(response => {
//         this.setTokens(response.token);
//         // استخدام الـ API للتحقق بدلاً من تخزين البيانات
//         this.verifyTokenAndGetUser().subscribe(user => {
//           this.currentUserSubject.next(user);
//         });
//       }),
//       catchError(error => {
//         this.clearAuthData();
//         return throwError(() => error);
//       })
//     );
//   }

//   logout(): void {
//     this.clearAuthData();
//     this.currentUserSubject.next(null);
//   }

//   changePassword(currentPassword: string, newPassword: string): Observable<any> {
//     return this.apiService.post(() => '/auth/changePassword', {
//       currentPassword,
//       newPassword,
//       rePassword: newPassword
//     });
//   }

//   forgotPassword(email: string): Observable<any> {
//     return this.apiService.post(() => '/auth/forgotPassword', { email }, {
//       skipAuth: true
//     });
//   }

//   resetPassword(email: string, newPassword: string): Observable<any> {
//     return this.apiService.post(() => '/auth/resetPassword', {
//       email,
//       newPassword
//     }, {
//       skipAuth: true
//     });
//   }

//   verifyResetCode(code: string): Observable<any> {
//     return this.apiService.post(() => '/auth/verifyResetCode', { code }, {
//       skipAuth: true
//     });
//   }

//   isAuthenticated(): boolean {
//     const token = this.getToken();
//     return !!(token && !this.jwtHelper.isTokenExpired(token));
//   }

//   hasRole(role: string): Observable<boolean> {
//     return this.getCurrentRole().pipe(
//       tap(currentRole => currentRole === role)
//     );
//   }

//   getCurrentUser(): User | null {
//     return this.currentUserSubject.value;
//   }

//   // تحديث بيانات المستخدم من السيرفر
//   refreshUserData(): Observable<User | null> {
//     if (this.isRefreshing) {
//       return this.currentUser$;
//     }

//     this.isRefreshing = true;
//     return this.verifyTokenAndGetUser().pipe(
//       tap(user => {
//         this.currentUserSubject.next(user);
//         this.isRefreshing = false;
//       }),
//       catchError(error => {
//         this.isRefreshing = false;
//         this.clearAuthData();
//         return throwError(() => error);
//       })
//     );
//   }

//   private setTokens(accessToken: string): void {
//     this.storageService.setItem(this.TOKEN_KEY, accessToken);
//   }

//   private clearAuthData(): void {
//     this.storageService.removeItem(this.TOKEN_KEY);
//   }

//   getToken(): string | null {
//     return this.storageService.getItem(this.TOKEN_KEY);
//   }

//   // دالة لتحميل المستخدم عند بدء التطبيق (لحل مشكلة الـ flicker)
//   loadUserFromStorage(): Promise<void> {
//     return new Promise((resolve) => {
//       const token = this.getToken();

//       if (token && !this.jwtHelper.isTokenExpired(token)) {
//         this.verifyTokenAndGetUser().subscribe({
//           next: (user) => {
//             this.currentUserSubject.next(user);
//             resolve();
//           },
//           error: () => {
//             this.clearAuthData();
//             this.currentUserSubject.next(null);
//             resolve();
//           }
//         });
//       } else {
//         this.clearAuthData();
//         this.currentUserSubject.next(null);
//         resolve();
//       }
//     });
//   }
// }



// // layout-selector.component.ts
// import { Component, inject, OnInit, OnDestroy } from '@angular/core';
// import { Router } from '@angular/router';
// import { Roles } from 'core/models/Roles';
// import { AuthService } from 'core/services/auth';
// import { EventBusService } from 'core/services/event-bus.service';
// import { Subscription } from 'rxjs';

// @Component({
//   selector: 'app-layout-selector',
//   imports: [AdminLayout, StaffLayout, MainLayout, UserLayout],
//   templateUrl: './layout-selector.html',
//   styleUrl: './layout-selector.css'
// })
// export class LayoutSelector implements OnInit, OnDestroy {
//   private readonly authService = inject(AuthService);
//   private readonly router = inject(Router);
//   private readonly eventBus = inject(EventBusService);

//   currentUserRole: Roles | null | 'loading' = 'loading';
//   Roles = Roles;

//   private loadingSubscriptions: Subscription[] = [];

//   async ngOnInit() {
//     this.setupLoadingListeners();
//     await this.initializeUserRole();
//   }

//   ngOnDestroy() {
//     this.loadingSubscriptions.forEach(sub => sub.unsubscribe());
//   }

//   private setupLoadingListeners() {
//     // الاستماع لأحداث الـ loading
//     const loadingStartSub = this.eventBus
//       .on(this.eventBus.EVENTS.APP.LOADING_START)
//       .subscribe((data: any) => {
//         if (data.identifier === 'user-role-check') {
//           this.currentUserRole = 'loading';
//         }
//       });

//     const loadingEndSub = this.eventBus
//       .on(this.eventBus.EVENTS.APP.LOADING_END)
//       .subscribe((data: any) => {
//         if (data.identifier === 'user-role-check') {
//           // الـ role تم تحديده بالفعل في initializeUserRole
//         }
//       });

//     this.loadingSubscriptions.push(loadingStartSub, loadingEndSub);
//   }

//   private async initializeUserRole() {
//     try {
//       await this.authService.initializeUserSession();
//       this.determineUserRole();
//     } catch (error) {
//       console.error('Error initializing user role:', error);
//       this.currentUserRole = null; // Fallback to main layout
//     }
//   }

//   private determineUserRole() {
//     if (this.authService.isAuthenticated()) {
//       if (this.authService.hasRole('admin')) {
//         this.currentUserRole = Roles.Admin;
//       } else if (this.authService.hasRole('staff')) {
//         this.currentUserRole = Roles.Staff;
//       } else if (this.authService.hasRole('user')) {
//         this.currentUserRole = Roles.User;
//       } else {
//         this.currentUserRole = null;
//       }
//     } else {
//       this.currentUserRole = null;
//     }
//   }
// }

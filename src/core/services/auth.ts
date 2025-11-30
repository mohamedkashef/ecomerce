import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, tap, catchError, throwError, map } from 'rxjs';
import { User } from '../models/User';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Api } from './api';
import { Storageservice } from './storageservice';
import { HttpClient } from '@angular/common/http';
import { Inject, PLATFORM_ID } from '@angular/core';
import { LoginRequest } from 'core/models/LoginRequest';
import { LoginResponse } from 'core/models/LoginResponse';
import { RegisterRequest } from 'core/models/RegisterRequest';
import { Config } from 'core/services/config';
import { VerifyTokenResponse } from 'core/models/VerifyTokenResponse';
import { header } from 'shared/components/layout/header/header';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Auth {

  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser$: Observable<User | null>;
  private jwtHelper: JwtHelperService;
  private readonly TOKEN_KEY = 'access_token';
  private readonly USER_KEY = 'current_user';

  private configservice = inject(Config);
  private endpoint = this.configservice.apiConfig;

  // Cache لتحسين الأداء
  private userVerificationCache: { user: User, timestamp: number } | null = null;
  private readonly CACHE_DURATION = 30000; // 30 ثانية

  constructor(
    private apiService: Api,
    private storageService: Storageservice,
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: any
  ) {
    this.jwtHelper = new JwtHelperService();
    const initialUser = this.getUserFromStorage();
    this.currentUserSubject = new BehaviorSubject<User | null>(initialUser);
    this.currentUser$ = this.currentUserSubject.asObservable();
  }

  registration(registrationData: RegisterRequest): Observable<LoginResponse> {
    return this.apiService.post<RegisterRequest, LoginResponse>(
      this.endpoint.auth.register,
      registrationData,
      { skipAuth: true }
    ).pipe(
      tap(response => {
        this.setTokens(response.token);
        this.setCurrentUser(response.user);
        this.updateVerificationCache(response.user);
      }),
      catchError(error => {
        this.clearAuthData();
        return throwError(() => error);
      })
    );
  }

  login(credentials: LoginRequest): Observable<LoginResponse> {
    return this.apiService.post<LoginRequest, LoginResponse>(
      this.endpoint.auth.login,
      credentials,
      { skipAuth: true }
    ).pipe(
      tap(response => {
        this.setTokens(response.token);
        this.setCurrentUser(response.user);
        this.updateVerificationCache(response.user);
      }),
      catchError(error => {
        this.clearAuthData();
        return throwError(() => error);
      })
    );
  }

  logout(): void {
    this.clearAuthData();
    this.currentUserSubject.next(null);
    this.clearVerificationCache();
  }

  verifyTokenAndGetUser(token: string): Observable<User> {
    // التحقق من الكاش أولاً
    if (this.isCacheValid()) {
      return of(this.userVerificationCache!.user);
    }

    return this.apiService
      .get<VerifyTokenResponse>(this.endpoint.auth.verifyToken, {
        headers: { token: token }
      })
      .pipe(
        map(response => {
          if (response.message !== 'verified' || !response.decoded) {
            throw new Error('Token verification failed');
          }

          // الحصول على البريد الإلكتروني من localStorage كحل مؤقت
          const storedUser = this.getUserFromStorage();

          // استخدام البيانات من الـ backend مع البريد الإلكتروني من localStorage
          const backendUser: User = {
            name: response.decoded.name,
            email: storedUser?.email || this.extractEmailFromToken(token) || "",
            role: response.decoded.role
          };

          // تحديث البيانات المحلية بالبيانات من الـ backend
          this.setCurrentUser(backendUser);
          this.updateVerificationCache(backendUser);

          return backendUser;
        }),
        catchError(error => {
          this.clearAuthData();
          this.clearVerificationCache();
          return throwError(() => error);
        })
      );
  }

  isAuthenticated(): Observable<boolean> {
    const token = this.getToken();

    if (!token) {
      return of(false);
    }

    try {
      const isExpired = this.jwtHelper.isTokenExpired(token);
      if (isExpired) {
        this.clearAuthData();
        return of(false);
      }
    } catch {
      this.clearAuthData();
      return of(false);
    }

    // التحقق من الكاش أولاً
    if (this.isCacheValid()) {
      return of(true);
    }

    return this.verifyTokenAndGetUser(token).pipe(
      map(user => !!user),
      catchError(() => {
        this.clearAuthData();
        return of(false);
      })
    );
  }

  hasRole(requiredRole: string): Observable<boolean> {
    const token = this.getToken();

    if (!token) {
      return of(false);
    }

    // التحقق من الكاش أولاً
    if (this.isCacheValid() && this.userVerificationCache!.user.role === requiredRole) {
      return of(true);
    }

    return this.verifyTokenAndGetUser(token).pipe(
      map(user => user.role === requiredRole),
      catchError(() => of(false))
    );
  }

  getCurrentUserRole(): Observable<string | null> {
        const token = this.getToken();
    if (!token) {
      return of(null);
    }
    
    if (this.isCacheValid()) {
      return of(this.userVerificationCache!.user.role);
    }
    return this.verifyTokenAndGetUser(token).pipe(
      map(user => user.role),
      catchError(() => of(null))
    );

  }

  getCurrentUser(): Observable<User | null> {
    const token = this.getToken();

    if (!token) {
      return of(null);
    }

    // التحقق من الكاش أولاً
    if (this.isCacheValid()) {
      return of(this.userVerificationCache!.user);
    }

    return this.verifyTokenAndGetUser(token).pipe(
      map(user => user),
      catchError(() => of(null))
    );
  }

  getToken(): string | null {
    return this.storageService.getItem(this.TOKEN_KEY);
  }

  private setTokens(accessToken: string): void {
    this.storageService.setItem(this.TOKEN_KEY, accessToken);
  }

  private setCurrentUser(user: User): void {
    this.storageService.setItem(this.USER_KEY, JSON.stringify(user));
    this.currentUserSubject.next(user);
  }

  private clearAuthData(): void {
    this.storageService.removeItem(this.TOKEN_KEY);
    this.storageService.removeItem(this.USER_KEY);
    this.clearVerificationCache();
  }

  private getUserFromStorage(): User | null {
    try {
      const userStr = this.storageService.getItem(this.USER_KEY);
      return userStr ? JSON.parse(userStr) : null;
    } catch {
      return null;
    }
  }

  // استخراج البريد الإلكتروني من الـ token إذا كان موجوداً
  private extractEmailFromToken(token: string): string | null {
    try {
      const decodedToken = this.jwtHelper.decodeToken(token);
      return decodedToken?.email || decodedToken?.sub || null;
    } catch {
      return null;
    }
  }

  // إدارة الكاش
  private updateVerificationCache(user: User): void {
    this.userVerificationCache = {
      user: user,
      timestamp: Date.now()
    };
  }

  private clearVerificationCache(): void {
    this.userVerificationCache = null;
  }

  private isCacheValid(): boolean {
    if (!this.userVerificationCache) {
      return false;
    }
    return Date.now() - this.userVerificationCache.timestamp < this.CACHE_DURATION;
  }

  loadUserFromStorage(): Promise<void> {
    return new Promise(resolve => {
      const user = this.getUserFromStorage();
      this.currentUserSubject.next(user);
      resolve();
    });
  }

  changePassword(currentPassword: string, newPassword: string): Observable<any> {
    return this.apiService.post(this.endpoint.auth.changePassword, {
      currentPassword,
      newPassword,
      rePassword: newPassword
    });
  }

  forgotPassword(email: string): Observable<any> {
    return this.apiService.post(this.endpoint.auth.forgetpassword, { email }, {
      skipAuth: true
    });
  }

  resetPassword(email: string, newPassword: string): Observable<any> {
    return this.apiService.post(this.endpoint.auth.resetPassword, {
      email,
      newPassword
    }, {
      skipAuth: true
    });
  }

  verifyResetCode(code: string): Observable<any> {
    return this.apiService.post(this.endpoint.auth.verifyResetCode, { code }, {
      skipAuth: true
    });
  }
}

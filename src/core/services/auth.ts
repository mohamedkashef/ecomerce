import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, tap, catchError, throwError } from 'rxjs';
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
    return this.apiService.post<RegisterRequest, LoginResponse>(this.endpoint.auth.register, registrationData, { skipAuth: true }
    ).pipe(
      tap(response => {
        this.setTokens(response.token);
        this.setCurrentUser(response.user);
      }
      ),
      catchError(error => {
        this.clearAuthData(); 
        return throwError(() => error);
      })
    );
  }

  login(craditinals: LoginRequest): Observable<LoginResponse> {
    return this.apiService.post<LoginRequest, LoginResponse>(this.endpoint.auth.login, craditinals, { skipAuth: true }

    ).pipe(
      tap(response => {
        this.setTokens(response.token);
        this.setCurrentUser(response.user);
      }
      ),
      catchError(error => {
        this.clearAuthData();
        return throwError(() => error);
      })
    );
  }

  logout(): void {
    this.clearAuthData();
    this.currentUserSubject.next(null);
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

  isAuthenticated(): boolean {
    const token = this.storageService.getItem(this.TOKEN_KEY);

    if (!token) {
      return false;
    }

    try {
      const isExpired = this.jwtHelper.isTokenExpired(token);
      return !isExpired;
    } catch {
      return false;
    }
  }

  hasRole(role: string): boolean {
    const user = this.currentUserSubject.value;
    return user ? user.role.includes(role) : false;
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
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
  }




  private getUserFromStorage(): User | null {
    try {
      const userStr = this.storageService.getItem(this.USER_KEY);
      return userStr ? userStr : null;
    } catch {
      return null;
    }
  }





  getToken(): string | null {
    return this.storageService.getItem(this.TOKEN_KEY);
  }


}

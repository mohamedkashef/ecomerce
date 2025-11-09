import { Injectable, Injector } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

export interface AppError {
  message: string;
  code?: string;
  status?: number;
  timestamp: Date;
  details?: any;
}

@Injectable({
  providedIn: 'root'
})
export class HttpErrorHandler {
  
  constructor(
    private injector: Injector,
    private messageService: MessageService
  ) {}
  
  /**
   * 🎯 معالجة الأخطاء المركزية
   */
  handleError() {
    return (error: any): Observable<never> => {
      const appError = this.createAppError(error);
      
      // معالجة بناء على نوع الخطأ
      switch (appError.status) {
        case 0:
          this.handleNetworkError(appError);
          break;
        case 401:
          this.handleUnauthorizedError(appError);
          break;
        case 403:
          this.handleForbiddenError(appError);
          break;
        case 404:
          this.handleNotFoundError(appError);
          break;
        case 500:
          this.handleServerError(appError);
          break;
        default:
          this.handleGenericError(appError);
      }
      
      // تسجيل الخطأ
      this.logError(appError);
      
      return throwError(() => appError);
    };
  }
  
  /**
   * 🎯 تحويل الخطأ إلى AppError
   */
  private createAppError(error: any): AppError {
    if (error instanceof HttpErrorResponse) {
      return {
        message: error.error?.message || error.message || 'Unknown error occurred',
        code: error.error?.code,
        status: error.status,
        timestamp: new Date(),
        details: error.error
      };
    }
    
    if (error instanceof Error) {
      return {
        message: error.message,
        timestamp: new Date(),
        details: error
      };
    }
    
    return {
      message: 'An unexpected error occurred',
      timestamp: new Date(),
      details: error
    };
  }
  
  /**
   * 🎯 معالجة أخطاء الشبكة
   */
  private handleNetworkError(error: AppError): void {
    this.messageService.add({
      severity: 'error',
      summary: 'Network Error',
      detail: 'Please check your internet connection and try again.',
      life: 5000
    });
  }
  
  /**
   * 🎯 معالجة أخطاء المصادقة
   */
  private handleUnauthorizedError(error: AppError): void {
    const router = this.injector.get(Router);
    
    this.messageService.add({
      severity: 'warn',
      summary: 'Session Expired',
      detail: 'Please login again to continue.',
      life: 5000
    });
    
    // إعادة التوجيه لصفحة login
    router.navigate(['/auth/login']);
  }
  
  /**
   * 🎯 معالجة أخطاء الصلاحيات
   */
  private handleForbiddenError(error: AppError): void {
    this.messageService.add({
      severity: 'error',
      summary: 'Access Denied',
      detail: 'You do not have permission to perform this action.',
      life: 5000
    });
  }
  
  /**
   * 🎯 معالجة أخطاء الـ Not Found
   */
  private handleNotFoundError(error: AppError): void {
    this.messageService.add({
      severity: 'warn',
      summary: 'Not Found',
      detail: 'The requested resource was not found.',
      life: 5000
    });
  }
  
  /**
   * 🎯 معالجة أخطاء السيرفر
   */
  private handleServerError(error: AppError): void {
    this.messageService.add({
      severity: 'error',
      summary: 'Server Error',
      detail: 'Something went wrong on our side. Please try again later.',
      life: 5000
    });
  }
  
  /**
   * 🎯 معالجة الأخطاء العامة
   */
  private handleGenericError(error: AppError): void {
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: error.message,
      life: 5000
    });
  }
  
  /**
   * 🎯 تسجيل الأخطاء
   */
  private logError(error: AppError): void {
    // هنا ممكن ترسل الخطأ لخدمة مثل Sentry أو تسجله في الـ console
    console.error('🚨 HTTP Error:', {
      message: error.message,
      code: error.code,
      status: error.status,
      timestamp: error.timestamp,
      details: error.details
    });
  }
}
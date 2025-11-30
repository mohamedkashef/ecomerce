import { HttpContext, HttpParams,HttpHeaders } from '@angular/common/http';
import {
  SKIP_ERROR_HANDLING,
  SKIP_AUTH_HEADER,
  SKIP_LOADING,
  SKIP_LOGGING,
  CUSTOM_TIMEOUT,
  CACHE_KEY,
  CACHE_TTL
} from './http-context.tokens';




export interface HttpRequestOptions {
  skipErrorHandling?: boolean;
  skipAuth?: boolean;
  skipLoading?: boolean;
  skipLogging?: boolean;
  customTimeout?: number;
  cacheKey?: string;
  cacheTtl?: number;
  params?: any;
  headers?: { [key: string]: string };
}

export class HttpOptionsFactory {

  /**
   * 🎯 إنشاء HttpContext بناء على الخيارات
   */
  static createContext(options: HttpRequestOptions = {}): HttpContext {
    const context = new HttpContext();

    if (options.skipErrorHandling) {
      context.set(SKIP_ERROR_HANDLING, true);
    }

    if (options.skipAuth) {
      context.set(SKIP_AUTH_HEADER, true);
    }

    if (options.skipLoading) {
      context.set(SKIP_LOADING, true);
    }

    if (options.skipLogging) {
      context.set(SKIP_LOGGING, true);
    }

    if (options.customTimeout) {
      context.set(CUSTOM_TIMEOUT, options.customTimeout);
    }

    if (options.cacheKey) {
      context.set(CACHE_KEY, options.cacheKey);
    }

    if (options.cacheTtl) {
      context.set(CACHE_TTL, options.cacheTtl);
    }

    return context;
  }

  /**
   * 🎯 إنشاء HttpParams من object
   */
  static createParams(params: any): HttpParams {
    let httpParams = new HttpParams();

    if (!params) return httpParams;

    Object.keys(params).forEach(key => {
      const value = params[key];
      if (value !== null && value !== undefined && value !== '') {
        if (Array.isArray(value)) {
          // معالجة المصفوفات (مثال: categories=['cat1','cat2'])
          value.forEach(item => {
            httpParams = httpParams.append(key, item.toString());
          });
        } else {
          httpParams = httpParams.append(key, value.toString());
        }
      }
    });

    return httpParams;
  }

  /**
   * 🎯 إنشاء headers object
   */
  // static createHeaders(customHeaders: { [key: string]: string } = {}): { [key: string]: string } {
  //   const defaultHeaders = {
  //     'Content-Type': 'application/json',
  //     'Accept': 'application/json'
  //   };

  //   return { ...defaultHeaders, ...customHeaders };
  // }


static createHeaders(customHeaders: { [key: string]: string } = {}): HttpHeaders {
  let headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  });

  Object.entries(customHeaders).forEach(([key, value]) => {
    headers = headers.set(key, value);
  });

  return headers;
}





}

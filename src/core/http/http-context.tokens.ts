import { HttpContextToken } from '@angular/common/http';

// 🎯 Context Tokens للتحكم في سلوك HTTP requests
export const SKIP_ERROR_HANDLING = new HttpContextToken<boolean>(() => false);
export const SKIP_AUTH_HEADER = new HttpContextToken<boolean>(() => false);
export const SKIP_LOADING = new HttpContextToken<boolean>(() => false);
export const SKIP_LOGGING = new HttpContextToken<boolean>(() => false);
export const CUSTOM_TIMEOUT = new HttpContextToken<number>(() => 0);
export const CACHE_KEY = new HttpContextToken<string | null>(() => null);
export const CACHE_TTL = new HttpContextToken<number>(() => 300000); // 5 minutes default

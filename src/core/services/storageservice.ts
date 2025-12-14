import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';



export type StorageType = 'local' | 'session' | 'memory';

export interface StorageConfig {
  type: StorageType;
  encrypt?: boolean;
  prefix?: string;
}


@Injectable({
  providedIn: 'root'
})
export class Storageservice {

    private memoryStorage = new Map<string, string>();
    private changesSubject = new BehaviorSubject<{ key: string; value: any }>({ key: '', value: null });
    public changes$: Observable<{ key: string; value: any }>;
  
    private defaultConfig: StorageConfig = {
      type: 'local',
      encrypt: false,
      prefix: 'app_'
    };
  
    constructor(@Inject(PLATFORM_ID) private platformId: any) {
      this.changes$ = this.changesSubject.asObservable();
    }
  
    /**
     * حفظ بيانات
     */
    setItem(key: string, value: any, config: Partial<StorageConfig> = {}): boolean {
      try {
        const mergedConfig = { ...this.defaultConfig, ...config };
        const storageKey = this.getStorageKey(key, mergedConfig.prefix);
        const processedValue = this.processValue(value, mergedConfig.encrypt);
  
        switch (mergedConfig.type) {
          case 'local':
            if (isPlatformBrowser(this.platformId)) {
              localStorage.setItem(storageKey, processedValue);
            }
            break;
          case 'session':
            if (isPlatformBrowser(this.platformId)) {
              sessionStorage.setItem(storageKey, processedValue);
            }
            break;
          case 'memory':
            this.memoryStorage.set(storageKey, processedValue);
            break;
        }
  
        this.notifyChange(key, value);
        return true;
      } catch (error) {
        console.error('Storage setItem error:', error);
        return false;
      }
    }
  
    /**
     * استرجاع بيانات
     */
    getItem<T = any>(key: string, config: Partial<StorageConfig> = {}): T | null {
      try {
        const mergedConfig = { ...this.defaultConfig, ...config };
        const storageKey = this.getStorageKey(key, mergedConfig.prefix);
        let value: string | null = null;
  
        switch (mergedConfig.type) {
          case 'local':
            if (isPlatformBrowser(this.platformId)) {
              value = localStorage.getItem(storageKey);
            }
            break;
          case 'session':
            if (isPlatformBrowser(this.platformId)) {
              value = sessionStorage.getItem(storageKey);
            }
            break;
          case 'memory':
            value = this.memoryStorage.get(storageKey) || null;
            break;
        }
  
        return value ? this.parseValue(value, mergedConfig.encrypt) : null;
      } catch (error) {
        console.error('Storage getItem error:', error);
        return null;
      }
    }
  
    /**
     * حذف بيانات
     */
    removeItem(key: string, config: Partial<StorageConfig> = {}): boolean {
      try {
        const mergedConfig = { ...this.defaultConfig, ...config };
        const storageKey = this.getStorageKey(key, mergedConfig.prefix);
  
        switch (mergedConfig.type) {
          case 'local':
            if (isPlatformBrowser(this.platformId)) {
              localStorage.removeItem(storageKey);
            }
            break;
          case 'session':
            if (isPlatformBrowser(this.platformId)) {
              sessionStorage.removeItem(storageKey);
            }
            break;
          case 'memory':
            this.memoryStorage.delete(storageKey);
            break;
        }
  
        this.notifyChange(key, null);
        return true;
      } catch (error) {
        console.error('Storage removeItem error:', error);
        return false;
      }
    }
  
    /**
     * مسح جميع البيانات
     */
    clear(config: Partial<StorageConfig> = {}): boolean {
      try {
        const mergedConfig = { ...this.defaultConfig, ...config };
        const prefix = this.getStorageKey('', mergedConfig.prefix);
  
        switch (mergedConfig.type) {
          case 'local':
            if (isPlatformBrowser(this.platformId)) {
              if (prefix) {
                this.clearByPrefix(prefix, localStorage);
              } else {
                localStorage.clear();
              }
            }
            break;
          case 'session':
            if (isPlatformBrowser(this.platformId)) {
              if (prefix) {
                this.clearByPrefix(prefix, sessionStorage);
              } else {
                sessionStorage.clear();
              }
            }
            break;
          case 'memory':
            if (prefix) {
              Array.from(this.memoryStorage.keys()).forEach(k => {
                if (k.startsWith(prefix)) {
                  this.memoryStorage.delete(k);
                }
              });
            } else {
              this.memoryStorage.clear();
            }
            break;
        }
  
        this.notifyChange('*', null);
        return true;
      } catch (error) {
        console.error('Storage clear error:', error);
        return false;
      }
    }
  
    /**
     * الحصول على جميع المفاتيح
     */
    getKeys(config: Partial<StorageConfig> = {}): string[] {
      const mergedConfig = { ...this.defaultConfig, ...config };
      const prefix = this.getStorageKey('', mergedConfig.prefix);
      let keys: string[] = [];
  
      try {
        switch (mergedConfig.type) {
          case 'local':
            if (isPlatformBrowser(this.platformId)) {
              keys = Object.keys(localStorage);
            }
            break;
          case 'session':
            if (isPlatformBrowser(this.platformId)) {
              keys = Object.keys(sessionStorage);
            }
            break;
          case 'memory':
            keys = Array.from(this.memoryStorage.keys());
            break;
        }
  
        if (prefix) {
          keys = keys.filter(key => key.startsWith(prefix));
          keys = keys.map(key => key.substring(prefix.length));
        }
  
        return keys;
      } catch (error) {
        console.error('Storage getKeys error:', error);
        return [];
      }
    }
  
    /**
     * التحقق من وجود مفتاح
     */
    hasKey(key: string, config: Partial<StorageConfig> = {}): boolean {
      return this.getItem(key, config) !== null;
    }
  
    /**
     * الحصول على حجم التخزين المستخدم
     */
    getStorageSize(config: Partial<StorageConfig> = {}): number {
      const mergedConfig = { ...this.defaultConfig, ...config };
      let size = 0;
  
      try {
        switch (mergedConfig.type) {
          case 'local':
            if (isPlatformBrowser(this.platformId)) {
              size = this.calculateSize(localStorage);
            }
            break;
          case 'session':
            if (isPlatformBrowser(this.platformId)) {
              size = this.calculateSize(sessionStorage);
            }
            break;
          case 'memory':
            this.memoryStorage.forEach((value, key) => {
              size += key.length + value.length;
            });
            break;
        }
  
        return size;
      } catch (error) {
        console.error('Storage getStorageSize error:', error);
        return 0;
      }
    }
  
  
  
    
    /**
     * Private Methods
     */
    private getStorageKey(key: string, prefix?: string): string {
      return prefix ? `${prefix}${key}` : key;
    }
  
    private processValue(value: any, encrypt: boolean = false): string {
      const stringValue = typeof value === 'string' ? value : JSON.stringify(value);
      
      if (encrypt) {
        return this.simpleEncrypt(stringValue);
      }
      
      return stringValue;
    }
  
    private parseValue(value: string, encrypted: boolean = false): any {
      try {
        const decryptedValue = encrypted ? this.simpleDecrypt(value) : value;
        
        // محاولة parse كـ JSON، إذا فشل نعيده كـ string
        try {
          return JSON.parse(decryptedValue);
        } catch {
          return decryptedValue;
        }
      } catch (error) {
        console.error('Storage parseValue error:', error);
        return null;
      }
    }
  
    private simpleEncrypt(value: string): string {
      // تشفير بسيط - يمكن استبداله بمكتبة متخصصة
      return btoa(unescape(encodeURIComponent(value)));
    }
  
    private simpleDecrypt(value: string): string {
      // فك تشفير بسيط
      try {
        return decodeURIComponent(escape(atob(value)));
      } catch {
        return value;
      }
    }
  
    private clearByPrefix(prefix: string, storage: Storage): void {
      Object.keys(storage).forEach(key => {
        if (key.startsWith(prefix)) {
          storage.removeItem(key);
        }
      });
    }
  
    private calculateSize(storage: Storage): number {
      return Object.keys(storage).reduce((total, key) => {
        return total + key.length + (storage.getItem(key)?.length || 0);
      }, 0);
    }
  
    private notifyChange(key: string, value: any): void {
      this.changesSubject.next({ key, value });
    }
  }
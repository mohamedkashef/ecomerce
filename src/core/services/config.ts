import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { environment } from '../../environments/environment';

interface RuntimeConfig {
  baseUrl: string;
  featureFlag: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class Config {
  private runtimeConfig: Partial<RuntimeConfig> = {};
  private configLoaded = false;
  private readonly platformId = inject(PLATFORM_ID);

  async loadRuntimeConfig(): Promise<void> {
    if (this.configLoaded) {
      return;
    }

    try {
      if (isPlatformBrowser(this.platformId)) {
        const response = await fetch('/assets/runtime-config/runtime-config.json');

        if (!response.ok) {
          throw new Error(`Failed to load config: ${response.statusText}`);
        }

        this.runtimeConfig = await response.json();
      }

      this.configLoaded = true;
      console.log('Runtime configuration loaded successfully');
    } catch (error) {
      console.warn('Could not load runtime config, using environment defaults:', error);
      this.runtimeConfig = {};
      this.configLoaded = true;
    }
  }

  private getConfigValue<T>(key: string): T | undefined {
    if (!this.configLoaded) {
      console.warn('Config accessed before loading');
    }

    return this.getValueFromPath<T>(this.runtimeConfig, key) ??
      this.getValueFromPath<T>(environment, key);
  }

  private getValueFromPath<T>(obj: Record<string, any>, path: string): T | undefined {
    return path.split('.').reduce((acc, key) => acc?.[key], obj) as T;
  }

  get apiConfig() {
    return {
      baseUrl: this.getConfigValue<string>('baseUrl'),
      timeout: this.getConfigValue<number>('timeouts.api'),
      retryCount: this.getConfigValue<number>('retries.api'),
      ...environment.api
    };
  }
  get authConfig() {
    return {
      ...environment.auth,
      tokenKey: this.getConfigValue<string>('auth.tokenKey'),
      tokenExpiry: this.getConfigValue<number>('auth.tokenExpiry'),
    };
  }
}


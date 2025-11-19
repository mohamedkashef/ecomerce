import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';
import { initializeApp } from 'core/config/app-initializer';
import { Config } from 'core/services/config';
import { APP_INITIALIZER } from '@angular/core';
import { provideHttpClient,withFetch } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { withPreloading, PreloadAllModules } from '@angular/router';
import { Auth } from 'core/services/auth';
import { Storageservice } from 'core/services/storageservice';

export const appConfig: ApplicationConfig = {
  providers: [
    Auth,
    Storageservice,

    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),



    provideHttpClient(withFetch()),


    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [Config],
      multi: true
    },


    MessageService,
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: Aura
      }
    })
  ]
};

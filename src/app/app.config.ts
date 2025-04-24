import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { PreloadAllModules, provideRouter, withPreloading, withViewTransitions } from '@angular/router';
import { provideClientHydration, withEventReplay, withHttpTransferCacheOptions } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app.routes';
import { provideIcons } from './core/providers/icons.provider';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withViewTransitions(), withPreloading(PreloadAllModules)),
    provideClientHydration(withHttpTransferCacheOptions({ includePostRequests: true }), withEventReplay()),
    provideHttpClient(),
    provideIcons()
  ]
};

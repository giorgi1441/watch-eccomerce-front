import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection, TransferState } from '@angular/core';
import { PreloadAllModules, provideRouter, withPreloading, withViewTransitions } from '@angular/router';
import { provideClientHydration, withEventReplay, withHttpTransferCacheOptions } from '@angular/platform-browser';
import { HttpClient, provideHttpClient, withFetch } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';

import { routes } from './app.routes';
import { provideIcons } from './core/providers/icons.provider';
import { TranslateBrowserLoader } from './core/loaders/translate-browser.loader';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withViewTransitions(), withPreloading(PreloadAllModules)),
    provideClientHydration(withHttpTransferCacheOptions({ includePostRequests: true }), withEventReplay()),
    provideHttpClient(withFetch()),
    provideIcons(),
    importProvidersFrom(TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (httpClient: HttpClient, transferState: TransferState) => new TranslateBrowserLoader(httpClient, transferState),
        deps: [ HttpClient, TransferState ]
      },
      defaultLanguage: 'geo'
    })),
  ]
};

import { mergeApplicationConfig, ApplicationConfig, TransferState, importProvidersFrom } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { provideServerRouting } from '@angular/ssr';
import { appConfig } from './app.config';
import { serverRoutes } from './app.routes.server';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateServerLoader } from './core/loaders/translate-server.loader';

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(),
    provideServerRouting(serverRoutes),
    importProvidersFrom(TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (transferState: TransferState) => new TranslateServerLoader(transferState),
        deps: [ TransferState ],
      },
      defaultLanguage: 'geo'
    })),
  ]
};

export const config = mergeApplicationConfig(appConfig, serverConfig);

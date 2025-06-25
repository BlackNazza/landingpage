import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { App } from './app/app';
import { appConfig } from './app/app.config';

const mergedAppConfig = {
  ...appConfig,
  providers: [
    ...(appConfig.providers ?? []),
    provideHttpClient(),
  ],
};

bootstrapApplication(App, mergedAppConfig)
  .catch((err) => console.error(err));

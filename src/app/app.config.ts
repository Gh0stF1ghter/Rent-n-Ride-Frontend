import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import {
  AuthHttpInterceptor,
  authHttpInterceptorFn,
  provideAuth0,
} from '@auth0/auth0-angular';
import { environment } from '../environments/environment';
import { AdminPanelServiceEndpoints } from './api/constants/environment';
import { provideNativeDateAdapter } from '@angular/material/core';

export const appConfig: ApplicationConfig = {
  providers: [
    AuthHttpInterceptor,
    provideNativeDateAdapter(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient(withInterceptors([authHttpInterceptorFn])),
    provideAuth0({
      domain: environment.AUTH0_DOMAIN,
      clientId: environment.AUTH0_CLIENTID,
      authorizationParams: {
        audience: 'https://rent-ride/',
        redirect_uri: window.location.origin,
      },
      httpInterceptor: {
        allowedList: [
          `${AdminPanelServiceEndpoints.general}/*`,
        ],
      },
    }),
  ],
};

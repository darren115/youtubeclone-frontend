import { NgModule } from '@angular/core';
import { AuthModule } from 'angular-auth-oidc-client';

@NgModule({
  imports: [
    AuthModule.forRoot({
      config: {
        authority: 'https://dev-2nlnisdzhe3qm0km.uk.auth0.com',
        redirectUrl: 'http://localhost:4200/callback',
        // redirectUrl: window.location.origin,
        clientId: 'c1EBTADRIkxEzeLMMj0y9qR2AwlPnM2x',
        scope: 'openid profile offline_access email read write',
        responseType: 'code',
        silentRenew: true,
        useRefreshToken: true,
        secureRoutes: ['http://localhost:8080'],
        customParamsAuthRequest: {
          audience: 'http://localhost:8080',
        },
      },
    }),
  ],
  exports: [AuthModule],
})
export class AuthConfigModule {}

import { NgModule } from '@angular/core';
import { AuthModule } from 'angular-auth-oidc-client';

@NgModule({
  imports: [
    AuthModule.forRoot({
      config: {
        authority: 'https://dev-2nlnisdzhe3qm0km.uk.auth0.com',
        redirectUrl: window.location.origin,
        clientId: 'c1EBTADRIkxEzeLMMj0y9qR2AwlPnM2x',
        scope: 'openid profile offline_access',
        responseType: 'code',
        silentRenew: true,
        useRefreshToken: true,
      },
    }),
  ],
  exports: [AuthModule],
})
export class AuthConfigModule {}

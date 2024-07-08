import {NgModule} from '@angular/core';
import {UserManager, WebStorageStateStore} from 'oidc-client';
import {CoreSecurity} from "./security.module";
import {environment} from "../../environments/environment";

const userManager = new UserManager({
  authority: environment.AAI_AUTHORITY,
  client_id: environment.AAI_CLIENT_ID,
  redirect_uri: window.location.origin + '/aai-callback',
  post_logout_redirect_uri: window.location.origin,
  response_type: 'token id_token',
  scope: 'email openid profile',
  filterProtocolClaims: true,
  loadUserInfo: true,
  userStore: new WebStorageStateStore({store: window.localStorage})
});

@NgModule({
  imports: [CoreSecurity],
  providers: [
    {
      provide: UserManager, useValue: userManager,
    }
  ]
})
export class AaiSecurity {
}

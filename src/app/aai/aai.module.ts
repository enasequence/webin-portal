import {NgModule} from '@angular/core';
import {UserManager, WebStorageStateStore} from 'oidc-client';
import {CoreSecurity} from "./security.module";
import {environment} from "../../environments/environment";

@NgModule({
  imports: [CoreSecurity],
})
export class AaiSecurity {
}

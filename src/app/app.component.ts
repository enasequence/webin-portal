/*
 * Copyright 2018 EMBL - European Bioinformatics Institute
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this
 * file except in compliance with the License. You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software distributed under the
 * License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
 * CONDITIONS OF ANY KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations under the License.
 */

import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { environment } from '../environments/environment';
import { WebinAuthenticationService } from './webin-authentication.service';
declare let gtag: Function;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Webin';

  constructor(public router: Router,
    private _webinAuthService: WebinAuthenticationService) {
    // Adding code for Google Analytics
    if (environment.googleAnalyticsTrackingId) {
      // register google tag manager
      const gTagManagerScript = document.createElement('script');
      gTagManagerScript.async = true;
      gTagManagerScript.src = `https://www.googletagmanager.com/gtag/js?id=${environment.googleAnalyticsTrackingId}`;
      document.head.appendChild(gTagManagerScript);

      // register google analytics
      const gaScript = document.createElement('script');
      gaScript.innerHTML = `
        window.dataLayer = window.dataLayer || [];
        function gtag() { dataLayer.push(arguments); }
        gtag('js', new Date());`;

      document.head.appendChild(gaScript);
    }

    // Triggering route event for Google Analytics.
    this.router.events.subscribe(event => {

      var submissionAccount = JSON.parse(
        this._webinAuthService.getSubmissionAccount());

      if (event instanceof NavigationEnd) {
        gtag('config', environment.googleAnalyticsTrackingId,
          {
            'page_path': event.urlAfterRedirects,
            'page_location': event.url,
            'user_id': submissionAccount ? submissionAccount.id : ""
          }
        );

        if (submissionAccount) {
          gtag('set', 'user_properties', {
            'submission_account_id': submissionAccount.id
          });
        }
      }
    })
  }

}

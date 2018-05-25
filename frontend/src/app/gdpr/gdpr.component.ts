import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { WebinAuthenticationService } from '../webin-authentication.service';
import { WebinGdprService } from '../webin-gdpr.service';

@Component({
  selector: 'app-gdpr',
  templateUrl: './gdpr.component.html',
  styleUrls: ['./gdpr.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class GdprComponent implements OnInit {

 constructor(
    private webinAuthenticationService: WebinAuthenticationService,
    private webinGdprServer: WebinGdprService) { }
      ngOnInit() {
  }

  isEga(): boolean {
    return this.webinAuthenticationService.ega;
  }

  consent() {
      this.webinGdprServer.consent();
    }
}

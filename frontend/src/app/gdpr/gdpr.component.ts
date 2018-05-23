import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { WebinGdprService } from '../webin-gdpr.service';

@Component({
  selector: 'app-gdpr',
  templateUrl: './gdpr.component.html',
  styleUrls: ['./gdpr.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class GdprComponent implements OnInit {

 constructor(
    private webinGdprServer: WebinGdprService) { }
  ngOnInit() {
  }

 consent() {
      this.webinGdprServer.consent();
    }
}

import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { environment } from '../../environments/environment';

@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class TitleComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  getTitle() {
    if (environment.production) {
      return "Webin Programmatic Submission Portal";
    }
    else {
      return "Webin Programmatic Submission Portal (TEST)";
    }
  }
}

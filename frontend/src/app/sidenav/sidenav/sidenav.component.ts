import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { environment } from '../../../environments/environment';
import { WebinAuthenticationService } from '../../webin-authentication.service';
import { ReportType } from '../../report-type.enum';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnDestroy {

  mobileQuery: MediaQueryList;

  ReportType = ReportType;  
  isExpanded = true;
  showSubmenu: boolean = true;
  isShowing = true;
  showSubSubMenu: boolean = true;
  over="over";

  constructor(private _webinAuthenticationService: WebinAuthenticationService,
    changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 700px)');
  }

  ngOnDestroy(): void {
  }
  
  getTitle() {
    return environment.title;
  }

  isAuthenticated() {
    return this._webinAuthenticationService.authenticated;
  }

  getAccount() {
    return this._webinAuthenticationService.account;
  }

  mouseenter() {
    if (!this.isExpanded) {
      this.isShowing = true;
    }
  }

  mouseleave() {
    if (!this.isExpanded) {
      this.isShowing = false;
    }
  }

}

import { Component, OnInit, ChangeDetectorRef, OnDestroy, AfterViewChecked } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { environment } from '../../../environments/environment';
import { WebinAuthenticationService } from '../../webin-authentication.service';
import { ReportType } from '../../report-type.enum';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnDestroy, AfterViewChecked {

  mobileQuery: MediaQueryList;

  ReportType = ReportType;
  isExpanded = true;
  showSubmenu: boolean = true;
  isShowing = true;
  showSubSubMenu: boolean = true;
  over = "over";
  authFlag = false;


  constructor(private _webinAuthenticationService: WebinAuthenticationService,
    private changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 700px)');
  }

  ngOnDestroy(): void {
  }

  getTitle() {
    return environment.title;
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

  isAuthenticated() {
    return this.authFlag;
  }
  ngAfterViewChecked() {
    if (this.authFlag != this._webinAuthenticationService.authenticated) {
      this.authFlag = this._webinAuthenticationService.authenticated;
      this.changeDetectorRef.detectChanges();
    }
  }

  isEga(): boolean {
    return this._webinAuthenticationService.ega;
  }

}

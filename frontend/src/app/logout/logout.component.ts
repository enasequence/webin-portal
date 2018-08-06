import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { WebinAuthenticationService } from '../webin-authentication.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LogoutComponent implements OnInit {

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private webinAuthenticationService: WebinAuthenticationService) { }

    ngOnInit() {
        this.webinAuthenticationService.logout();
        this.router.navigateByUrl('', { skipLocationChange: false });
    }
}

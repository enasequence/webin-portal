import { Component, OnInit } from '@angular/core';
import { UtilService } from '../util/Util-services'
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ResetPasswordRequestDialogComponent } from '../reset-password-request-dialog/reset-password-request-dialog.component'
import { WebinAuthenticationService } from '../webin-authentication.service';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { MatchPasswordDirective } from '../directives/match-password.directive';
import { NonSubmissionResultDialogComponent } from '../non-submission-result-dialog/non-submission-result-dialog.component';

@Component({
  selector: 'app-reset-password-page',
  templateUrl: './reset-password-page.component.html',
  styleUrls: ['./reset-password-page.component.css']
})
export class ResetPasswordPageComponent implements OnInit {

  token: string;
  dialogRef: any;
  emailAddress: string;
  webinPassword: string;
  confirmPassword: string;
  error: string;


  constructor(
    private util: UtilService,
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private _webinAuthenticationService: WebinAuthenticationService,

  ) {
    console.log(this.route)
    this.route.queryParams.subscribe(params => {
      this.token = params['token'];
      _webinAuthenticationService.token = this.token;

    });
  }

  ngOnInit() {
  }

  resetPassword(form) {
    let title = "Reset Password";
    (this.util.resetPassword(form.value, this.token)).
      subscribe((data: any) => {
        let redirectPath = "";
        this.util.showSuccess(this, NonSubmissionResultDialogComponent, "Password is updated successfully", title, redirectPath)
      }, (error) => {
        if (typeof error.error === "string") {
          this.util.showError(this, NonSubmissionResultDialogComponent, error.error, title);
        } else {
          this.util.showHttpError(this, NonSubmissionResultDialogComponent, error, title);
        }
      });
  }

  openDialog(action, obj): void {
    this.dialogRef = this.dialog.open(ResetPasswordRequestDialogComponent, {
      width: '500px',
      backdropClass: 'custom-dialog-backdrop-class',
      panelClass: 'custom-dialog-panel-class',
      data: { action: action, data: obj }
    });

  }



}

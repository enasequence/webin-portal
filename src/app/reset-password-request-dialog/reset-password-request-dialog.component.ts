import { Component, OnInit, Optional, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder } from '@angular/forms';
import { UtilService } from '../util/Util-services'
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-reset-password-request',
  templateUrl: './reset-password-request-dialog.component.html',
  styleUrls: ['./reset-password-request-dialog.component.css']
})
export class ResetPasswordRequestDialogComponent implements OnInit {

  submissionAccountId: string;
  loggedIn: boolean;
  action: string;
  respObj: any;
  constructor(
    private util: UtilService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<ResetPasswordRequestDialogComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,) { 
      if(data.resetObj){
        this.submissionAccountId=data.resetObj.submissionAccountId || "";
        this.loggedIn=data.resetObj.loggedIn || false;
      }
      
      this.action=data.action;
      this.respObj=data;
    }

  ngOnInit() {
  }
  
  doAction(form){
    var resetPassReq=form.value;
    this.util.sendResetPasswordRequest(resetPassReq).
      subscribe((data:any) => { 
        this.closePopup();
          data={"emailAddress": resetPassReq.emailAddress}
          this.openDialog('Success',data);
      },(error) => {
          this.openDialog('Error',error); 
        });
  }

openDialog(action,obj): void {
  const dialogRef = this.dialog.open(ResetPasswordRequestDialogComponent, {
    width: '500px',
    backdropClass: 'custom-dialog-backdrop-class',
    panelClass: 'custom-dialog-panel-class',
    data: {action: action,data:obj}
  });

}

  closePopup(){
    this.dialogRef.close({event: 'close'});
  }

  

}

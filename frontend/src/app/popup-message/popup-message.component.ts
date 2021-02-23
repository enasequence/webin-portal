import { Component, OnInit, Optional, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroupDirective, NgForm, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { UtilService } from '../util/Util-services'


@Component({
  selector: 'app-popup-message',
  templateUrl: './popup-message.component.html',
  styleUrls: ['./popup-message.component.css']
})
export class PopupMessageComponent implements OnInit {
  action: string;
  message: string;
  title: string;
  constructor(
    public dialogRef: MatDialogRef<PopupMessageComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any) {
    this.action = data.action;
    this.message = data.message;
    this.title = data.title;
  }

  ngOnInit() {
  }

  closePopup() {
    this.dialogRef.close({ event: 'close' });
  }

}

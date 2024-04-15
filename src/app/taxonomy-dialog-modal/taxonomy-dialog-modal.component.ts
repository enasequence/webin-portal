import { Component, OnInit, Optional, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CustomValidationService } from '../validation/custom-validation.service';

@Component({
  selector: 'app-taxonomy-dialog-modal',
  templateUrl: './taxonomy-dialog-modal.component.html',
  styleUrls: ['./taxonomy-dialog-modal.component.css']
})
export class TaxonomyDialogModalComponent implements OnInit {

  /* Add / Update / Delete */
  action: string;

  /** Form / Spreadsheet */
  source: string;

  taxonRefObj = {};

  proposedNameArr: string;

  constructor(public dialogRef: MatDialogRef<TaxonomyDialogModalComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any, ) {
    this.action = data.action;
    this.source = data.source;
    this.copyParentValues(data.taxonRefObj, this.taxonRefObj)
    this.proposedNameArr = JSON.stringify(data.proposedNameArr);

  }

  ngOnInit() {
    console.log(">>>>>>" + this.taxonRefObj["nameType"])
  }

  doAction(action) {
    this.dialogRef.close({ event: this.action, source: this.source, data: this.taxonRefObj });
  }

  copyParentValues(from, to) {
    to.id = from.id;
    to.proposedName = from.proposedName;
    to.nameType = from.nameType;
    to.host = from.host;
    to.projectId = from.projectId;
    to.description = from.description;
  }

  closePopup() {
    this.dialogRef.close({ event: 'close' });
  }

  isDisabledButton(form) {
    if (form.invalid || this.taxonRefObj["nameType"] == '') {
      return false;
    } else {
      return true;
    }
  }


}

import { Component, OnInit, Optional, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UtilService } from '../../util/Util-services';
import { XmlService } from '../../util/xml.service'
import { PopupMessageComponent } from '../../popup-message/popup-message.component';
import { HttpErrorResponse } from '@angular/common/http';
import { WebinRestService } from '../../webin-rest.service';
import { retry } from 'rxjs/operators';

@Component({
  selector: 'app-release-date-popup',
  templateUrl: './release-date-popup.component.html',
  styleUrls: ['./release-date-popup.component.css']
})
export class ReleaseDatePopupComponent implements OnInit {

  today = new Date();
  maxDate: any;
  studyObj = {};
  xmlString: any;
  id: any;
  releaseDate: any;
  constructor(
    private util: UtilService,
    private xmlUtil: XmlService,
    private _webinRestService: WebinRestService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<ReleaseDatePopupComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any, ) {
    if (data.studyObj) {
      this.studyObj = data.studyObj["report"]
      this.id = this.studyObj["id"];
    }
    var date = new Date();
    this.maxDate = new Date(date.getFullYear() + 2, date.getMonth(), date.getDate());
  }



  ngOnInit() {
  }

  doAction(form) {
    this.updateReleaseDate(form);

  }



  updateReleaseDate(form) {

    this.util.getProjectXml(this.id).
      subscribe((xmlString: any) => {
        this.xmlString = xmlString;
        var observable = this.xmlUtil.updateProjectReleaseDate(this.xmlString, form.value);

        this.handleServerResponse(observable);
      });
  }




  handleServerResponse(observable) {
    if (observable) {
      observable.pipe(
        retry(3)
      ).subscribe(
        data => {
          let result = this._webinRestService.parseResult(data);
          if (result.isError) {
            console.log(result.errors)
            let message = result.errors[0]["error"];
          } else {

            console.log(result.accessions);
            let message = "Successfully subimited project with project identification : " + result.accessions[0]["accession"];
          }
          this.closePopup();
        },
        (err: HttpErrorResponse) => {
          console.error('** Webin submission service failed **', err);
          this.closePopup();
        }

      );

    }
  }

  showSuccessPopup(message) {
    const dialogRef = this.dialog.open(PopupMessageComponent, {
      width: '500px',
      backdropClass: 'custom-dialog-backdrop-class',
      panelClass: 'custom-dialog-panel-class',
      data: { 'action': 'Success', 'message': message, 'title': 'Study Submission' }
    });
  }

  showErrorPopup(message) {
    const dialogRef = this.dialog.open(PopupMessageComponent, {
      width: '500px',
      backdropClass: 'custom-dialog-backdrop-class',
      panelClass: 'custom-dialog-panel-class',
      data: { 'action': 'Error', 'message': message, 'title': 'Study Redistration Error' }
    });

  }

  closePopup() {
    this.dialogRef.close({ event: 'close' });
  }

  cancelPopup() {
    this.dialogRef.close({ event: 'cancel' });
  }

}

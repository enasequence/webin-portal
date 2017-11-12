import { Component,  EventEmitter, Output, Input, OnInit, ViewEncapsulation } from '@angular/core';
import {saveAs as importedSaveAs} from "file-saver";

import { SpreadsheetService } from '../spreadsheet.service';

// import {Observable} from 'rxjs/Rx';

@Component({
  selector: 'app-submission-spreadsheet-selector',
  templateUrl: './submission-spreadsheet-selector.component.html',
  styleUrls: ['./submission-spreadsheet-selector.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SubmissionSpreadsheetSelectorComponent implements OnInit {

  @Input() submissionType: string;
  @Input() submissionFormat: string;
  private _submissionSpreadsheet: string;

  private _baseUrl = 'https://github.com/enasequence/sequencetools/blob/master/';

  getSpreadsheetUrl() {
    return this._baseUrl + '/' + this.getSpreadsheetFileName();
  }

  getSpreadsheetFileName() {
    return 'README.md';
/*
      return
        this.submissionType.toLowerCase() + '-' +
        this.submissionFormat.toLowerCase() + '.' +
        this._submissionSpreadsheet.toLowerCase();
*/
  }

  set submissionSpreadsheet(submissionSpreadsheet: string) {
    if (this._submissionSpreadsheet != submissionSpreadsheet) {
      this._submissionSpreadsheet = submissionSpreadsheet;
      console.info('Changed submission spreadsheet: ' + submissionSpreadsheet);
      this.onSubmissionSpreadsheetChange.emit(submissionSpreadsheet);
    }
  }

  get submissionSpreadsheet(): string { return this._submissionSpreadsheet; }

  @Output() public onSubmissionSpreadsheetChange = new EventEmitter<string>();

  download() {
      this.spreadsheetService.download(this.getSpreadsheetFileName()).subscribe(blob => {
          importedSaveAs(blob, this.getSpreadsheetFileName());
      })
  }

  constructor(private spreadsheetService: SpreadsheetService) {
  }

  ngOnInit() {
  }
}

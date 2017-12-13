import { Component, EventEmitter, Output, Input, OnInit, ViewEncapsulation } from '@angular/core';
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
    if (this._submissionSpreadsheet != undefined) {
      if (this.submissionType == 'Transcriptomes') {
        if (this.submissionFormat == 'unannotated sequences') {
          return 'transcriptome_unannotated' + '.' + this._submissionSpreadsheet;
        }
        else if (this.submissionFormat == 'annotated sequences') {
          return 'transcriptome_annotated' + '.' + this._submissionSpreadsheet;
        }
      }
      else if (this.submissionType == 'Genomes') {
        if (this.submissionFormat == 'unannotated sequences') {
        }
        else if (this.submissionFormat == 'annotated sequences') {
        }
      }
      else if (this.submissionType == 'Reads') {
        if (this.submissionFormat == 'CRAM') {
        }
        else if (this.submissionFormat == 'BAM') {
        }
        else if (this.submissionFormat == 'Fastq') {
        }
        else if (this.submissionFormat == 'Paired Fastq') {
        }
      }
    }

    return "";
  }

  set submissionSpreadsheet(submissionSpreadsheet: string) {
    if (this._submissionSpreadsheet != submissionSpreadsheet) {
      this._submissionSpreadsheet = submissionSpreadsheet;
      console.info('Changed submission spreadsheet: ' + submissionSpreadsheet);
      this.onSubmissionSpreadsheetChange.emit(submissionSpreadsheet);
    }
  }

  get submissionSpreadsheet(): string { return this._submissionSpreadsheet; }

  @Output() onSubmissionSpreadsheetChange = new EventEmitter<string>();

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

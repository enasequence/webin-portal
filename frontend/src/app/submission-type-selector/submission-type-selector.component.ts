import { Component,  EventEmitter, Output, OnInit, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {saveAs as importedSaveAs} from "file-saver";

import { SpreadsheetService } from '../spreadsheet.service';

@Component({
  selector: 'app-submission-type-selector',
  templateUrl: './submission-type-selector.component.html',
  styleUrls: ['./submission-type-selector.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SubmissionTypeSelectorComponent implements OnInit {

  private _submissionType: string;
  private transcriptomeInfoFileName: string = 'transcriptome.info';

  set submissionType(submissionType: string) {
    if (this._submissionType != submissionType) {
      this._submissionType = submissionType;
      console.info('Changed submission type: ' + submissionType);
      this.onSubmissionTypeChange.emit(submissionType);
    }
  }

  get submissionType(): string { return this._submissionType; }

  @Output() onSubmissionTypeChange = new EventEmitter<string>();


  downloadTranscriptomeInfo() {
      this.spreadsheetService.download(this.transcriptomeInfoFileName).subscribe(blob => {
          importedSaveAs(blob, this.transcriptomeInfoFileName);
      })
  }

  constructor(private spreadsheetService: SpreadsheetService) {
  }

  ngOnInit() {
    console.info('ngOnInit');
      this.submissionType = 'Reads';
  }
}

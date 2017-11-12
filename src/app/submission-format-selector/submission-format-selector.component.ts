import { Component,  EventEmitter, Output, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-submission-format-selector',
  templateUrl: './submission-format-selector.component.html',
  styleUrls: ['./submission-format-selector.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SubmissionFormatSelectorComponent implements OnInit {

  @Input() submissionType: string;

  readFormats = [
    'CRAM',
    'BAM',
    'Fastq',
    'Paired Fastq',
  ];

  genomeFormats = [
    'unannotated sequences',
    'annotated sequences',
  ];

  transcriptomeFormats = [
    'unannotated sequences',
    'annotated sequences',
  ];

  private _submissionFormat: string;

  set submissionFormat(submissionFormat: string) {
    if (this._submissionFormat != submissionFormat) {
      this._submissionFormat = submissionFormat;
      console.info('Changed submission Format: ' + submissionFormat);
      this.onSubmissionFormatChange.emit(submissionFormat);
    }
  }

  get submissionFormat(): string { return this._submissionFormat; }

  @Output() public onSubmissionFormatChange = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }
}

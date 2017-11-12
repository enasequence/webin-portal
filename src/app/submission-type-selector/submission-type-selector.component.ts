import { Component,  EventEmitter, Output, OnInit, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-submission-type-selector',
  templateUrl: './submission-type-selector.component.html',
  styleUrls: ['./submission-type-selector.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SubmissionTypeSelectorComponent implements OnInit {

  private _submissionType: string;

  set submissionType(submissionType: string) {
    if (this._submissionType != submissionType) {
      this._submissionType = submissionType;
      console.info('Changed submission type: ' + submissionType);
      this.onSubmissionTypeChange.emit(submissionType);
    }
  }

  get submissionType(): string { return this._submissionType; }

  @Output() public onSubmissionTypeChange = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
    console.info('ngOnInit');
      this.submissionType = 'Reads';
  }
}

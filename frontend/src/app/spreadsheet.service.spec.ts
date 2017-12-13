import { TestBed, inject } from '@angular/core/testing';

import { SpreadsheetService } from './spreadsheet.service';

describe('SpreadsheetService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SpreadsheetService]
    });
  });

  it('should be created', inject([SpreadsheetService], (service: SpreadsheetService) => {
    expect(service).toBeTruthy();
  }));
});

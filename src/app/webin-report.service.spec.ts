import { TestBed, inject } from '@angular/core/testing';

import { WebinReportService } from './webin-report.service';

describe('WebinReportService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WebinReportService]
    });
  });

  it('should be created', inject([WebinReportService], (service: WebinReportService) => {
    expect(service).toBeTruthy();
  }));
});

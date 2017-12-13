import { TestBed, inject } from '@angular/core/testing';

import { WebinXmlReportService } from './webin-xml-report.service';

describe('WebinXmlReportService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WebinXmlReportService]
    });
  });

  it('should be created', inject([WebinXmlReportService], (service: WebinXmlReportService) => {
    expect(service).toBeTruthy();
  }));
});

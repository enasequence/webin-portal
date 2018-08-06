import { TestBed, inject } from '@angular/core/testing';

import { WebinGdprService } from './webin-gdpr.service';

describe('WebinGdprService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WebinGdprService]
    });
  });

  it('should be created', inject([WebinGdprService], (service: WebinGdprService) => {
    expect(service).toBeTruthy();
  }));
});

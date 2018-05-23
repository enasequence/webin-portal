import { TestBed, inject } from '@angular/core/testing';

import { WebinGdprGuardService } from './webin-gdpr-guard.service';

describe('WebinGdprGuardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WebinGdprGuardService]
    });
  });

  it('should be created', inject([WebinGdprGuardService], (service: WebinGdprGuardService) => {
    expect(service).toBeTruthy();
  }));
});

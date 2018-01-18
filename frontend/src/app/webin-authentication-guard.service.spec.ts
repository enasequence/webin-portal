import { TestBed, inject } from '@angular/core/testing';

import { WebinAuthenticationGuardService } from './webin-authentication-guard.service';

describe('WebinAuthenticationGuardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WebinAuthenticationGuardService]
    });
  });

  it('should be created', inject([WebinAuthenticationGuardService], (service: WebinAuthenticationGuardService) => {
    expect(service).toBeTruthy();
  }));
});

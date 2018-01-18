import { TestBed, inject } from '@angular/core/testing';

import { WebinAuthenticationService } from './webin-authentication.service';

describe('WebinAuthenticationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WebinAuthenticationService]
    });
  });

  it('should be created', inject([WebinAuthenticationService], (service: WebinAuthenticationService) => {
    expect(service).toBeTruthy();
  }));
});

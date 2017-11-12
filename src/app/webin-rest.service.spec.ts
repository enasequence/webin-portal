import { TestBed, inject } from '@angular/core/testing';

import { WebinRestService } from './webin-rest-service.service';

describe('WebinRestService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WebinRestService]
    });
  });

  it('should be created', inject([WebinRestService], (service: WebinRestService) => {
    expect(service).toBeTruthy();
  }));
});

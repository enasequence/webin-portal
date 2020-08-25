import { TestBed } from '@angular/core/testing';

import { XmlService } from './xml.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { OverlayModule } from '@angular/cdk/overlay';
import { InjectionToken } from '@angular/core';
import { WebinAuthenticationService } from '../webin-authentication.service';
import { HttpClientModule } from '@angular/common/http';
import { WebinRestService } from '../webin-rest.service';

describe('XmlService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers:[ WebinAuthenticationService,WebinRestService ],
    imports:[OverlayModule,MatDialogModule, HttpClientModule]
  }));

  it('should be created', () => {
    const service: XmlService = TestBed.get(XmlService);
  });
});

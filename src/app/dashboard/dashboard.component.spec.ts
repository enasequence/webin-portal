/*
 * Copyright 2018 EMBL - European Bioinformatics Institute
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this
 * file except in compliance with the License. You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software distributed under the
 * License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
 * CONDITIONS OF ANY KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations under the License.
 */

import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { WebinAuthenticationService } from '../webin-authentication.service';
import { ReportType } from '../report-type.enum';
import { MatIconModule } from '@angular/material'
import {MatExpansionModule} from '@angular/material/expansion';

@Component({
  selector: 'app-main',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  encapsulation: ViewEncapsulation.None,
 
})
export class DashboardComponent {

  ReportType = ReportType;   // Allows use in template

  constructor(
    private _webinAuthenticationService: WebinAuthenticationService) { }

  ngOnInit() {
  }

  ngOnDestroy() {
  }

  isEga(): boolean {
    return this._webinAuthenticationService.ega;
  }
}

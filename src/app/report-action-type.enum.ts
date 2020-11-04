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

import { ReportType } from './report-type.enum';
import { ReportActionInterface } from './report-action.interface';

export enum ReportActionType {
  changeReport = 'changeReport',
  editXml = 'editXml',
}

export namespace ReportActionType {

  export function createChangeReportAction(reportType: ReportType, id: string): ReportActionInterface {
    return {
      reportActionType: ReportActionType.changeReport,
      reportType: reportType,
      id: id
    };
  }

  export function createEditXmlAction(reportType: ReportType, id: string): ReportActionInterface {
  return {
      reportActionType: ReportActionType.editXml,
      reportType: reportType,
      id: id
    };
  }
}

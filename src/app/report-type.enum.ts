export enum ReportType {
  // Number is the tab number in dashboard component.
  studies          = 2,
  samples          = 3,
  runs             = 4,
  analyses         = 5,
  runFiles         = 6,
  analysisFiles    = 7,
  dacs             = 8,
  policies         = 9,
  datasets         = 10,
  // Number is NOT the tab number in dashboard component.
  projects         = 101,
  experiments      = 102
}

export class ReportTypeUtils {

  static getTitle(reportType: ReportType, id: string) : string {
    let title: string;
    switch(reportType) {
       case ReportType.studies: {
         title = "Study";
         break;
       }
       case ReportType.projects: {
         title = "Project";
         break;
       }
       case ReportType.samples: {
         title = "Sample";
         break;
       }
       case ReportType.experiments: {
         title = "Experiments";
         break;
       }
       case ReportType.runs: {
         title = "Run";
         break;
       }
       case ReportType.analyses: {
         title = "Analysis";
         break;
       }
       case ReportType.runFiles: {
         title = "Submitted files for run";
         break;
       }
       case ReportType.analysisFiles: {
         title = "Submitted files for analysis";
         break;
       }
       case ReportType.datasets: {
         title = "Dataset";
         break;
       }
       case ReportType.dacs: {
         title = "Dac";
         break;
       }
       case ReportType.policies: {
         title = "Policy";
         break;
       }
       default: {
         return "";
       }
    }
    return title + " " + id;
  }

}

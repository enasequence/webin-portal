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

  static getCapitalizedSingularName(reportType: ReportType) : string {
    switch(reportType) {
       case ReportType.studies: {
         return "Study";
       }
       case ReportType.projects: {
         return "Project";
       }
       case ReportType.samples: {
         return "Sample";
       }
       case ReportType.experiments: {
         return "Experiment";
       }
       case ReportType.runs: {
         return "Run";
       }
       case ReportType.analyses: {
         return "Analysis";
       }
       case ReportType.runFiles: {
         return "Submitted files for run";
       }
       case ReportType.analysisFiles: {
         return "Submitted files for analysis";
       }
       case ReportType.datasets: {
         return "Dataset";
       }
       case ReportType.dacs: {
         return "Dac";
       }
       case ReportType.policies: {
         return "Policy";
       }
       default: {
         return "";
       }
    }
  }

  static getLowerCaseSingularName(reportType: ReportType) : string {
    return ReportTypeUtils.getCapitalizedSingularName().toLowerCase();
  }
}

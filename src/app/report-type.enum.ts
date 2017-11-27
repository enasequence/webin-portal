export enum ReportType {
  studies = "studies",
  projects = "projects",
  samples = "samples",
  experiments = "experiments",
  runs = "runs",
  analyses = "analyses",
  runFiles = "runFiles",
  analysisFiles = "analysisFiles",
  dacs = "dacs",
  policies = "policies",
  datasets = "datasets"
}

export class ReportTypeUtils {

  static getObjectName(reportType: ReportType) : string {
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
       case ReportType.dacs: {
         return "Dac";
       }
       case ReportType.policies: {
         return "Policy";
       }
       case ReportType.datasets: {
         return "Dataset";
       }       
       default: {
         return "";
       }
    }
  }

}

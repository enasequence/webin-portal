export enum ReportType {
  studies = 'studies',
  projects = 'projects',
  samples = 'samples',
  experiments = 'experiments',
  runs = 'runs',
  analyses = 'analyses',
  runFiles = 'runFiles',
  analysisFiles = 'analysisFiles',
  runProcess = 'runProcess',
  analysisProcess = 'analysisProcess',
  dacs = 'dacs',
  policies = 'policies',
  datasets = 'datasets'
}

export class ReportTypeUtils {

  static getCapitalisedSingularName(reportType: ReportType): string {
    switch (reportType) {
       case ReportType.studies: {
         return 'Study';
       }
       case ReportType.projects: {
         return 'Project';
       }
       case ReportType.samples: {
         return 'Sample';
       }
       case ReportType.experiments: {
         return 'Experiment';
       }
       case ReportType.runs: {
         return 'Run';
       }
       case ReportType.analyses: {
         return 'Analysis';
       }
       case ReportType.runFiles: {
         return 'Submitted files for run';
       }
       case ReportType.analysisFiles: {
         return 'Submitted files for analysis';
       }
       case ReportType.runProcess: {
         return 'Run processing status';
       }
       case ReportType.analysisProcess: {
         return 'Analysis processing status';
       }
       case ReportType.dacs: {
         return 'Dac';
       }
       case ReportType.policies: {
         return 'Policy';
       }
       case ReportType.datasets: {
         return 'Dataset';
       }
       default: {
         return '';
       }
    }
  }


  static getPluralName(reportType: ReportType): string {
    switch (reportType) {
       case ReportType.studies: {
         return 'studies';
       }
       case ReportType.projects: {
         return 'projects';
       }
       case ReportType.samples: {
         return 'samples';
       }
       case ReportType.experiments: {
         return 'experiments';
       }
       case ReportType.runs: {
         return 'runs';
       }
       case ReportType.analyses: {
         return 'analyses';
       }
       case ReportType.runFiles: {
         return 'submitted run files';
       }
       case ReportType.analysisFiles: {
         return 'submitted analyses files';
       }
       case ReportType.runProcess: {
         return 'run processing statuses';
       }
       case ReportType.analysisProcess: {
         return 'analysis processing statuses';
       }
       case ReportType.dacs: {
         return 'dacs';
       }
       case ReportType.policies: {
         return 'policies';
       }
       case ReportType.datasets: {
         return 'datasets';
       }
       default: {
         return '';
       }
    }
  }

  static getReportName(reportType: ReportType): string {
    switch (reportType) {
       case ReportType.studies: {
         return 'Studies';
       }
       case ReportType.projects: {
         return 'Projects';
       }
       case ReportType.samples: {
         return 'Samples';
       }
       case ReportType.experiments: {
         return 'Experiments';
       }
       case ReportType.runs: {
         return 'Runs';
       }
       case ReportType.analyses: {
         return 'Analyses';
       }
       case ReportType.runFiles: {
         return 'Run_files';
       }
       case ReportType.analysisFiles: {
         return 'Analysis_files';
       }
       case ReportType.runProcess: {
         return 'Run_process';
       }
       case ReportType.analysisProcess: {
         return 'Analysis_process';
       }
       case ReportType.dacs: {
         return 'Dacs';
       }
       case ReportType.policies: {
         return 'Policies';
       }
       case ReportType.datasets: {
         return 'Datasets';
       }
       default: {
         return '';
       }
    }
  }



}

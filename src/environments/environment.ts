// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  webinServiceUrl: 'https://www-test.ebi.ac.uk/ena/submit/drop-box/submit/',
  webinAuthenticationServiceUrl: 'https://www-test.ebi.ac.uk/ena/submit/drop-box/login',
  webinReportServiceUrl: 'http://ves-hx-5a:8221/ena/submit/report', // TODO
  spreadsheetServiceUrl: 'https://raw.githubusercontent.com/enasequence/sub-spreadsheet/master/',
};

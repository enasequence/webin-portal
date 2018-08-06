// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  title: 'Webin submissions portal (DEV)',
  webinServiceUrl: 'https://www-test.ebi.ac.uk/ena/submit/drop-box/submit/',
  webinAuthenticationServiceUrl: 'https://www.ebi.ac.uk/ena/auth/login',
  webinAuthenticationTokenUrl: 'https://www.ebi.ac.uk/ena/auth/token',
  webinReportServiceUrl: 'http://ves-ebi-5b:8221/ena/submit/report',
  //webinReportServiceUrl: 'https://wwwdev.ebi.ac.uk/ena/submit/report',
  webinXmlReportServiceUrl: 'http://ves-hx-5b:8110/ena/submit/drop-box',
  webinGdprServiceUrl: 'TODO'
};

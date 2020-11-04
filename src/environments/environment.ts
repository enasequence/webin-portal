// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  title: 'Webin submissions portal (DEFAULT)',
  webinServiceUrl: 'http://ves-ebi-5b:8110/ena/submit/drop-box/submit/',
  webinUpdateRequestUrl: 'http://ves-ebi-5b:8110/ena/submit/drop-box/email/update-request/',
  webinAuthenticationServiceUrl: 'http://10.3.15.62:31437/ena/submit/webin/auth/login',
  webinAuthenticationTokenUrl: 'http://10.3.15.62:31437/ena/submit/webin/auth/token',
  webinReportServiceUrl: 'http://ves-ebi-5b:8221/ena/submit/report',
  webinXmlReportServiceUrl: 'http://ves-ebi-5b:8110/ena/submit/drop-box',
  webinAdminServiceUrl: 'http://10.3.15.62:31437/ena/submit/webin/auth/admin',
  webinGdprServiceUrl: 'TODO',
  pupMedUrl: 'https://www.ebi.ac.uk/europepmc/webservices/rest/search',
  
  
};

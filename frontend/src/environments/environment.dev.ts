// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  title: 'Webin submissions portal (DEV)',
  webinServiceUrl: 'http://ves-ebi-5b:8110/ena/submit/drop-box/submit/',
  webinUpdateRequestUrl: 'http://ves-ebi-5b:8110/ena/submit/drop-box/email/update-request/',
  webinAuthenticationServiceUrl: 'https://wwwdev.ebi.ac.uk/ena/dev/submit/webin/auth/login',
  webinAuthenticationTokenUrl: 'https://wwwdev.ebi.ac.uk/ena/dev/submit/webin/auth/token',
  webinReportServiceUrl: 'http://ves-ebi-5b:8221/ena/submit/report',
  webinXmlReportServiceUrl: 'http://ves-ebi-5b:8110/ena/submit/drop-box',
  webinAdminServiceUrl: 'https://wwwdev.ebi.ac.uk/ena/dev/submit/webin/auth/admin',
  webinGdprServiceUrl: 'TODO',
  pupMedUrl: 'https://www.ebi.ac.uk/europepmc/webservices/rest/search',
  taxonomySubmissionEmail: 'ena-helpdesk@ebi.ac.uk'
};

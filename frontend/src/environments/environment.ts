// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: true,
  title: 'Webin submissions portal',
  webinServiceUrl: 'https://www.ebi.ac.uk/ena/submit/drop-box/submit/',
  webinUpdateRequestUrl: 'https://www.ebi.ac.uk/ena/submit/drop-box/email/update-request/',
  webinAuthenticationServiceUrl: 'https://www.ebi.ac.uk/ena/submit/webin/auth/login',
  webinAuthenticationTokenUrl: 'https://www.ebi.ac.uk/ena/submit/webin/auth/token',
  webinReportServiceUrl: 'https://www.ebi.ac.uk/ena/submit/report',
  webinXmlReportServiceUrl: 'https://www.ebi.ac.uk/ena/submit/drop-box',
  webinAdminServiceUrl: 'https://www.ebi.ac.uk/ena/submit/webin/auth/admin',
  webinGdprServiceUrl: 'TODO',
  pupMedUrl: 'https://www.ebi.ac.uk/europepmc/webservices/rest/search',
  
  
};

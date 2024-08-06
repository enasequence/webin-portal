// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  title: 'Webin Submissions Portal (DEV)',
  webinRestUrl: 'https://wwwdev.ebi.ac.uk/ena/dev/submit/drop-box',
  webinAuthUrl: 'http://localhost:8080/ena/dev/submit/webin/auth',
  webinReportServiceUrl: 'https://wwwdev.ebi.ac.uk/ena/dev/submit/report',
  webinAdminServiceUrl: 'http://localhost:8080/ena/dev/submit/webin/auth/admin',
  sourceAttributeHelperURL: 'https://wwwdev.ebi.ac.uk/ena/sah/',
  webinGdprServiceUrl: 'TODO',
  pupMedUrl: 'https://www.ebi.ac.uk/europepmc/webservices/rest/search',
  taxonomySubmissionEmail: 'ena-collaborations@ebi.ac.uk',
  googleAnalyticsTrackingId: 'G-RSFF5E4EP8',
  basePath: '/ena/dev/submit/webin/',

  firebase: {
    apiKey: 'AIzaSyAREv8WdJPa0YX-2cwCy2WNTzpBbPFVR88',
    authDomain: 'prj-dev-internal-ena-1.firebaseapp.com'
  },

  hideFeatureLocalLogin: true,
  hideFeatureInvitation: true,
  SECURED_ENDPOINTS: undefined,
  DOMAIN_WHITELIST: undefined,
  // AAI
  AAI_CLIENT_ID: 'e2041c2d-9449-4468-856e-e84711cebd21',
  AAI_AUTHORITY: 'https://login.elixir-czech.org/oidc',
};

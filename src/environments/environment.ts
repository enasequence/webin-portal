// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
    production: false,
    title: 'Webin Submissions Portal (DEV)',
    webinRestUrl: 'https://www.ebi.ac.uk/ena/submit/drop-box',
    webinAuthUrl: 'https://www.ebi.ac.uk/ena/submit/webin/auth',
    webinReportServiceUrl: 'https://www.ebi.ac.uk/ena/submit/report',
    webinAdminServiceUrl: 'https://www.ebi.ac.uk/ena/submit/webin/auth/admin',
    schemaStoreUrl: '/api/schema-store',
    spreadsheetGeneratorUrl: 'http://10.49.22.107:30000', // Updated to point to deployed service
    sourceAttributeHelperURL: 'https://wwwdev.ebi.ac.uk/ena/sah/',
    webinGdprServiceUrl: 'TODO',
    pupMedUrl: 'https://www.ebi.ac.uk/europepmc/webservices/rest/search',
    taxonomySubmissionEmail: 'ena-collaborations@ebi.ac.uk',
    googleAnalyticsTrackingId: 'G-RSFF5E4EP8'
};


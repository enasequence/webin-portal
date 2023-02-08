# Webin Submissions Portal

[![Codacy Badge](https://api.codacy.com/project/badge/Grade/2dd3617875b940c2a4963a7d740250ff)](https://app.codacy.com/app/enasequence/webin-portal?utm_source=github.com&utm_medium=referral&utm_content=enasequence/webin-portal&utm_campaign=badger)

`Google Analytics URL`
https://analytics.google.com/analytics/web/#/p299294785/realtime/overview?params=_u..nav%3Dmaui

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.5.0 and has been later upgraded to
version 1.6.8
version 7.3.8
## Initialize Project
Run the below command from project directory (where package.json file is found) for initializing the project.

`npm update`

## Development server

Run `ng serve --base-href=/ena/dev/submit/webin/` for a dev server. Navigate to `http://localhost:4200/ena/dev/submit/webin`. The app will automatically reload if you change any of the source files.

## Production server

Run `ng build --prod` and then `ng serve --prod --base-href=/ena/submit/webin/` for a production server. Navigate to `http://localhost:4200/ena/submit/webin`.

## Docker image build (for local system only)

`docker build -t webin-portal --build-arg configuration=dev --build-arg basePath=/ena/dev/submit/webin/ .`

The above command will create a docker image configured with dev profile. 

## Docker image run (for local system only)

`docker run --name webin-portal-container -d -p 8080:80 webin-portal`

The application will be running in `http://localhost:8080//ena/dev/submit/webin/`

## Docker image build (for local run/ test only)

Run `docker build -t dockerhub.ebi.ac.uk/enasequence/webin-portal --build-arg configuration=dev --build-arg basePath=/ena/dev/submit/webin/ . `

## Docker image push (for local run/ test only)

Run `docker push dockerhub.ebi.ac.uk/enasequence/webin-portal`

## Kubernetes deployment
For kubernetes deployment we need a unique project version number because the version is used to create unique docker images. For keeping the version number unique we use the corresponding git tag of the release. The version related steps involved in releasing the project are listed below.

1. Check the latest version number in GitHub or GitLab or using the git tag command:

```
git tag
```

The tag should be a semantic version number.

When deploying in production:

```
A.B.C (e.g. 1.0.0)
```

When deploying in test:

```
test-A.B.C (e.g. dev-1.0.0)
```

When deploying in development:

```
dev-A.B.C (e.g. dev-1.0.0)
```

2. Commit and push all the changes that need to be released.

3. Create and push the git tag with value "new version number". 

```
git tag [dev-]A.B.C
git push origin [dev-]A.B.C
```

Please note: 

- The package and deploy GitLab CI/CD stages will only run for git tags. The git tag will be used as the docker image tag.
- The production deploy GitLab CI/CD stage will only run from master branch.
- Please refer to the .gitlab-ci.yml file for more details

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Material typography

https://material.io/guidelines/style/typography.html#typography-styles

## Material theming

https://material.angular.io/guide/theming

## Material colors

https://material.io/guidelines/style/color.html#color-color-system

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

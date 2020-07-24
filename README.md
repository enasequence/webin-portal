# Webin Submissions Portal

[![Codacy Badge](https://api.codacy.com/project/badge/Grade/2dd3617875b940c2a4963a7d740250ff)](https://app.codacy.com/app/enasequence/webin-portal?utm_source=github.com&utm_medium=referral&utm_content=enasequence/webin-portal&utm_campaign=badger)

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.5.0 and has been later upgraded to
version 1.6.8
version 7.3.8

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/ena/submit/webin`. The app will automatically reload if you change any of the source files.

## Production server

Run `ng build --prod` and then `ng serve --prod` for a production server. Navigate to `http://localhost:4200/ena/submit/webin`.

## Docker (single stage for testing)

1. Run `ng build --prod`
2. Run `docker build -t <image_name> . `
3. Run `docker run --name <container_name>-1 -d -p 8080:80 <image_name>`

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

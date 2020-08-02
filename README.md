# Webin Submissions Portal

[![Codacy Badge](https://api.codacy.com/project/badge/Grade/2dd3617875b940c2a4963a7d740250ff)](https://app.codacy.com/app/enasequence/webin-portal?utm_source=github.com&utm_medium=referral&utm_content=enasequence/webin-portal&utm_campaign=badger)

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.5.0 and has been later upgraded to
version 1.6.8
version 7.3.8

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/ena/submit/webin`. The app will automatically reload if you change any of the source files.

## Production server

Run `ng build --prod` and then `ng serve --prod` for a production server. Navigate to `http://localhost:4200/ena/submit/webin`.

## Docker image build

Run `docker build -t dockerhub.ebi.ac.uk/enasequence/webin-portal . `

## Docker image push

Run `docker push dockerhub.ebi.ac.uk/enasequence/webin-portal`

## Kubernetes create deployment and service

1. Run `kubectl create -f Kubernetes-deploy.yaml`
2. Run `kubectl create -f Kubernetes-service.yaml`

## Kubernetes test deployment

1. Check deployment and service configuration : Run `kubectl get all -o wide`
Find and retain the node name of the pod from the above command
2. Find the internal IP of the node name retained in the above commend, Run `kubectl get nodes -o wide`
3. Access the application via node:NodePort (node found in step 1 and 2, NodePort from step 1)

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

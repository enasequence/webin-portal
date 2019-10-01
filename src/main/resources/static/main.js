(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./src/$$_lazy_route_resource lazy recursive":
/*!**********************************************************!*\
  !*** ./src/$$_lazy_route_resource lazy namespace object ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/app/app.component.css":
/*!***********************************!*\
  !*** ./src/app/app.component.css ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2FwcC5jb21wb25lbnQuY3NzIn0= */"

/***/ }),

/***/ "./src/app/app.component.html":
/*!************************************!*\
  !*** ./src/app/app.component.html ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<router-outlet></router-outlet>\r\n"

/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/*
 * Copyright 2018 EMBL - European Bioinformatics Institute
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this
 * file except in compliance with the License. You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software distributed under the
 * License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
 * CONDITIONS OF ANY KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations under the License.
 */


var AppComponent = /** @class */ (function () {
    function AppComponent() {
        this.title = 'Webin';
    }
    AppComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-root',
            template: __webpack_require__(/*! ./app.component.html */ "./src/app/app.component.html"),
            styles: [__webpack_require__(/*! ./app.component.css */ "./src/app/app.component.css")]
        })
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _ui_ui_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ui/ui.module */ "./src/app/ui/ui.module.ts");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony import */ var _login_login_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./login/login.component */ "./src/app/login/login.component.ts");
/* harmony import */ var _logout_logout_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./logout/logout.component */ "./src/app/logout/logout.component.ts");
/* harmony import */ var _header_header_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./header/header.component */ "./src/app/header/header.component.ts");
/* harmony import */ var _footer_footer_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./footer/footer.component */ "./src/app/footer/footer.component.ts");
/* harmony import */ var _dashboard_dashboard_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./dashboard/dashboard.component */ "./src/app/dashboard/dashboard.component.ts");
/* harmony import */ var _submit_submit_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./submit/submit.component */ "./src/app/submit/submit.component.ts");
/* harmony import */ var _submission_result_submission_result_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./submission-result/submission-result.component */ "./src/app/submission-result/submission-result.component.ts");
/* harmony import */ var _submission_result_dialog_submission_result_dialog_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./submission-result-dialog/submission-result-dialog.component */ "./src/app/submission-result-dialog/submission-result-dialog.component.ts");
/* harmony import */ var _report_report_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./report/report.component */ "./src/app/report/report.component.ts");
/* harmony import */ var _report_action_report_action_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./report-action/report-action.component */ "./src/app/report-action/report-action.component.ts");
/* harmony import */ var _report_edit_dialog_report_edit_dialog_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./report-edit-dialog/report-edit-dialog.component */ "./src/app/report-edit-dialog/report-edit-dialog.component.ts");
/* harmony import */ var _gdpr_gdpr_component__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./gdpr/gdpr.component */ "./src/app/gdpr/gdpr.component.ts");
/* harmony import */ var _checklist_checklist_component__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./checklist/checklist.component */ "./src/app/checklist/checklist.component.ts");
/* harmony import */ var _webin_rest_service__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./webin-rest.service */ "./src/app/webin-rest.service.ts");
/* harmony import */ var _webin_report_service__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./webin-report.service */ "./src/app/webin-report.service.ts");
/* harmony import */ var _webin_xml_report_service__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./webin-xml-report.service */ "./src/app/webin-xml-report.service.ts");
/* harmony import */ var _webin_authentication_service__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./webin-authentication.service */ "./src/app/webin-authentication.service.ts");
/* harmony import */ var _webin_gdpr_service__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./webin-gdpr.service */ "./src/app/webin-gdpr.service.ts");
/* harmony import */ var _webin_authentication_guard_service__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./webin-authentication-guard.service */ "./src/app/webin-authentication-guard.service.ts");
/* harmony import */ var _webin_gdpr_guard_service__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ./webin-gdpr-guard.service */ "./src/app/webin-gdpr-guard.service.ts");
/* harmony import */ var _webin_authentication_interceptor__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ./webin-authentication.interceptor */ "./src/app/webin-authentication.interceptor.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");

/*
 * Copyright 2018 EMBL - European Bioinformatics Institute
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this
 * file except in compliance with the License. You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software distributed under the
 * License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
 * CONDITIONS OF ANY KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations under the License.
 */




























var appRoutes = [
    {
        path: 'login',
        component: _login_login_component__WEBPACK_IMPORTED_MODULE_6__["LoginComponent"],
    },
    {
        path: 'logout',
        component: _logout_logout_component__WEBPACK_IMPORTED_MODULE_7__["LogoutComponent"],
    },
    {
        path: 'sample-checklist',
        component: _checklist_checklist_component__WEBPACK_IMPORTED_MODULE_18__["ChecklistComponent"],
        data: { checklistType: 'sample' }
    },
    {
        path: 'sequence-checklist',
        component: _checklist_checklist_component__WEBPACK_IMPORTED_MODULE_18__["ChecklistComponent"],
        data: { checklistType: 'sequence' }
    },
    {
        path: 'consent',
        component: _gdpr_gdpr_component__WEBPACK_IMPORTED_MODULE_17__["GdprComponent"],
        canActivate: [_webin_authentication_guard_service__WEBPACK_IMPORTED_MODULE_24__["WebinAuthenticationGuardService"]],
    },
    {
        path: '**',
        component: _dashboard_dashboard_component__WEBPACK_IMPORTED_MODULE_10__["DashboardComponent"],
        canActivate: [_webin_authentication_guard_service__WEBPACK_IMPORTED_MODULE_24__["WebinAuthenticationGuardService"], _webin_gdpr_guard_service__WEBPACK_IMPORTED_MODULE_25__["WebinGdprGuardService"]],
    }
];
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_2__["BrowserModule"],
                _ui_ui_module__WEBPACK_IMPORTED_MODULE_3__["UiModule"],
                _angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpClientModule"],
                // Router
                _angular_router__WEBPACK_IMPORTED_MODULE_27__["RouterModule"].forRoot(appRoutes, { enableTracing: false } // <-- debugging purposes only
                ),
            ],
            declarations: [
                _app_component__WEBPACK_IMPORTED_MODULE_5__["AppComponent"],
                _submit_submit_component__WEBPACK_IMPORTED_MODULE_11__["SubmitComponent"],
                _submission_result_submission_result_component__WEBPACK_IMPORTED_MODULE_12__["SubmissionResultComponent"],
                _submission_result_dialog_submission_result_dialog_component__WEBPACK_IMPORTED_MODULE_13__["SubmissionResultDialogComponent"],
                _login_login_component__WEBPACK_IMPORTED_MODULE_6__["LoginComponent"],
                _logout_logout_component__WEBPACK_IMPORTED_MODULE_7__["LogoutComponent"],
                _dashboard_dashboard_component__WEBPACK_IMPORTED_MODULE_10__["DashboardComponent"],
                _header_header_component__WEBPACK_IMPORTED_MODULE_8__["HeaderComponent"],
                _footer_footer_component__WEBPACK_IMPORTED_MODULE_9__["FooterComponent"],
                _report_report_component__WEBPACK_IMPORTED_MODULE_14__["ReportComponent"],
                _report_edit_dialog_report_edit_dialog_component__WEBPACK_IMPORTED_MODULE_16__["ReportEditDialogComponent"],
                _report_action_report_action_component__WEBPACK_IMPORTED_MODULE_15__["ReportActionComponent"],
                _gdpr_gdpr_component__WEBPACK_IMPORTED_MODULE_17__["GdprComponent"],
                _checklist_checklist_component__WEBPACK_IMPORTED_MODULE_18__["ChecklistComponent"],
            ],
            bootstrap: [
                _app_component__WEBPACK_IMPORTED_MODULE_5__["AppComponent"],
                _header_header_component__WEBPACK_IMPORTED_MODULE_8__["HeaderComponent"],
                _footer_footer_component__WEBPACK_IMPORTED_MODULE_9__["FooterComponent"],
            ],
            providers: [
                _webin_rest_service__WEBPACK_IMPORTED_MODULE_19__["WebinRestService"],
                _webin_report_service__WEBPACK_IMPORTED_MODULE_20__["WebinReportService"],
                _webin_xml_report_service__WEBPACK_IMPORTED_MODULE_21__["WebinXmlReportService"],
                _webin_authentication_service__WEBPACK_IMPORTED_MODULE_22__["WebinAuthenticationService"],
                _webin_gdpr_service__WEBPACK_IMPORTED_MODULE_23__["WebinGdprService"],
                _webin_authentication_guard_service__WEBPACK_IMPORTED_MODULE_24__["WebinAuthenticationGuardService"],
                _webin_gdpr_guard_service__WEBPACK_IMPORTED_MODULE_25__["WebinGdprGuardService"],
                {
                    provide: _angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HTTP_INTERCEPTORS"],
                    useClass: _webin_authentication_interceptor__WEBPACK_IMPORTED_MODULE_26__["WebinAuthenticationInterceptor"],
                    multi: true,
                }
            ],
            entryComponents: [
                _report_edit_dialog_report_edit_dialog_component__WEBPACK_IMPORTED_MODULE_16__["ReportEditDialogComponent"],
                _submission_result_dialog_submission_result_dialog_component__WEBPACK_IMPORTED_MODULE_13__["SubmissionResultDialogComponent"],
            ]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./src/app/checklist-type.enum.ts":
/*!****************************************!*\
  !*** ./src/app/checklist-type.enum.ts ***!
  \****************************************/
/*! exports provided: ChecklistType */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ChecklistType", function() { return ChecklistType; });
/*
 * Copyright 2018 EMBL - European Bioinformatics Institute
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this
 * file except in compliance with the License. You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software distributed under the
 * License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
 * CONDITIONS OF ANY KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations under the License.
 */
var ChecklistType;
(function (ChecklistType) {
    ChecklistType["sample"] = "sample";
    ChecklistType["sequence"] = "sequence";
})(ChecklistType || (ChecklistType = {}));


/***/ }),

/***/ "./src/app/checklist/checklist.component.css":
/*!***************************************************!*\
  !*** ./src/app/checklist/checklist.component.css ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".checklist-restriction {\r\n  color: black;\r\n  background-color:\t#F5F5F5;\r\n}\r\n\r\n/* Checklist field selection checkbox always green and text always black. */\r\n\r\n.checklist-checked-field {\r\n  color: black;\r\n}\r\n\r\n.mat-checkbox-checked.mat-accent .mat-checkbox-background, .mat-checkbox-indeterminate.mat-accent .mat-checkbox-background {\r\n  background-color: #38983e !important;\r\n}\r\n\r\n.mat-ripple-element {\r\n  background: #38983e !important;\r\n}\r\n\r\n.mat-expansion-panel-header,\r\n.mat-expansion-panel-body {\r\n  padding-top: 0px;\r\n  padding-right: 5px;\r\n  padding-bottom: 5px;\r\n  padding-left: 5px;\r\n}\r\n\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvY2hlY2tsaXN0L2NoZWNrbGlzdC5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsWUFBWTtFQUNaLHlCQUF5QjtBQUMzQjs7QUFFQSwyRUFBMkU7O0FBRTNFO0VBQ0UsWUFBWTtBQUNkOztBQUVBO0VBQ0Usb0NBQW9DO0FBQ3RDOztBQUVBO0VBQ0UsOEJBQThCO0FBQ2hDOztBQUVBOztFQUVFLGdCQUFnQjtFQUNoQixrQkFBa0I7RUFDbEIsbUJBQW1CO0VBQ25CLGlCQUFpQjtBQUNuQiIsImZpbGUiOiJzcmMvYXBwL2NoZWNrbGlzdC9jaGVja2xpc3QuY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbIi5jaGVja2xpc3QtcmVzdHJpY3Rpb24ge1xyXG4gIGNvbG9yOiBibGFjaztcclxuICBiYWNrZ3JvdW5kLWNvbG9yOlx0I0Y1RjVGNTtcclxufVxyXG5cclxuLyogQ2hlY2tsaXN0IGZpZWxkIHNlbGVjdGlvbiBjaGVja2JveCBhbHdheXMgZ3JlZW4gYW5kIHRleHQgYWx3YXlzIGJsYWNrLiAqL1xyXG5cclxuLmNoZWNrbGlzdC1jaGVja2VkLWZpZWxkIHtcclxuICBjb2xvcjogYmxhY2s7XHJcbn1cclxuXHJcbi5tYXQtY2hlY2tib3gtY2hlY2tlZC5tYXQtYWNjZW50IC5tYXQtY2hlY2tib3gtYmFja2dyb3VuZCwgLm1hdC1jaGVja2JveC1pbmRldGVybWluYXRlLm1hdC1hY2NlbnQgLm1hdC1jaGVja2JveC1iYWNrZ3JvdW5kIHtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMzg5ODNlICFpbXBvcnRhbnQ7XHJcbn1cclxuXHJcbi5tYXQtcmlwcGxlLWVsZW1lbnQge1xyXG4gIGJhY2tncm91bmQ6ICMzODk4M2UgIWltcG9ydGFudDtcclxufVxyXG5cclxuLm1hdC1leHBhbnNpb24tcGFuZWwtaGVhZGVyLFxyXG4ubWF0LWV4cGFuc2lvbi1wYW5lbC1ib2R5IHtcclxuICBwYWRkaW5nLXRvcDogMHB4O1xyXG4gIHBhZGRpbmctcmlnaHQ6IDVweDtcclxuICBwYWRkaW5nLWJvdHRvbTogNXB4O1xyXG4gIHBhZGRpbmctbGVmdDogNXB4O1xyXG59XHJcbiJdfQ== */"

/***/ }),

/***/ "./src/app/checklist/checklist.component.html":
/*!****************************************************!*\
  !*** ./src/app/checklist/checklist.component.html ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<mat-expansion-panel [expanded]=\"init\">\r\n  <mat-expansion-panel-header>\r\n    <mat-panel-title>\r\n      <b>Download spreadsheet template for annotated sequences</b>\r\n    </mat-panel-title>\r\n  </mat-expansion-panel-header>\r\n\r\n  <div *ngIf=\"!checklistGroupDataSource && !init\">\r\n\r\n    <p *ngIf=\"checklistType === ChecklistType.sample\">\r\n      Use this submission option to create and download a spreadsheet template for samples.\r\n    </p>\r\n\r\n    <p *ngIf=\"checklistType === ChecklistType.sequence\">\r\n      Use this submission option to create and download a spreadsheet template for sequences.\r\n    </p>\r\n\r\n    <button mat-raised-button color=\"accent\" (click)=\"initChecklists()\">Start</button>\r\n  </div>\r\n\r\n  <div *ngIf=\"checklistGroupDataSource\">\r\n\r\n    <p *ngIf=\"checklistType === ChecklistType.sample\">\r\n      Please select the most appropriate checklist group, checklist and checklist fields.\r\n      Download an empty spreadsheet template, fill in the spreadsheet and submit the spreadsheet\r\n      using Webin.\r\n    </p>\r\n\r\n    <p *ngIf=\"checklistType === ChecklistType.sequence\">\r\n      Please select the most appropriate checklist group, checklist and checklist fields.\r\n      Download an empty spreadsheet template, Fill in the spreadsheet\r\n      and submit the spreadsheet using\r\n      <a href=\"https://ena-docs.readthedocs.io/en/latest/sequence/webin-cli-spreadsheet.html\" target=\"_blank\">Webin command line interface</a>.\r\n    </p>\r\n\r\n  </div>\r\n\r\n  <div *ngIf=\"active\" style=\"height:70px;\">\r\n    <mat-spinner [diameter]=\"50\" [strokeWidth]=\"5\" style=\"margin:0 auto;\">\r\n    </mat-spinner>\r\n  </div>\r\n\r\n  <div *ngIf=\"dataError\">\r\n    <div class=\"app-error\">\r\n      <i class=\"material-icons\">error</i>\r\n      {{dataError}}\r\n    </div>\r\n  </div>\r\n\r\n  <mat-vertical-stepper #stepper *ngIf=\"checklistGroupDataSource\">\r\n    <mat-step label=\"Select checklist group\">\r\n      <p>Please select a checklist group first.</p>\r\n\r\n      <div class=\"mat-elevation-z8\">\r\n        <mat-table [dataSource]=\"checklistGroupDataSource\">\r\n          <ng-container matColumnDef=\"name\">\r\n            <mat-header-cell *matHeaderCellDef>Name</mat-header-cell>\r\n            <mat-cell *matCellDef=\"let checklistGroup\">\r\n              <p style=\"font-weight:bold;\"> {{ checklistGroup.name }} </p>\r\n              <p style=\"margin-left:10px;\"> {{ checklistGroup.description }} </p>\r\n            </mat-cell>\r\n          </ng-container>\r\n\r\n          <mat-row *matRowDef=\"let row; columns: checklistGroupDisplayedColumns;\"\r\n            (click)=\"setChecklistGroup(row, stepper)\"></mat-row>\r\n        </mat-table>\r\n      </div>\r\n\r\n      <div>\r\n        <button mat-button matStepperPrevious>Back</button>\r\n        <button mat-button matStepperNext [disabled]=\"!this.selectedChecklistGroup\">Next</button>\r\n      </div>\r\n\r\n    </mat-step>\r\n    <mat-step label=\"Select checklist\">\r\n      <div *ngIf=\"!selectedChecklistGroup\">\r\n        <p>Please select a checklist group first.</p>\r\n      </div>\r\n\r\n      <div *ngIf=\"selectedChecklistGroup\">\r\n        <p>You have selected <b>{{selectedChecklistGroup.name}}</b>. Please select the most appropriate checklist from\r\n          the list below.</p>\r\n        <div class=\"mat-elevation-z8\">\r\n          <table cdk-table [dataSource]=\"checklistDataSource\">\r\n\r\n            <ng-container cdkColumnDef=\"name\">\r\n              <th cdk-header-cell *cdkHeaderCellDef>Name</th>\r\n              <td cdk-cell *cdkCellDef=\"let checklist\">\r\n                <p style=\"font-weight:bold\">{{ checklist.name }}</p>\r\n                <p>{{ checklist.description }}</p>\r\n              </td>\r\n            </ng-container>\r\n\r\n            <tr cdk-row *cdkRowDef=\"let row; columns: checklistDisplayedColumns;\" (click)=\"setChecklist(row, stepper)\">\r\n            </tr>\r\n          </table>\r\n        </div>\r\n      </div>\r\n\r\n      <div>\r\n        <button mat-button matStepperPrevious>Back</button>\r\n        <button mat-button matStepperNext [disabled]=\"!this.selectedChecklist\">Next</button>\r\n      </div>\r\n\r\n    </mat-step>\r\n    <mat-step label=\"Select checklist fields\">\r\n      <div *ngIf=\"!selectedChecklist\">\r\n        <p>Please select a checklist first.</p>\r\n      </div>\r\n\r\n      <div *ngIf=\"selectedChecklist\">\r\n        <p>You have selected <b>{{selectedChecklist.name}}</b>. Please select the checklist fields below.</p>\r\n\r\n        <div class=\"mat-elevation-z8\">\r\n          <mat-accordion>\r\n            <mat-expansion-panel *ngFor=\"let fieldGroup of selectedChecklist.fieldGroups\">\r\n              <mat-expansion-panel-header>\r\n                <mat-panel-title>\r\n                  {{fieldGroup.name}}<span fxHide fxShow.gt-sm> {{getSelectedFieldsDisplayText(fieldGroup)}}</span>\r\n                </mat-panel-title>\r\n              </mat-expansion-panel-header>\r\n\r\n              <div *ngFor=\"let field of fieldGroup.fields\">\r\n                <mat-checkbox class=\"checklist-checked-field\" [(ngModel)]=\"selectedFields[field.label]\"\r\n                  [disabled]=\"mandatoryFields[field.label]\"><b class=\"checklist-checked-field\">{{field.label}}</b>\r\n                </mat-checkbox>\r\n                <p fxHide fxShow.gt-sm><i>{{field.mandatory}} {{getFieldTypeDisplayText(field)}}</i></p>\r\n                <!--\r\n            <p *ngIf=\"checklistType === ChecklistType.sequence\">\r\n              {{field.name}}\r\n            </p>\r\n            -->\r\n                <p>\r\n                  {{field.description}}\r\n                </p>\r\n                <div fxLayout=\"row\">\r\n                  <div fxFlex=\"200px\">\r\n                    <p *ngIf=\"field.units.length > 0\">\r\n                      <mat-select class=\"checklist-restriction\" placeholder=\"Permitted units\">\r\n                        <mat-option *ngFor=\"let unit of field.units\" [value]=\"unit\" disabled>\r\n                          {{ unit }}\r\n                        </mat-option>\r\n                      </mat-select>\r\n                    </p>\r\n                    <p *ngIf=\"field.regexValue\" class=\"checklist-restriction\">\r\n                      <mat-select class=\"checklist-restriction\" placeholder=\"Regular expression\">\r\n                        <mat-option disabled>\r\n                          {{ field.regexValue }}\r\n                        </mat-option>\r\n                      </mat-select>\r\n                    </p>\r\n                    <p *ngIf=\"field.textChoice && field.textChoice.length > 0\">\r\n                      <mat-select class=\"checklist-restriction\" placeholder=\"Permitted values\">\r\n                        <mat-option *ngFor=\"let textChoice of field.textChoice\" [value]=\"textChoice\" disabled>\r\n                          {{ textChoice }}\r\n                        </mat-option>\r\n                      </mat-select>\r\n                    </p>\r\n                    <p *ngIf=\"field.ontologyId\" class=\"checklist-restriction\">\r\n                      Permitted ontology: {{ field.ontologyId }}\r\n                    </p>\r\n                  </div>\r\n                  <div fxFlex>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n            </mat-expansion-panel>\r\n          </mat-accordion>\r\n        </div>\r\n      </div>\r\n      <div>\r\n        <button mat-button matStepperPrevious>Back</button>\r\n        <button mat-button matStepperNext>Next</button>\r\n      </div>\r\n    </mat-step>\r\n    <mat-step label=\"Download spreadsheet template\">\r\n      <div *ngIf=\"!selectedChecklist\">\r\n        <p>Please select a checklist first.</p>\r\n      </div>\r\n\r\n      <div *ngIf=\"selectedChecklist\">\r\n\r\n        <p>\r\n          Please download the spreadsheet template containing the fields you have selected by using the 'Download'\r\n          button below.\r\n        </p>\r\n\r\n        <div *ngIf=\"checklistType === ChecklistType.sequence\">\r\n          <p>\r\n            Please do not modify the first two lines of the spreadsheet. The first line contains the checklist name and\r\n            the second line contains the field names in separate columns. The first column in the spreadsheet,\r\n            the ENTRYNUMBER, starts with 1 and is incremented by 1 for each sequence. For example, if the spreadsheet\r\n            has 10 sequences the first ENTRYNUMBER should be 1 and the last should be 10. The other columns in the\r\n            spreadsheet correspond to the checklist fields you have selected. You can find more information about\r\n            permitted values for each column from the 'Select checklist fields' page.\r\n          </p>\r\n\r\n        </div>\r\n\r\n        <button mat-raised-button color=\"accent\" (click)=\"download()\">Download</button>\r\n\r\n      </div>\r\n\r\n      <div>\r\n        <button mat-button matStepperPrevious>Back</button>\r\n        <!-- <button mat-button matStepperNext (click)=\"\">Done</button> -->\r\n      </div>\r\n\r\n    </mat-step>\r\n  </mat-vertical-stepper>\r\n</mat-expansion-panel>\r\n"

/***/ }),

/***/ "./src/app/checklist/checklist.component.ts":
/*!**************************************************!*\
  !*** ./src/app/checklist/checklist.component.ts ***!
  \**************************************************/
/*! exports provided: ChecklistComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ChecklistComponent", function() { return ChecklistComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var file_saver__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! file-saver */ "./node_modules/file-saver/dist/FileSaver.min.js");
/* harmony import */ var file_saver__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(file_saver__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _checklist_type_enum__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../checklist-type.enum */ "./src/app/checklist-type.enum.ts");
/* harmony import */ var _webin_authentication_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../webin-authentication.service */ "./src/app/webin-authentication.service.ts");
/* harmony import */ var _webin_report_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../webin-report.service */ "./src/app/webin-report.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/*
 * Copyright 2018 EMBL - European Bioinformatics Institute
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this
 * file except in compliance with the License. You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software distributed under the
 * License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
 * CONDITIONS OF ANY KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations under the License.
 */









var ChecklistComponent = /** @class */ (function () {
    function ChecklistComponent(_webinAuthenticationService, _webinReportService, _route) {
        this._webinAuthenticationService = _webinAuthenticationService;
        this._webinReportService = _webinReportService;
        this._route = _route;
        this.init = true;
        this.ChecklistType = _checklist_type_enum__WEBPACK_IMPORTED_MODULE_5__["ChecklistType"]; // Allows use in template
        this.checklistGroupDisplayedColumns = ['name'];
        this.checklistDisplayedColumns = ['name'];
        if (_route) {
            switch (_route.snapshot.data.checklistType) {
                case 'sample': {
                    this.checklistType = _checklist_type_enum__WEBPACK_IMPORTED_MODULE_5__["ChecklistType"].sample;
                    break;
                }
                case 'sequence': {
                    this.checklistType = _checklist_type_enum__WEBPACK_IMPORTED_MODULE_5__["ChecklistType"].sequence;
                    break;
                }
            }
        }
    }
    ChecklistComponent.prototype.ngOnInit = function () {
        if (this.init) {
            this.initChecklists();
        }
    };
    // field group restriction type (not supported for spreadsheets)
    // -----------------------------
    // Any number or none of the fields
    // One of the fields
    // At least one of the fields
    // One or none of the fields
    //
    // field type
    // -----------------------------
    // TEXT_FIELD
    // TEXT_AREA_FIELD
    // TEXT_CHOICE_FIELD
    // DATE_FIELD
    // TAXON_FIELD
    // ONTOLOGY_FIELD
    //
    // field mandatory
    // -----------------------------
    // mandatory
    // recommended
    // optional
    //
    // field multiplicity (not supported for spreadsheets)
    // -----------------------------
    // single
    // multiple
    ChecklistComponent.prototype.getFieldTypeDisplayText = function (field) {
        switch (field.type) {
            case 'TEXT_FIELD':
            case 'TEXT_AREA_FIELD':
            case 'TEXT_CHOICE_FIELD': {
                return 'text field';
            }
            case 'DATE_FIELD': {
                return 'date field';
            }
            case 'TAXON_FIELD': {
                return 'taxon field';
            }
            case 'ONTOLOGY_FIELD': {
                return 'ontology field';
            }
            default: {
                return 'field';
            }
        }
    };
    ChecklistComponent.prototype.getSelectedFieldsDisplayText = function (fieldGroup) {
        var _this = this;
        var cnt = 0;
        fieldGroup.fields.forEach(function (field) {
            if (_this.selectedFields[field.label]) {
                cnt++;
            }
        });
        return '(' + cnt + ' of ' + fieldGroup.fields.length + ' fields selected)';
    };
    ChecklistComponent.prototype.setChecklistGroup = function (checklistGroup, stepper) {
        this.selectedChecklistGroup = checklistGroup;
        this.checklistDataSource = new _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatTableDataSource"](this.selectedChecklistGroup.checklists);
        stepper.next();
    };
    ChecklistComponent.prototype.setChecklist = function (checklist, stepper) {
        var _this = this;
        this.selectedChecklist = checklist;
        this.selectedFields = {};
        this.mandatoryFields = {};
        this.selectedChecklist.fieldGroups.forEach(function (fieldGroup) {
            fieldGroup.fields.forEach(function (field) {
                _this.selectedFields[field.label] = (field.mandatory === 'mandatory');
                _this.mandatoryFields[field.label] = (field.mandatory === 'mandatory');
            });
        });
        stepper.next();
    };
    ChecklistComponent.prototype.getXmlTextValue = function (xmlDoc, xpath) {
        return this._xmlDoc.evaluate(xpath, xmlDoc, null, XPathResult.STRING_TYPE, null).stringValue;
    };
    ChecklistComponent.prototype.getXmlNodes = function (xmlDoc, xpath) {
        return this._xmlDoc.evaluate(xpath, xmlDoc, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);
    };
    ChecklistComponent.prototype.getChecklistTypeParamValue = function () {
        switch (this.checklistType) {
            case _checklist_type_enum__WEBPACK_IMPORTED_MODULE_5__["ChecklistType"].sample:
                return 'sample';
            case _checklist_type_enum__WEBPACK_IMPORTED_MODULE_5__["ChecklistType"].sequence:
                return 'sequence';
        }
    };
    ChecklistComponent.prototype.initChecklists = function () {
        // console.log(' ** initChecklists **');
        var _this = this;
        this.active = true;
        this.dataError = undefined;
        this._checklistGroups = new Array();
        var checklistGroups = this._webinReportService.getChecklistGroups(this.getChecklistTypeParamValue());
        if (!checklistGroups) {
            return;
        }
        checklistGroups.
            pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["retry"])(3), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["mergeMap"])(function (data) {
            _this.setChecklistGroups(data);
            return _this._webinReportService.getChecklistXmls(_this.getChecklistTypeParamValue());
        })).
            subscribe(function (data) {
            _this.setChecklistXmls(data);
        }, function (err) {
            console.log('** Webin checklist service failed **', err);
            _this.dataError = 'Webin checklist service failed. Please try again later. If the problem persists please contact the helpdesk.';
        }, function () {
            _this.active = false;
        });
    };
    ChecklistComponent.prototype.setChecklistGroups = function (data) {
        // console.log('** checklistGroupData **', data);
        var _this = this;
        data.forEach(function (checklistGroupData) {
            var report = checklistGroupData.report;
            _this._checklistGroups.push({
                name: report.name,
                description: report.description,
                checklistIds: report.checklist,
                checklists: new Array()
            });
        });
    };
    ChecklistComponent.prototype.setChecklistXmls = function (data) {
        // console.log('** setChecklistXmls **', data);
        this._xmlDoc = (new DOMParser()).parseFromString(data.body, 'text/xml');
        var checklistNodes = this.getXmlNodes(this._xmlDoc, '/CHECKLIST_SET/CHECKLIST');
        var checklistNode = checklistNodes.iterateNext();
        var _loop_1 = function () {
            var checklist = {
                id: this_1.getXmlTextValue(checklistNode, '@accession'),
                name: this_1.getXmlTextValue(checklistNode, 'DESCRIPTOR/NAME/text()'),
                description: this_1.getXmlTextValue(checklistNode, 'DESCRIPTOR/DESCRIPTION/text()'),
                type: this_1.getXmlTextValue(checklistNode, '@checklistType'),
                fieldGroups: new Array()
            };
            var fieldGroupNodes = this_1.getXmlNodes(checklistNode, 'DESCRIPTOR/FIELD_GROUP');
            var fieldGroupNode = fieldGroupNodes.iterateNext();
            while (fieldGroupNode) {
                var fieldGroup = {
                    name: this_1.getXmlTextValue(fieldGroupNode, 'NAME/text()'),
                    fields: new Array()
                };
                var fieldNodes = this_1.getXmlNodes(fieldGroupNode, 'FIELD');
                var fieldNode = fieldNodes.iterateNext();
                while (fieldNode) {
                    var field = {
                        name: this_1.getXmlTextValue(fieldNode, 'NAME/text()'),
                        label: this_1.getXmlTextValue(fieldNode, 'LABEL/text()'),
                        description: this_1.getXmlTextValue(fieldNode, 'DESCRIPTION/text()'),
                        mandatory: this_1.getXmlTextValue(fieldNode, 'MANDATORY/text()'),
                        type: this_1.getXmlTextValue(fieldNode, 'name(FIELD_TYPE/*[1])'),
                        units: new Array(),
                        textChoice: new Array(),
                    };
                    // Regex
                    //
                    var regexNodes = this_1.getXmlNodes(fieldNode, 'FIELD_TYPE/*/REGEX_VALUE[1]');
                    if (regexNodes) {
                        var regexNode = regexNodes.iterateNext();
                        while (regexNode) {
                            field.regexValue = this_1.getXmlTextValue(regexNode, 'text()');
                            regexNode = regexNodes.iterateNext();
                        }
                    }
                    // CV
                    //
                    var cvNodes = this_1.getXmlNodes(fieldNode, 'FIELD_TYPE/TEXT_CHOICE_FIELD/TEXT_VALUE/VALUE');
                    if (cvNodes) {
                        var cvNode = cvNodes.iterateNext();
                        while (cvNode) {
                            field.textChoice.push(this_1.getXmlTextValue(cvNode, 'text()'));
                            cvNode = cvNodes.iterateNext();
                        }
                    }
                    // Ontology
                    //
                    var ontologyNodes = this_1.getXmlNodes(fieldNode, 'FIELD_TYPE/ONTOLOGY_FIELD/ONTOLOGY_ID');
                    if (ontologyNodes) {
                        var ontologyNode = ontologyNodes.iterateNext();
                        while (ontologyNode) {
                            field.ontologyId = this_1.getXmlTextValue(ontologyNode, 'text()');
                            ontologyNode = ontologyNodes.iterateNext();
                        }
                    }
                    // Units
                    //
                    var unitNodes = this_1.getXmlNodes(fieldNode, 'UNITS/UNIT');
                    if (unitNodes) {
                        var unitNode = unitNodes.iterateNext();
                        while (unitNode) {
                            field.units.push(this_1.getXmlTextValue(unitNode, 'text()'));
                            unitNode = unitNodes.iterateNext();
                        }
                    }
                    fieldGroup.fields.push(field);
                    fieldNode = fieldNodes.iterateNext();
                }
                checklist.fieldGroups.push(fieldGroup);
                fieldGroupNode = fieldGroupNodes.iterateNext();
            }
            this_1._checklistGroups.forEach(function (checklistGroup) {
                checklistGroup.checklistIds.forEach(function (id) {
                    if (checklist.id === id) {
                        checklistGroup.checklists.push(checklist);
                    }
                });
            });
            checklistNode = checklistNodes.iterateNext();
        };
        var this_1 = this;
        while (checklistNode) {
            _loop_1();
        }
        // console.log('** Checklists **', this._checklistGroups );
        this.checklistGroupDataSource = new _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatTableDataSource"](this._checklistGroups);
    };
    ChecklistComponent.prototype.isEga = function () {
        return this._webinAuthenticationService.ega;
    };
    ChecklistComponent.prototype.getSequenceSpreadsheetText = function () {
        var _this = this;
        var spreadsheetText = '#template_accession ' + this.selectedChecklist.id + '\n';
        spreadsheetText += 'ENTRYNUMBER\t';
        var fieldGroups = this.selectedChecklist.fieldGroups;
        var selectedFieldsCnt = 0;
        fieldGroups.forEach(function (fieldGroup) {
            fieldGroup.fields.forEach(function (field) {
                if (_this.selectedFields[field.label]) {
                    selectedFieldsCnt++;
                }
            });
        });
        var i = 0;
        fieldGroups.forEach(function (fieldGroup) {
            fieldGroup.fields.forEach(function (field) {
                if (_this.selectedFields[field.label]) {
                    spreadsheetText += field.label;
                    if (++i < selectedFieldsCnt) {
                        spreadsheetText += '\t';
                    }
                }
            });
        });
        spreadsheetText += '\n';
        return spreadsheetText;
    };
    ChecklistComponent.prototype.download = function () {
        var dateText = (new Date()).toISOString();
        var blob = new Blob([this.getSequenceSpreadsheetText()], { type: 'text/plain;charset=utf-8' });
        Object(file_saver__WEBPACK_IMPORTED_MODULE_3__["saveAs"])(blob, 'Sequence-' + this.selectedChecklist.id + '-' + dateText + '.tsv');
    };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", String)
    ], ChecklistComponent.prototype, "checklistType", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
    ], ChecklistComponent.prototype, "init", void 0);
    ChecklistComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-checklist',
            template: __webpack_require__(/*! ./checklist.component.html */ "./src/app/checklist/checklist.component.html"),
            encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewEncapsulation"].None,
            styles: [__webpack_require__(/*! ./checklist.component.css */ "./src/app/checklist/checklist.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_webin_authentication_service__WEBPACK_IMPORTED_MODULE_6__["WebinAuthenticationService"],
            _webin_report_service__WEBPACK_IMPORTED_MODULE_7__["WebinReportService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_8__["ActivatedRoute"]])
    ], ChecklistComponent);
    return ChecklistComponent;
}());



/***/ }),

/***/ "./src/app/dashboard/dashboard.component.css":
/*!***************************************************!*\
  !*** ./src/app/dashboard/dashboard.component.css ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2Rhc2hib2FyZC9kYXNoYm9hcmQuY29tcG9uZW50LmNzcyJ9 */"

/***/ }),

/***/ "./src/app/dashboard/dashboard.component.html":
/*!****************************************************!*\
  !*** ./src/app/dashboard/dashboard.component.html ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div>\r\n  <mat-tab-group #tabGroup class=\"app-dashboard\">\r\n\r\n    <mat-tab label=\"Submit\">\r\n      <app-submit></app-submit>\r\n    </mat-tab>\r\n    <mat-tab label=\"Studies\">\r\n      <app-report #studies [reportType]=\"ReportType.studies\" (reportChange)=\"consumeReportChange($event)\"></app-report>\r\n    </mat-tab>\r\n    <mat-tab label=\"Samples\">\r\n      <app-report #samples [reportType]=\"ReportType.samples\" (reportChange)=\"consumeReportChange($event)\"></app-report>\r\n    </mat-tab>\r\n    <mat-tab label=\"Runs\">\r\n      <app-report #runs [reportType]=\"ReportType.runs\" (reportChange)=\"consumeReportChange($event)\"></app-report>\r\n    </mat-tab>\r\n    <mat-tab label=\"Analyses\">\r\n      <app-report #analyses [reportType]=\"ReportType.analyses\" (reportChange)=\"consumeReportChange($event)\"></app-report>\r\n    </mat-tab>\r\n\r\n    <ng-container *ngIf=\"!isEga()\">\r\n\r\n      <mat-tab label=\"Run files\">\r\n        <app-report #runFiles [reportType]=\"ReportType.runFiles\" (reportChange)=\"consumeReportChange($event)\"></app-report>\r\n      </mat-tab>\r\n      <mat-tab label=\"Analysis files\">\r\n        <app-report #analysisFiles [reportType]=\"ReportType.analysisFiles\" (reportChange)=\"consumeReportChange($event)\"></app-report>\r\n      </mat-tab>\r\n      <mat-tab label=\"Run process\">\r\n        <app-report #runProcess [reportType]=\"ReportType.runProcess\" (reportChange)=\"consumeReportChange($event)\"></app-report>\r\n      </mat-tab>\r\n      <mat-tab label=\"Analysis process\">\r\n        <app-report #analysisProcess [reportType]=\"ReportType.analysisProcess\" (reportChange)=\"consumeReportChange($event)\"></app-report>\r\n      </mat-tab>\r\n      <mat-tab label=\"Unsubmitted files\">\r\n        <app-report #unsubmittedFiles [reportType]=\"ReportType.unsubmittedFiles\" (reportChange)=\"consumeReportChange($event)\"></app-report>\r\n      </mat-tab>\r\n\r\n    </ng-container>\r\n\r\n    <ng-container *ngIf=\"isEga()\">\r\n\r\n      <mat-tab label=\"Dacs\">\r\n        <app-report #dacs [reportType]=\"ReportType.dacs\" (reportChange)=\"consumeReportChange($event)\"></app-report>\r\n      </mat-tab>\r\n      <mat-tab label=\"Policies\">\r\n        <app-report #policies [reportType]=\"ReportType.policies\" (reportChange)=\"consumeReportChange($event)\"></app-report>\r\n      </mat-tab>\r\n      <mat-tab label=\"Datasets\">\r\n        <app-report #datasets [reportType]=\"ReportType.datasets\" (reportChange)=\"consumeReportChange($event)\"></app-report>\r\n      </mat-tab>\r\n\r\n    </ng-container>\r\n\r\n  </mat-tab-group>\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/dashboard/dashboard.component.ts":
/*!**************************************************!*\
  !*** ./src/app/dashboard/dashboard.component.ts ***!
  \**************************************************/
/*! exports provided: DashboardComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DashboardComponent", function() { return DashboardComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_material_tabs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material/tabs */ "./node_modules/@angular/material/esm5/tabs.es5.js");
/* harmony import */ var _report_report_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../report/report.component */ "./src/app/report/report.component.ts");
/* harmony import */ var _webin_authentication_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../webin-authentication.service */ "./src/app/webin-authentication.service.ts");
/* harmony import */ var _report_type_enum__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../report-type.enum */ "./src/app/report-type.enum.ts");
/*
 * Copyright 2018 EMBL - European Bioinformatics Institute
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this
 * file except in compliance with the License. You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software distributed under the
 * License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
 * CONDITIONS OF ANY KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations under the License.
 */






var DashboardComponent = /** @class */ (function () {
    function DashboardComponent(_webinAuthenticationService) {
        this._webinAuthenticationService = _webinAuthenticationService;
        this.ReportType = _report_type_enum__WEBPACK_IMPORTED_MODULE_5__["ReportType"]; // Allows use in template
    }
    DashboardComponent.prototype.ngOnInit = function () {
    };
    DashboardComponent.prototype.ngOnDestroy = function () {
    };
    DashboardComponent.prototype.isEga = function () {
        return this._webinAuthenticationService.ega;
    };
    DashboardComponent.prototype.consumeReportChange = function (reportAction) {
        var newTabIndex = this.getTabIndex(reportAction.reportType);
        console.log('** change dashboard report **', reportAction);
        if (newTabIndex) {
            this.tabGroup.selectedIndex = newTabIndex;
            this[reportAction.reportType].id = reportAction.id;
            this[reportAction.reportType].report();
        }
    };
    DashboardComponent.prototype.getTabIndex = function (reportType) {
        if (this.isEga()) {
            switch (reportType) {
                case _report_type_enum__WEBPACK_IMPORTED_MODULE_5__["ReportType"].studies: return 1;
                case _report_type_enum__WEBPACK_IMPORTED_MODULE_5__["ReportType"].samples: return 2;
                case _report_type_enum__WEBPACK_IMPORTED_MODULE_5__["ReportType"].runs: return 3;
                case _report_type_enum__WEBPACK_IMPORTED_MODULE_5__["ReportType"].analyses: return 4;
                case _report_type_enum__WEBPACK_IMPORTED_MODULE_5__["ReportType"].dacs: return 5;
                case _report_type_enum__WEBPACK_IMPORTED_MODULE_5__["ReportType"].policies: return 6;
                case _report_type_enum__WEBPACK_IMPORTED_MODULE_5__["ReportType"].datasets: return 7;
            }
        }
        else {
            switch (reportType) {
                case _report_type_enum__WEBPACK_IMPORTED_MODULE_5__["ReportType"].studies: return 1;
                case _report_type_enum__WEBPACK_IMPORTED_MODULE_5__["ReportType"].samples: return 2;
                case _report_type_enum__WEBPACK_IMPORTED_MODULE_5__["ReportType"].runs: return 3;
                case _report_type_enum__WEBPACK_IMPORTED_MODULE_5__["ReportType"].analyses: return 4;
                case _report_type_enum__WEBPACK_IMPORTED_MODULE_5__["ReportType"].runFiles: return 5;
                case _report_type_enum__WEBPACK_IMPORTED_MODULE_5__["ReportType"].analysisFiles: return 6;
                case _report_type_enum__WEBPACK_IMPORTED_MODULE_5__["ReportType"].runProcess: return 7;
                case _report_type_enum__WEBPACK_IMPORTED_MODULE_5__["ReportType"].analysisProcess: return 8;
                case _report_type_enum__WEBPACK_IMPORTED_MODULE_5__["ReportType"].unsubmittedFiles: return 9;
            }
        }
        return undefined;
    };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])('tabGroup'),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_material_tabs__WEBPACK_IMPORTED_MODULE_2__["MatTabGroup"])
    ], DashboardComponent.prototype, "tabGroup", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])('studies'),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _report_report_component__WEBPACK_IMPORTED_MODULE_3__["ReportComponent"])
    ], DashboardComponent.prototype, "studies", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])('samples'),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _report_report_component__WEBPACK_IMPORTED_MODULE_3__["ReportComponent"])
    ], DashboardComponent.prototype, "samples", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])('runs'),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _report_report_component__WEBPACK_IMPORTED_MODULE_3__["ReportComponent"])
    ], DashboardComponent.prototype, "runs", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])('analyses'),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _report_report_component__WEBPACK_IMPORTED_MODULE_3__["ReportComponent"])
    ], DashboardComponent.prototype, "analyses", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])('runFiles'),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _report_report_component__WEBPACK_IMPORTED_MODULE_3__["ReportComponent"])
    ], DashboardComponent.prototype, "runFiles", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])('analysisFiles'),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _report_report_component__WEBPACK_IMPORTED_MODULE_3__["ReportComponent"])
    ], DashboardComponent.prototype, "analysisFiles", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])('runProcess'),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _report_report_component__WEBPACK_IMPORTED_MODULE_3__["ReportComponent"])
    ], DashboardComponent.prototype, "runProcess", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])('analysisProcess'),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _report_report_component__WEBPACK_IMPORTED_MODULE_3__["ReportComponent"])
    ], DashboardComponent.prototype, "analysisProcess", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])('unsubmittedFiles'),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _report_report_component__WEBPACK_IMPORTED_MODULE_3__["ReportComponent"])
    ], DashboardComponent.prototype, "unsubmittedFiles", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])('dacs'),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _report_report_component__WEBPACK_IMPORTED_MODULE_3__["ReportComponent"])
    ], DashboardComponent.prototype, "dacs", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])('policies'),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _report_report_component__WEBPACK_IMPORTED_MODULE_3__["ReportComponent"])
    ], DashboardComponent.prototype, "policies", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])('datasets'),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _report_report_component__WEBPACK_IMPORTED_MODULE_3__["ReportComponent"])
    ], DashboardComponent.prototype, "datasets", void 0);
    DashboardComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-main',
            template: __webpack_require__(/*! ./dashboard.component.html */ "./src/app/dashboard/dashboard.component.html"),
            encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewEncapsulation"].None,
            providers: [
                _report_report_component__WEBPACK_IMPORTED_MODULE_3__["ReportComponent"]
            ],
            styles: [__webpack_require__(/*! ./dashboard.component.css */ "./src/app/dashboard/dashboard.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_webin_authentication_service__WEBPACK_IMPORTED_MODULE_4__["WebinAuthenticationService"]])
    ], DashboardComponent);
    return DashboardComponent;
}());



/***/ }),

/***/ "./src/app/footer/footer.component.css":
/*!*********************************************!*\
  !*** ./src/app/footer/footer.component.css ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2Zvb3Rlci9mb290ZXIuY29tcG9uZW50LmNzcyJ9 */"

/***/ }),

/***/ "./src/app/footer/footer.component.html":
/*!**********************************************!*\
  !*** ./src/app/footer/footer.component.html ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div> <!-- fxHide fxShow.gt-xs> <!-- ** Application specific content: fxHide fxShow.gt-xs ** -->\r\n  <footer>\r\n    <div id=\"elixir-banner\" data-color=\"grey\" data-name=\"This service\" data-description=\"\" data-more-information-link=\"https://www.elixir-europe.org/about-us/who-we-are/nodes/embl-ebi\" data-use-basic-styles=\"true\"></div>\r\n    <div id=\"global-footer\" class=\"global-footer\">\r\n      <nav id=\"global-nav-expanded\" class=\"global-nav-expanded row\">\r\n        <!-- Footer will be automatically inserted by footer.js -->\r\n      </nav>\r\n      <section id=\"ebi-footer-meta\" class=\"ebi-footer-meta row\">\r\n        <!-- Footer meta will be automatically inserted by footer.js -->\r\n      </section>\r\n    </div>\r\n  </footer>\r\n\r\n  <!-- GDPR banner configuration -->\r\n  <div id=\"data-protection-message-configuration\"\r\n    data-message=\"This website requires cookies, and the limited processing of your personal data in order to function. By using the site you are agreeing to this as outlined in our &lt;a target='_blank' href='https://www.ebi.ac.uk/data-protection/privacy-notice/ena-submission' class='white-color'&gt;Privacy Notice&lt;/a&gt; and &lt;a target='_blank' href='https://www.ebi.ac.uk/about/terms-of-use' class='white-color'&gt;Terms of Use&lt;/a&gt;.\"\r\n    data-service-id=\"ena-submission\" data-data-protection-version=\"0.1\"></div>\r\n\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/footer/footer.component.ts":
/*!********************************************!*\
  !*** ./src/app/footer/footer.component.ts ***!
  \********************************************/
/*! exports provided: FooterComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FooterComponent", function() { return FooterComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/*
 * Copyright 2018 EMBL - European Bioinformatics Institute
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this
 * file except in compliance with the License. You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software distributed under the
 * License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
 * CONDITIONS OF ANY KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations under the License.
 */


var FooterComponent = /** @class */ (function () {
    function FooterComponent() {
    }
    FooterComponent.prototype.ngOnInit = function () {
    };
    FooterComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-footer',
            template: __webpack_require__(/*! ./footer.component.html */ "./src/app/footer/footer.component.html"),
            styles: [__webpack_require__(/*! ./footer.component.css */ "./src/app/footer/footer.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], FooterComponent);
    return FooterComponent;
}());



/***/ }),

/***/ "./src/app/gdpr/gdpr.component.css":
/*!*****************************************!*\
  !*** ./src/app/gdpr/gdpr.component.css ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".gdpr-card {\r\n  width: 400px;\r\n}\r\n\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvZ2Rwci9nZHByLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxZQUFZO0FBQ2QiLCJmaWxlIjoic3JjL2FwcC9nZHByL2dkcHIuY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbIi5nZHByLWNhcmQge1xyXG4gIHdpZHRoOiA0MDBweDtcclxufVxyXG4iXX0= */"

/***/ }),

/***/ "./src/app/gdpr/gdpr.component.html":
/*!******************************************!*\
  !*** ./src/app/gdpr/gdpr.component.html ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<mat-grid-list cols=\"3\">\r\n  <mat-grid-tile></mat-grid-tile>\r\n  <mat-grid-tile>\r\n    <mat-card class=\"gdpr-card\">\r\n      <mat-card-header>\r\n        <!-- <mat-card-title>Privacy Notice</mat-card-title> -->\r\n          <mat-card-subtitle>\r\n            <div *ngIf=\"!isEga()\">\r\n            This service requires limited processing of your personal data in order to function.\r\n            By using the service you are agreeing to this as outlined in our\r\n            <a href=\"https://www.ebi.ac.uk/data-protection/privacy-notice/ena-submission\" rel=\"noopener noreferrer\" target=\"_blank\">Privacy Notice</a>\r\n            and\r\n            <a href=\"https://www.ebi.ac.uk/about/terms-of-use\" rel=\"noopener noreferrer\" target=\"_blank\">Terms of Use</a>.\r\n            </div>\r\n            <div *ngIf=\"isEga()\">\r\n            TODO\r\n            </div>\r\n          </mat-card-subtitle>\r\n      </mat-card-header>\r\n\r\n      <mat-card-content>\r\n        <button mat-raised-button color=\"accent\" type=\"submit\" name=\"consent\" (click)=\"consent()\">I agree</button>\r\n      </mat-card-content>\r\n    </mat-card>\r\n  </mat-grid-tile>\r\n</mat-grid-list>\r\n"

/***/ }),

/***/ "./src/app/gdpr/gdpr.component.ts":
/*!****************************************!*\
  !*** ./src/app/gdpr/gdpr.component.ts ***!
  \****************************************/
/*! exports provided: GdprComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GdprComponent", function() { return GdprComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _webin_authentication_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../webin-authentication.service */ "./src/app/webin-authentication.service.ts");
/* harmony import */ var _webin_gdpr_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../webin-gdpr.service */ "./src/app/webin-gdpr.service.ts");
/*
 * Copyright 2018 EMBL - European Bioinformatics Institute
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this
 * file except in compliance with the License. You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software distributed under the
 * License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
 * CONDITIONS OF ANY KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations under the License.
 */




var GdprComponent = /** @class */ (function () {
    function GdprComponent(_webinAuthenticationService, _webinGdprServer) {
        this._webinAuthenticationService = _webinAuthenticationService;
        this._webinGdprServer = _webinGdprServer;
    }
    GdprComponent.prototype.isEga = function () {
        return this._webinAuthenticationService.ega;
    };
    GdprComponent.prototype.consent = function () {
        this._webinGdprServer.consent();
    };
    GdprComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-gdpr',
            template: __webpack_require__(/*! ./gdpr.component.html */ "./src/app/gdpr/gdpr.component.html"),
            encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewEncapsulation"].None,
            styles: [__webpack_require__(/*! ./gdpr.component.css */ "./src/app/gdpr/gdpr.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_webin_authentication_service__WEBPACK_IMPORTED_MODULE_2__["WebinAuthenticationService"],
            _webin_gdpr_service__WEBPACK_IMPORTED_MODULE_3__["WebinGdprService"]])
    ], GdprComponent);
    return GdprComponent;
}());



/***/ }),

/***/ "./src/app/header/header.component.css":
/*!*********************************************!*\
  !*** ./src/app/header/header.component.css ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2hlYWRlci9oZWFkZXIuY29tcG9uZW50LmNzcyJ9 */"

/***/ }),

/***/ "./src/app/header/header.component.html":
/*!**********************************************!*\
  !*** ./src/app/header/header.component.html ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<header id=\"masthead-black-bar\" class=\"clearfix masthead-black-bar\">\r\n</header>\r\n<div> <!-- fxHide fxShow.gt-xs> <!-- ** Application specific content: fxHide fxShow.gt-xs ** -->\r\n  <header id=\"masthead\" class=\"masthead compact-for-data\">\r\n    <div class=\"masthead-inner row expanded\">\r\n      <!-- local-title -->\r\n      <div class=\"float-left inline-block padding-left-large\" id=\"local-title\">\r\n        <a routerLink=\"\"><h4 style=\"color:white\">{{getTitle()}}</h4></a> <!-- ** Application specific content ** -->\r\n      </div>\r\n      <!-- /local-title -->\r\n      <!-- local-nav -->\r\n      <nav class=\"float-left columns medium-6 large-6\" style=\"margin-top: 0;\">\r\n        <ul id=\"local-nav\" class=\"dropdown menu float-left\" data-description=\"navigational\">\r\n          <li><a href=\"mailto:datasubs@ebi.ac.uk\">Support <i class=\"icon icon-generic\" data-icon=\"x\"></i></a></li> <!-- ** Application specific content ** -->\r\n          <li><a href=\"logout\">Logout\r\n            <span *ngIf=\"isAuthenticated()\">({{getAccount()}})</span> <!-- ** Application specific content ** -->\r\n          </a></li>\r\n        </ul>\r\n      </nav>\r\n      <!-- /local-nav -->\r\n    </div>\r\n  </header>\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/header/header.component.ts":
/*!********************************************!*\
  !*** ./src/app/header/header.component.ts ***!
  \********************************************/
/*! exports provided: HeaderComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HeaderComponent", function() { return HeaderComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../environments/environment */ "./src/environments/environment.ts");
/* harmony import */ var _webin_authentication_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../webin-authentication.service */ "./src/app/webin-authentication.service.ts");
/*
 * Copyright 2018 EMBL - European Bioinformatics Institute
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this
 * file except in compliance with the License. You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software distributed under the
 * License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
 * CONDITIONS OF ANY KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations under the License.
 */




var HeaderComponent = /** @class */ (function () {
    function HeaderComponent(_webinAuthenticationService) {
        this._webinAuthenticationService = _webinAuthenticationService;
    }
    HeaderComponent.prototype.getTitle = function () {
        return _environments_environment__WEBPACK_IMPORTED_MODULE_2__["environment"].title;
    };
    HeaderComponent.prototype.isAuthenticated = function () {
        return this._webinAuthenticationService.authenticated;
    };
    HeaderComponent.prototype.getAccount = function () {
        return this._webinAuthenticationService.account;
    };
    HeaderComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-header',
            template: __webpack_require__(/*! ./header.component.html */ "./src/app/header/header.component.html"),
            encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewEncapsulation"].None,
            styles: [__webpack_require__(/*! ./header.component.css */ "./src/app/header/header.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_webin_authentication_service__WEBPACK_IMPORTED_MODULE_3__["WebinAuthenticationService"]])
    ], HeaderComponent);
    return HeaderComponent;
}());



/***/ }),

/***/ "./src/app/login/login.component.css":
/*!*******************************************!*\
  !*** ./src/app/login/login.component.css ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".login-card-container {\r\n  min-height: 400px;\r\n}\r\n\r\n.login-card {\r\n  width: 325px;\r\n}\r\n\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvbG9naW4vbG9naW4uY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLGlCQUFpQjtBQUNuQjs7QUFFQTtFQUNFLFlBQVk7QUFDZCIsImZpbGUiOiJzcmMvYXBwL2xvZ2luL2xvZ2luLmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyIubG9naW4tY2FyZC1jb250YWluZXIge1xyXG4gIG1pbi1oZWlnaHQ6IDQwMHB4O1xyXG59XHJcblxyXG4ubG9naW4tY2FyZCB7XHJcbiAgd2lkdGg6IDMyNXB4O1xyXG59XHJcbiJdfQ== */"

/***/ }),

/***/ "./src/app/login/login.component.html":
/*!********************************************!*\
  !*** ./src/app/login/login.component.html ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<form (ngSubmit)=\"login()\">\r\n<div fxLayout=\"row\" fxLayoutAlign=\"center center\" class=\"login-card-container\">\r\n  <mat-card class=\"login-card\">\r\n    <mat-card-header>\r\n      <mat-card-title>Login</mat-card-title>\r\n      <mat-card-subtitle>Please provide your Webin credentials</mat-card-subtitle>\r\n    </mat-card-header>\r\n    <mat-card-content>\r\n      <p>\r\n      <mat-form-field>\r\n        <input matInput placeholder=\"Webin submission account\" required [(ngModel)]=\"username\" name=\"username\">\r\n      </mat-form-field>\r\n      </p>\r\n      <p>\r\n      <mat-form-field>\r\n        <input type=\"password\" matInput placeholder=\"Password\" required [(ngModel)]=\"password\" name=\"password\">\r\n      </mat-form-field>\r\n      </p>\r\n      <button mat-raised-button color=\"accent\" type=\"submit\" name=\"action\" >Login</button>\r\n\r\n      <p class=\"app-error\" *ngIf=\"error\">\r\n        <i class=\"material-icons\">error</i>\r\n        Invalid Webin submission account or password\r\n      </p>\r\n    </mat-card-content>\r\n  </mat-card>\r\n</div>\r\n</form>\r\n"

/***/ }),

/***/ "./src/app/login/login.component.ts":
/*!******************************************!*\
  !*** ./src/app/login/login.component.ts ***!
  \******************************************/
/*! exports provided: LoginComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginComponent", function() { return LoginComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _webin_authentication_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../webin-authentication.service */ "./src/app/webin-authentication.service.ts");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/*
 * Copyright 2018 EMBL - European Bioinformatics Institute
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this
 * file except in compliance with the License. You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software distributed under the
 * License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
 * CONDITIONS OF ANY KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations under the License.
 */





var LoginComponent = /** @class */ (function () {
    function LoginComponent(_router, _webinAuthenticationService) {
        this._router = _router;
        this._webinAuthenticationService = _webinAuthenticationService;
        this.error = false;
    }
    LoginComponent.prototype.ngOnInit = function () {
        //  console.log('LoginComponent.ngOnInit');
        if (this._webinAuthenticationService.authenticated) {
            this._router.navigateByUrl('');
        }
    };
    LoginComponent.prototype.login = function () {
        var _this = this;
        this._webinAuthenticationService.logout();
        this._webinAuthenticationService.login(this.username, this.password).
            pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["mergeMap"])(function (data) {
            // console.log('WebinAuthenticationService.login succeeded');
            _this._webinAuthenticationService.ega = data.roles.EGA;
            _this._webinAuthenticationService.account = data.principle;
            return _this._webinAuthenticationService.loginToken(_this.username, _this.password);
        })).
            subscribe(function (data) {
            // console.log('WebinAuthenticationService.loginToken succeeded');
            _this._webinAuthenticationService.token = data;
            var redirectUrl = _this._webinAuthenticationService.redirectUrl;
            if (redirectUrl) {
                _this._router.navigateByUrl(redirectUrl);
                _this._webinAuthenticationService.redirectUrl = null;
            }
            else {
                _this._router.navigateByUrl('');
            }
        }, 
        // Errors.
        function (err) {
            _this.error = true;
            _this._webinAuthenticationService.authenticated = false;
            console.error(err);
        }, function () {
            _this.error = false;
            _this._webinAuthenticationService.authenticated = true;
        });
    };
    LoginComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-login',
            template: __webpack_require__(/*! ./login.component.html */ "./src/app/login/login.component.html"),
            encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewEncapsulation"].None,
            styles: [__webpack_require__(/*! ./login.component.css */ "./src/app/login/login.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"],
            _webin_authentication_service__WEBPACK_IMPORTED_MODULE_3__["WebinAuthenticationService"]])
    ], LoginComponent);
    return LoginComponent;
}());



/***/ }),

/***/ "./src/app/logout/logout.component.css":
/*!*********************************************!*\
  !*** ./src/app/logout/logout.component.css ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2xvZ291dC9sb2dvdXQuY29tcG9uZW50LmNzcyJ9 */"

/***/ }),

/***/ "./src/app/logout/logout.component.html":
/*!**********************************************!*\
  !*** ./src/app/logout/logout.component.html ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/logout/logout.component.ts":
/*!********************************************!*\
  !*** ./src/app/logout/logout.component.ts ***!
  \********************************************/
/*! exports provided: LogoutComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LogoutComponent", function() { return LogoutComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _webin_authentication_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../webin-authentication.service */ "./src/app/webin-authentication.service.ts");
/*
 * Copyright 2018 EMBL - European Bioinformatics Institute
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this
 * file except in compliance with the License. You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software distributed under the
 * License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
 * CONDITIONS OF ANY KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations under the License.
 */




var LogoutComponent = /** @class */ (function () {
    function LogoutComponent(_router, _webinAuthenticationService) {
        this._router = _router;
        this._webinAuthenticationService = _webinAuthenticationService;
    }
    LogoutComponent.prototype.ngOnInit = function () {
        this._webinAuthenticationService.logout();
        this._router.navigateByUrl('login');
    };
    LogoutComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-logout',
            template: __webpack_require__(/*! ./logout.component.html */ "./src/app/logout/logout.component.html"),
            encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewEncapsulation"].None,
            styles: [__webpack_require__(/*! ./logout.component.css */ "./src/app/logout/logout.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"],
            _webin_authentication_service__WEBPACK_IMPORTED_MODULE_3__["WebinAuthenticationService"]])
    ], LogoutComponent);
    return LogoutComponent;
}());



/***/ }),

/***/ "./src/app/report-action-type.enum.ts":
/*!********************************************!*\
  !*** ./src/app/report-action-type.enum.ts ***!
  \********************************************/
/*! exports provided: ReportActionType */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ReportActionType", function() { return ReportActionType; });
/*
 * Copyright 2018 EMBL - European Bioinformatics Institute
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this
 * file except in compliance with the License. You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software distributed under the
 * License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
 * CONDITIONS OF ANY KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations under the License.
 */
var ReportActionType;
(function (ReportActionType) {
    ReportActionType["changeReport"] = "changeReport";
    ReportActionType["editXml"] = "editXml";
})(ReportActionType || (ReportActionType = {}));
(function (ReportActionType) {
    function createChangeReportAction(reportType, id) {
        return {
            reportActionType: ReportActionType.changeReport,
            reportType: reportType,
            id: id
        };
    }
    ReportActionType.createChangeReportAction = createChangeReportAction;
    function createEditXmlAction(reportType, id) {
        return {
            reportActionType: ReportActionType.editXml,
            reportType: reportType,
            id: id
        };
    }
    ReportActionType.createEditXmlAction = createEditXmlAction;
})(ReportActionType || (ReportActionType = {}));


/***/ }),

/***/ "./src/app/report-action/report-action.component.css":
/*!***********************************************************!*\
  !*** ./src/app/report-action/report-action.component.css ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3JlcG9ydC1hY3Rpb24vcmVwb3J0LWFjdGlvbi5jb21wb25lbnQuY3NzIn0= */"

/***/ }),

/***/ "./src/app/report-action/report-action.component.html":
/*!************************************************************!*\
  !*** ./src/app/report-action/report-action.component.html ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<button mat-button [matMenuTriggerFor]=\"menu\">\r\n    <i class=\"material-icons\">launch</i></button>\r\n\r\n<mat-menu #menu=\"matMenu\">\r\n\r\n\r\n  <!-- Edit XML actions. -->\r\n\r\n  <div *ngIf=\"isEditXmlAction(ReportType.projects)\">\r\n    <button mat-menu-item (click)=\"editXmlAction(ReportType.projects)\"><i class=\"material-icons\">mode_edit</i>Edit study (project) XML</button>\r\n  </div>\r\n  <div *ngIf=\"isEditXmlAction(ReportType.studies)\">\r\n    <button mat-menu-item (click)=\"editXmlAction(ReportType.studies)\"><i class=\"material-icons\">mode_edit</i>Edit study XML</button>\r\n  </div>\r\n  <div *ngIf=\"isEditXmlAction(ReportType.samples)\">\r\n    <button mat-menu-item (click)=\"editXmlAction(ReportType.samples)\"><i class=\"material-icons\">mode_edit</i>Edit sample XML</button>\r\n  </div>\r\n  <div *ngIf=\"isEditXmlAction(ReportType.runs)\">\r\n    <button mat-menu-item (click)=\"editXmlAction(ReportType.runs)\"><i class=\"material-icons\">mode_edit</i>Edit run XML</button>\r\n  </div>\r\n  <div *ngIf=\"isEditXmlAction(ReportType.experiments)\">\r\n    <button mat-menu-item (click)=\"editXmlAction(ReportType.experiments)\"><i class=\"material-icons\">mode_edit</i>Edit experiment XML</button>\r\n  </div>\r\n  <div *ngIf=\"isEditXmlAction(ReportType.analyses)\">\r\n    <button mat-menu-item (click)=\"editXmlAction(ReportType.analyses)\"><i class=\"material-icons\">mode_edit</i>Edit analysis XML</button>\r\n  </div>\r\n  <div *ngIf=\"isEditXmlAction(ReportType.dacs)\">\r\n    <button mat-menu-item (click)=\"editXmlAction(ReportType.dacs)\"><i class=\"material-icons\">mode_edit</i>Edit dac XML</button>\r\n  </div>\r\n  <div *ngIf=\"isEditXmlAction(ReportType.policies)\">\r\n    <button mat-menu-item (click)=\"editXmlAction(ReportType.policies)\"><i class=\"material-icons\">mode_edit</i>Edit policy XML</button>\r\n  </div>\r\n  <div *ngIf=\"isEditXmlAction(ReportType.datasets)\">\r\n    <button mat-menu-item (click)=\"editXmlAction(ReportType.datasets)\"><i class=\"material-icons\">mode_edit</i>Edit dataset XML</button>\r\n  </div>\r\n\r\n\r\n  <!-- Change report actions. -->\r\n\r\n\r\n  <div *ngIf=\"isChangeReportAction(ReportType.studies)\">\r\n    <button mat-menu-item (click)=\"changeReportAction(ReportType.studies)\">Show study</button>\r\n  </div>\r\n\r\n  <div *ngIf=\"isChangeReportAction(ReportType.samples)\">\r\n    <button mat-menu-item (click)=\"changeReportAction(ReportType.samples)\">Show samples</button>\r\n  </div>\r\n\r\n  <div *ngIf=\"isChangeReportAction(ReportType.runs)\">\r\n    <button mat-menu-item (click)=\"changeReportAction(ReportType.runs)\">Show runs</button>\r\n  </div>\r\n\r\n  <div *ngIf=\"isChangeReportAction(ReportType.analyses)\">\r\n    <button mat-menu-item (click)=\"changeReportAction(ReportType.analyses)\">Show analyses</button>\r\n  </div>\r\n\r\n  <div *ngIf=\"isChangeReportAction(ReportType.runFiles)\">\r\n    <button mat-menu-item (click)=\"changeReportAction(ReportType.runFiles)\">Show submitted files</button>\r\n  </div>\r\n\r\n  <div *ngIf=\"isChangeReportAction(ReportType.analysisFiles)\">\r\n    <button mat-menu-item (click)=\"changeReportAction(ReportType.analysisFiles)\">Show submitted files</button>\r\n  </div>\r\n\r\n  <div *ngIf=\"isChangeReportAction(ReportType.runProcess)\">\r\n    <button mat-menu-item (click)=\"changeReportAction(ReportType.runProcess)\">Show processing status</button>\r\n  </div>\r\n\r\n  <div *ngIf=\"isChangeReportAction(ReportType.analysisProcess)\">\r\n    <button mat-menu-item (click)=\"changeReportAction(ReportType.analysisProcess)\">Show processing status</button>\r\n  </div>\r\n\r\n\r\n  <div *ngIf=\"isChangeReportAction(ReportType.dacs)\">\r\n    <button mat-menu-item (click)=\"changeReportAction(ReportType.dacs)\">Show dac</button>\r\n  </div>\r\n\r\n  <div *ngIf=\"isChangeReportAction(ReportType.policies)\">\r\n    <button mat-menu-item (click)=\"changeReportAction(ReportType.policies)\">Show policies</button>\r\n  </div>\r\n\r\n  <div *ngIf=\"isChangeReportAction(ReportType.datasets)\">\r\n    <button mat-menu-item (click)=\"changeReportAction(ReportType.datasets)\">Show datasets</button>\r\n  </div>\r\n\r\n</mat-menu>\r\n"

/***/ }),

/***/ "./src/app/report-action/report-action.component.ts":
/*!**********************************************************!*\
  !*** ./src/app/report-action/report-action.component.ts ***!
  \**********************************************************/
/*! exports provided: ReportActionComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ReportActionComponent", function() { return ReportActionComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _report_type_enum__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../report-type.enum */ "./src/app/report-type.enum.ts");
/* harmony import */ var _report_action_type_enum__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../report-action-type.enum */ "./src/app/report-action-type.enum.ts");
/*
 * Copyright 2018 EMBL - European Bioinformatics Institute
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this
 * file except in compliance with the License. You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software distributed under the
 * License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
 * CONDITIONS OF ANY KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations under the License.
 */




var ReportActionComponent = /** @class */ (function () {
    function ReportActionComponent() {
        this.actionChange = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.ReportType = _report_type_enum__WEBPACK_IMPORTED_MODULE_2__["ReportType"]; // Allows use in template
    }
    ReportActionComponent.prototype.isAction = function (reportType, reportActionType, action) {
        return action.reportActionType === reportActionType && action.reportType === reportType;
    };
    ReportActionComponent.prototype.isChangeReportAction = function (reportType) {
        var _this = this;
        return this.actions.some(function (action) { return _this.isAction(reportType, _report_action_type_enum__WEBPACK_IMPORTED_MODULE_3__["ReportActionType"].changeReport, action); });
    };
    ReportActionComponent.prototype.isEditXmlAction = function (reportType) {
        var _this = this;
        return this.actions.some(function (action) { return _this.isAction(reportType, _report_action_type_enum__WEBPACK_IMPORTED_MODULE_3__["ReportActionType"].editXml, action); });
    };
    ReportActionComponent.prototype.getChangeReportAction = function (reportType) {
        var _this = this;
        return this.actions.find(function (action) { return _this.isAction(reportType, _report_action_type_enum__WEBPACK_IMPORTED_MODULE_3__["ReportActionType"].changeReport, action); });
    };
    ReportActionComponent.prototype.getEditXmlAction = function (reportType) {
        var _this = this;
        return this.actions.find(function (action) { return _this.isAction(reportType, _report_action_type_enum__WEBPACK_IMPORTED_MODULE_3__["ReportActionType"].editXml, action); });
    };
    ReportActionComponent.prototype.changeReportAction = function (reportType) {
        console.log('** change report action **', reportType);
        this.actionChange.emit(this.getChangeReportAction(reportType));
    };
    ReportActionComponent.prototype.editXmlAction = function (reportType) {
        console.log('** edit xml action **', reportType);
        this.actionChange.emit(this.getEditXmlAction(reportType));
    };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Array)
    ], ReportActionComponent.prototype, "actions", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
    ], ReportActionComponent.prototype, "actionChange", void 0);
    ReportActionComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-report-action',
            template: __webpack_require__(/*! ./report-action.component.html */ "./src/app/report-action/report-action.component.html"),
            encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewEncapsulation"].None,
            styles: [__webpack_require__(/*! ./report-action.component.css */ "./src/app/report-action/report-action.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], ReportActionComponent);
    return ReportActionComponent;
}());



/***/ }),

/***/ "./src/app/report-edit-dialog/report-edit-dialog.component.css":
/*!*********************************************************************!*\
  !*** ./src/app/report-edit-dialog/report-edit-dialog.component.css ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3JlcG9ydC1lZGl0LWRpYWxvZy9yZXBvcnQtZWRpdC1kaWFsb2cuY29tcG9uZW50LmNzcyJ9 */"

/***/ }),

/***/ "./src/app/report-edit-dialog/report-edit-dialog.component.html":
/*!**********************************************************************!*\
  !*** ./src/app/report-edit-dialog/report-edit-dialog.component.html ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<h2 mat-dialog-title>{{getTitle()}}</h2>\r\n\r\n<mat-dialog-content>\r\n\r\n  <div *ngIf=\"isRetrieveXmlError()\">\r\n\r\n    <!-- Show XML retrieval error -->\r\n\r\n    <div class=\"app-error\">\r\n        <i class=\"material-icons\">error</i>\r\n        {{retrieveXmlError}}\r\n    </div>\r\n  </div>\r\n\r\n  <div *ngIf=\"!isRetrieveXmlError() && !isUpdateXmlResult()\">\r\n\r\n      <!-- Show XML editor -->\r\n\r\n      <textarea matInput [(ngModel)]=\"xml\" rows=\"15\">\r\n      </textarea>\r\n  </div>\r\n\r\n  <!-- Show XML update result -->\r\n\r\n  <app-submission-result [showReceiptSuccess]=\"false\" #submissionResult></app-submission-result>\r\n\r\n</mat-dialog-content>\r\n\r\n<mat-dialog-actions>\r\n\r\n  <div *ngIf=\"!isRetrieveXmlError() && !isUpdateXmlResult()\">\r\n\r\n    <!-- Show save button -->\r\n\r\n    <button mat-button color=\"primary\" (click)=\"save()\">Save</button>\r\n    </div>\r\n\r\n  <div *ngIf=\"isUpdateXmlResult() && isUpdateXmlError()\">\r\n\r\n    <!-- Show back button -->\r\n\r\n    <button mat-button color=\"primary\" (click)=\"back()\">Back</button>\r\n\r\n  </div>\r\n\r\n  <!-- Show close button -->\r\n\r\n  <button mat-button color=\"primary\" [mat-dialog-close]=\"true\">Close</button>\r\n\r\n</mat-dialog-actions>\r\n"

/***/ }),

/***/ "./src/app/report-edit-dialog/report-edit-dialog.component.ts":
/*!********************************************************************!*\
  !*** ./src/app/report-edit-dialog/report-edit-dialog.component.ts ***!
  \********************************************************************/
/*! exports provided: ReportEditDialogComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ReportEditDialogComponent", function() { return ReportEditDialogComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _webin_xml_report_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../webin-xml-report.service */ "./src/app/webin-xml-report.service.ts");
/* harmony import */ var _webin_rest_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../webin-rest.service */ "./src/app/webin-rest.service.ts");
/* harmony import */ var _submission_result_submission_result_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../submission-result/submission-result.component */ "./src/app/submission-result/submission-result.component.ts");
/* harmony import */ var _report_type_enum__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../report-type.enum */ "./src/app/report-type.enum.ts");
/*
 * Copyright 2018 EMBL - European Bioinformatics Institute
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this
 * file except in compliance with the License. You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software distributed under the
 * License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
 * CONDITIONS OF ANY KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations under the License.
 */







var ReportEditDialogComponent = /** @class */ (function () {
    function ReportEditDialogComponent(_webinXmlReportService, _webinRestService, dialogRef, data) {
        this._webinXmlReportService = _webinXmlReportService;
        this._webinRestService = _webinRestService;
        this.dialogRef = dialogRef;
        this.data = data;
    }
    ReportEditDialogComponent.prototype.ngOnInit = function () {
        this.load();
    };
    ReportEditDialogComponent.prototype.isUpdateXmlResult = function () {
        return this.submissionResult.isResult();
    };
    ReportEditDialogComponent.prototype.isUpdateXmlError = function () {
        return this.submissionResult.isError();
    };
    ReportEditDialogComponent.prototype.isRetrieveXmlError = function () {
        return this.retrieveXmlError ? true : false;
    };
    ReportEditDialogComponent.prototype.getTitle = function () {
        return _report_type_enum__WEBPACK_IMPORTED_MODULE_6__["ReportType"].getCapitalisedSingularName(this.data.reportType) + ': ' + this.data.id;
    };
    ReportEditDialogComponent.prototype.load = function () {
        var _this = this;
        var observable;
        var id = this.data.id;
        var reportType = this.data.reportType;
        console.log('** xml retrieval **', reportType, id);
        switch (reportType) {
            case _report_type_enum__WEBPACK_IMPORTED_MODULE_6__["ReportType"].studies: {
                observable = this._webinXmlReportService.getStudyXml(id);
                break;
            }
            case _report_type_enum__WEBPACK_IMPORTED_MODULE_6__["ReportType"].projects: {
                observable = this._webinXmlReportService.getProjectXml(id);
                break;
            }
            case _report_type_enum__WEBPACK_IMPORTED_MODULE_6__["ReportType"].samples: {
                observable = this._webinXmlReportService.getSampleXml(id);
                break;
            }
            case _report_type_enum__WEBPACK_IMPORTED_MODULE_6__["ReportType"].runs: {
                observable = this._webinXmlReportService.getRunXml(id);
                break;
            }
            case _report_type_enum__WEBPACK_IMPORTED_MODULE_6__["ReportType"].experiments: {
                observable = this._webinXmlReportService.getExperimentXml(id);
                break;
            }
            case _report_type_enum__WEBPACK_IMPORTED_MODULE_6__["ReportType"].analyses: {
                observable = this._webinXmlReportService.getAnalysisXml(id);
                break;
            }
            case _report_type_enum__WEBPACK_IMPORTED_MODULE_6__["ReportType"].dacs: {
                observable = this._webinXmlReportService.getDacXml(id);
                break;
            }
            case _report_type_enum__WEBPACK_IMPORTED_MODULE_6__["ReportType"].policies: {
                observable = this._webinXmlReportService.getPolicyXml(id);
                break;
            }
            case _report_type_enum__WEBPACK_IMPORTED_MODULE_6__["ReportType"].datasets: {
                observable = this._webinXmlReportService.getDatasetXml(id);
                break;
            }
        }
        if (observable) {
            observable.subscribe(
            // Success
            function (data) {
                console.log('** xml retrieval succeeded **', data);
                _this.xml = data;
            }, 
            // Errors
            function (err) {
                console.error('** webin xml retrieval service failed **', err);
                var msg = 'Webin XML retrieval service failed. Please try again later. If the problem persists please contact the helpdesk.';
                _this.retrieveXmlError = msg;
            });
        }
    };
    ReportEditDialogComponent.prototype.back = function () {
        this.submissionResult.reset();
    };
    ReportEditDialogComponent.prototype.save = function () {
        var observable = this._webinRestService.updateXml(this.data.reportType, new Blob([this.xml]));
        this.submissionResult.submit(observable);
    };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])(_submission_result_submission_result_component__WEBPACK_IMPORTED_MODULE_5__["SubmissionResultComponent"]),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _submission_result_submission_result_component__WEBPACK_IMPORTED_MODULE_5__["SubmissionResultComponent"])
    ], ReportEditDialogComponent.prototype, "submissionResult", void 0);
    ReportEditDialogComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-report-edit-dialog',
            template: __webpack_require__(/*! ./report-edit-dialog.component.html */ "./src/app/report-edit-dialog/report-edit-dialog.component.html"),
            encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewEncapsulation"].None,
            styles: [__webpack_require__(/*! ./report-edit-dialog.component.css */ "./src/app/report-edit-dialog/report-edit-dialog.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__param"](3, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"])(_angular_material__WEBPACK_IMPORTED_MODULE_2__["MAT_DIALOG_DATA"])),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_webin_xml_report_service__WEBPACK_IMPORTED_MODULE_3__["WebinXmlReportService"],
            _webin_rest_service__WEBPACK_IMPORTED_MODULE_4__["WebinRestService"],
            _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatDialogRef"], Object])
    ], ReportEditDialogComponent);
    return ReportEditDialogComponent;
}());



/***/ }),

/***/ "./src/app/report-type.enum.ts":
/*!*************************************!*\
  !*** ./src/app/report-type.enum.ts ***!
  \*************************************/
/*! exports provided: ReportType */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ReportType", function() { return ReportType; });
/*
 * Copyright 2018 EMBL - European Bioinformatics Institute
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this
 * file except in compliance with the License. You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software distributed under the
 * License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
 * CONDITIONS OF ANY KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations under the License.
 */
var ReportType;
(function (ReportType) {
    ReportType["studies"] = "studies";
    ReportType["projects"] = "projects";
    ReportType["samples"] = "samples";
    ReportType["experiments"] = "experiments";
    ReportType["runs"] = "runs";
    ReportType["analyses"] = "analyses";
    ReportType["runFiles"] = "runFiles";
    ReportType["analysisFiles"] = "analysisFiles";
    ReportType["runProcess"] = "runProcess";
    ReportType["analysisProcess"] = "analysisProcess";
    ReportType["unsubmittedFiles"] = "unsubmittedFiles";
    ReportType["dacs"] = "dacs";
    ReportType["policies"] = "policies";
    ReportType["datasets"] = "datasets";
})(ReportType || (ReportType = {}));
(function (ReportType) {
    function getCapitalisedSingularName(reportType) {
        switch (reportType) {
            case ReportType.studies: {
                return 'Study';
            }
            case ReportType.projects: {
                return 'Project';
            }
            case ReportType.samples: {
                return 'Sample';
            }
            case ReportType.experiments: {
                return 'Experiment';
            }
            case ReportType.runs: {
                return 'Run';
            }
            case ReportType.analyses: {
                return 'Analysis';
            }
            case ReportType.runFiles: {
                return 'Submitted files for run';
            }
            case ReportType.analysisFiles: {
                return 'Submitted files for analysis';
            }
            case ReportType.runProcess: {
                return 'Run processing status';
            }
            case ReportType.analysisProcess: {
                return 'Analysis processing status';
            }
            case ReportType.unsubmittedFiles: {
                return 'Unsubmitted files';
            }
            case ReportType.dacs: {
                return 'Dac';
            }
            case ReportType.policies: {
                return 'Policy';
            }
            case ReportType.datasets: {
                return 'Dataset';
            }
            default: {
                return '';
            }
        }
    }
    ReportType.getCapitalisedSingularName = getCapitalisedSingularName;
    function getPluralName(reportType) {
        switch (reportType) {
            case ReportType.studies: {
                return 'studies';
            }
            case ReportType.projects: {
                return 'projects';
            }
            case ReportType.samples: {
                return 'samples';
            }
            case ReportType.experiments: {
                return 'experiments';
            }
            case ReportType.runs: {
                return 'runs';
            }
            case ReportType.analyses: {
                return 'analyses';
            }
            case ReportType.runFiles: {
                return 'run files';
            }
            case ReportType.analysisFiles: {
                return 'analyses files';
            }
            case ReportType.runProcess: {
                return 'processing status of archived run files';
            }
            case ReportType.analysisProcess: {
                return 'processing status of archived analysis files';
            }
            case ReportType.unsubmittedFiles: {
                return 'unsubmitted files';
            }
            case ReportType.dacs: {
                return 'dacs';
            }
            case ReportType.policies: {
                return 'policies';
            }
            case ReportType.datasets: {
                return 'datasets';
            }
            default: {
                return '';
            }
        }
    }
    ReportType.getPluralName = getPluralName;
})(ReportType || (ReportType = {}));


/***/ }),

/***/ "./src/app/report/report.component.css":
/*!*********************************************!*\
  !*** ./src/app/report/report.component.css ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "table, th, td {\r\n    background: white;\r\n}\r\n\r\n.component-margin {\r\n  margin-top: 5px;\r\n  margin-right: 5px;\r\n  margin-bottom: 5px;\r\n  margin-left: 5px;\r\n}\r\n\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvcmVwb3J0L3JlcG9ydC5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0lBQ0ksaUJBQWlCO0FBQ3JCOztBQUVBO0VBQ0UsZUFBZTtFQUNmLGlCQUFpQjtFQUNqQixrQkFBa0I7RUFDbEIsZ0JBQWdCO0FBQ2xCIiwiZmlsZSI6InNyYy9hcHAvcmVwb3J0L3JlcG9ydC5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsidGFibGUsIHRoLCB0ZCB7XHJcbiAgICBiYWNrZ3JvdW5kOiB3aGl0ZTtcclxufVxyXG5cclxuLmNvbXBvbmVudC1tYXJnaW4ge1xyXG4gIG1hcmdpbi10b3A6IDVweDtcclxuICBtYXJnaW4tcmlnaHQ6IDVweDtcclxuICBtYXJnaW4tYm90dG9tOiA1cHg7XHJcbiAgbWFyZ2luLWxlZnQ6IDVweDtcclxufVxyXG4iXX0= */"

/***/ }),

/***/ "./src/app/report/report.component.html":
/*!**********************************************!*\
  !*** ./src/app/report/report.component.html ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"component-margin\">\r\n\r\n<p>\r\n  <span class = \"app-primary-color\">\r\n  <i class=\"material-icons\">info</i>\r\n  </span>\r\n\r\n  <span *ngIf=\"isMetadataReport()\">\r\n  Shows submitted {{ ReportType.getPluralName(reportType) }} and their release statuses. Search by accession or unique name, or simply click search to show most recent submissions. The results will show the most recently submitted {{ReportType.getPluralName(reportType)}}\r\n  in your submission account.\r\n  </span>\r\n\r\n  <span *ngIf=\"isFileReport()\">\r\n  Shows submitted {{ ReportType.getPluralName(reportType) }} and their archival statuses. Search by accession or other conditions, or simply click search to show most recent submissions. The results will show the most recently submitted {{ReportType.getPluralName(reportType)}}\r\n  in your submission account.\r\n  </span>\r\n\r\n  <span *ngIf=\"isProcessReport()\">\r\n  Shows the {{ ReportType.getPluralName(reportType) }}. Search by accession or other conditions, or simply click search to show most recent submissions. The results will show the {{ReportType.getPluralName(reportType)}} in your submission account.\r\n  </span>\r\n\r\n  <span *ngIf=\"reportType === ReportType.runProcess\">\r\n  </span>\r\n\r\n  <span *ngIf=\"reportType === ReportType.analysisProcess\">\r\n  The primary use of this report is to retrieve sequence accessions assigned as part of\r\n  genome assembly, transcriptome assembly or sequence flat file submissions.\r\n  </span>\r\n\r\n  <span *ngIf=\"reportType === ReportType.unsubmittedFiles\">\r\n  Shows uploaded files scheduled to be removed unless submitted by the expiration date.\r\n  Uploaded files will only be included into the archive once they have been\r\n  submitted either as runs or analyses. <b>Note that unlike all other reports, the\r\n  contents of this report may not be fully up to date. This report\r\n  is refreshed at most once per day.</b>\r\n  </span>\r\n\r\n</p>\r\n\r\n<p><b>Please click search to see the results.</b></p>\r\n\r\n<div fxLayout=\"row wrap\"\r\n     fxLayoutAlign=\"start center\">\r\n\r\n  <div *ngIf=\"!isMetadataReport() && reportType !== ReportType.unsubmittedFiles\">\r\n    <mat-form-field class=\"app-field-padding\">\r\n        <input matInput placeholder=\"Accession\" [(ngModel)]=\"id\">\r\n    </mat-form-field>\r\n  </div>\r\n  <div *ngIf=\"isMetadataReport() && reportType !== ReportType.unsubmittedFiles\">\r\n    <mat-form-field class=\"app-field-padding\">\r\n      <input matInput placeholder=\"Accession or Name\" [(ngModel)]=\"id\">\r\n    </mat-form-field>\r\n  </div>\r\n  <div *ngIf=\"isMetadataReport()\">\r\n    <mat-form-field class=\"app-field-padding\">\r\n      <mat-select placeholder=\"Release status\" [(ngModel)]=\"status\">\r\n        <mat-option value=\"private\">\r\n          Private\r\n        </mat-option>\r\n        <mat-option value=\"cancelled\">\r\n          Cancelled\r\n        </mat-option>\r\n        <mat-option value=\"public\">\r\n          Public\r\n        </mat-option>\r\n        <mat-option value=\"suppressed\">\r\n          Suppressed\r\n        </mat-option>\r\n        <mat-option value=\"killed\">\r\n          Killed\r\n        </mat-option>\r\n        <mat-option value=\"temporarily suppressed\">\r\n          Temporarily suppressed\r\n        </mat-option>\r\n        <mat-option value=\"temporarily killed\">\r\n          Temporarily killed\r\n        </mat-option>\r\n      </mat-select>\r\n    </mat-form-field>\r\n  </div>\r\n\r\n  <div *ngIf=\"reportType === ReportType.analyses || reportType === ReportType.analysisFiles || reportType === ReportType.analysisProcess\">\r\n    <mat-form-field class=\"app-field-padding\">\r\n      <mat-select placeholder=\"Analysis type\" [(ngModel)]=\"analysisType\">\r\n        <mat-option value=\"SEQUENCE_ASSEMBLY\">\r\n          Genome assembly\r\n        </mat-option>\r\n        <mat-option value=\"TRANSCRIPTOME_ASSEMBLY\">\r\n          Transcriptome assembly\r\n        </mat-option>\r\n        <mat-option value=\"PATHOGEN_ANALYSIS\">\r\n          Pathogen analysis\r\n        </mat-option>\r\n        <mat-option value=\"AMR_ANTIBIOGRAM\">\r\n          AMR Antibiogram\r\n        </mat-option>\r\n        <mat-option value=\"SEQUENCE_ANNOTATION\">\r\n          Sequence annotation\r\n        </mat-option>\r\n        <mat-option value=\"SEQUENCE_VARIATION\">\r\n          Sequence variation\r\n        </mat-option>\r\n        <mat-option value=\"REFERENCE_ALIGNMENT\">\r\n          Reference alignment\r\n        </mat-option>\r\n        <mat-option value=\"REFERENCE_SEQUENCE\">\r\n          Reference sequence\r\n        </mat-option>\r\n        <mat-option value=\"PROCESSED_READS\">\r\n          Processed reads\r\n        </mat-option>\r\n        <mat-option value=\"SEQUENCE_FLATFILE\">\r\n          Sequence flatfile\r\n        </mat-option>\r\n      </mat-select>\r\n    </mat-form-field>\r\n  </div>\r\n\r\n  <div *ngIf=\"isFileReport()\">\r\n    <mat-form-field class=\"app-field-padding\">\r\n      <mat-select placeholder=\"Archive status\" [(ngModel)]=\"processStatus\">\r\n        <mat-option value=\"active\">\r\n          active\r\n        </mat-option>\r\n        <mat-option value=\"completed\">\r\n          completed\r\n        </mat-option>\r\n        <mat-option value=\"failed\">\r\n          failed\r\n        </mat-option>\r\n      </mat-select>\r\n    </mat-form-field>\r\n  </div>\r\n\r\n  <div *ngIf=\"isProcessReport()\">\r\n    or\r\n    <mat-form-field class=\"app-field-padding\">\r\n      <mat-select placeholder=\"Process status\" [(ngModel)]=\"processStatus\">\r\n        <mat-option value=\"active\">\r\n          active\r\n        </mat-option>\r\n        <mat-option value=\"completed\">\r\n          completed\r\n        </mat-option>\r\n        <mat-option value=\"failed\">\r\n          failed\r\n        </mat-option>\r\n      </mat-select>\r\n    </mat-form-field>\r\n  </div>\r\n\r\n  <div class=\"app-field-padding\">\r\n    <button mat-raised-button color=\"accent\" (click)=\"report()\" [disabled]=\"active\">\r\n      Search\r\n    </button>\r\n  </div>\r\n\r\n  <div class=\"app-field-padding\">\r\n    <button mat-raised-button (click)=\"reset()\">\r\n      Reset\r\n    </button>\r\n  </div>\r\n\r\n  <div>\r\n    <mat-form-field class=\"app-field-padding\">\r\n      <mat-select placeholder=\"Maximum rows\" [(ngModel)]=\"rows\">\r\n        <mat-option value=\"100\">\r\n          100\r\n        </mat-option>\r\n        <mat-option value=\"500\">\r\n          500\r\n        </mat-option>\r\n        <mat-option value=\"1000\">\r\n          1000\r\n        </mat-option>\r\n        <mat-option value=\"5000\">\r\n          5000\r\n        </mat-option>\r\n      </mat-select>\r\n    </mat-form-field>\r\n  </div>\r\n\r\n  <div *ngIf=\"isMetadataReport()\">\r\n    <mat-checkbox class=\"app-field-padding\" [(ngModel)]=\"showAlias\">\r\n      Show unique name\r\n    </mat-checkbox>\r\n  </div>\r\n</div>\r\n\r\n<div *ngIf=\"this.data && this.data.length > 0\">\r\n  <p><a href=\"{{ csvDownloadAllLink() }}\">Download all results</a></p>\r\n</div>\r\n\r\n<div *ngIf=\"active\" style=\"height:70px;\">\r\n    <mat-spinner [diameter]=\"50\" [strokeWidth]=\"5\" style=\"margin:0 auto;\">\r\n    </mat-spinner>\r\n</div>\r\n\r\n<div *ngIf=\"dataSource\">\r\n\r\n  <table cdk-table [dataSource]=\"dataSource\">\r\n      <ng-container *ngFor=\"let col of displayedColumns\" cdkColumnDef={{col}}>\r\n  \t    <th cdk-header-cell *cdkHeaderCellDef>{{ col }}</th>\r\n        <ng-container *ngIf=\"col!='Action' && col!='Archive status' && col!='Process status'\">\r\n  \t         <td cdk-cell *cdkCellDef=\"let element\">{{getElementValue(element, col)}}</td>\r\n        </ng-container>\r\n\r\n        <ng-container *ngIf=\"col=='Archive status'\">\r\n\r\n          <td cdk-cell *cdkCellDef=\"let element\">\r\n            <ng-container *ngIf=\"getElementValue(element, col)=='File archived'\">\r\n              <span class=\"action-completed\"\r\n                    matTooltip=\"The file has been included in the permanent archive.\">{{getElementValue(element, col)}}</span>\r\n            </ng-container>\r\n            <ng-container *ngIf=\"getElementValue(element, col)=='Processing file' || getElementValue(element, col)=='File submitted'\">\r\n              <span class=\"action-active\"\r\n              matTooltip=\"The file is waiting to be included in the permanent archive.\">{{getElementValue(element, col)}}</span>\r\n            </ng-container>\r\n            <ng-container *ngIf=\"getElementValue(element, col)!='File archived' && getElementValue(element, col)!='Processing file' && getElementValue(element, col)!='File submitted'\">\r\n              <span class=\"action-failed\"\r\n              matTooltip=\"The file has failed to be included in the permanent archived.\">{{getElementValue(element, col)}}</span>\r\n            </ng-container>\r\n          </td>\r\n\r\n        </ng-container>\r\n\r\n        <ng-container *ngIf=\"col=='Process status'\">\r\n\r\n          <td cdk-cell *cdkCellDef=\"let element\">\r\n\r\n            <ng-container *ngIf=\"getElementValue(element, col)=='COMPLETED' || getElementValue(element, col)=='CANCELLED'\">\r\n              <span class=\"action-completed\"\r\n                   matTooltip=\"The post-archival processing of the file has finished.\">{{getElementValue(element, col)}}</span>\r\n            </ng-container>\r\n            <ng-container *ngIf=\"getElementValue(element, col)=='FAILED'\">\r\n              <span class=\"action-failed\"\r\n                   matTooltip=\"The post-archival processing of the file has failed.\">{{getElementValue(element, col)}}</span>\r\n            </ng-container>\r\n            <ng-container *ngIf=\"getElementValue(element, col)!='COMPLETED' && getElementValue(element, col)!='CANCELLED' && getElementValue(element, col)!='FAILED'\">\r\n              <span class=\"action-active\"\r\n                   matTooltip=\"The post-archival processing of the file is ongoing.\">{{getElementValue(element, col)}}</span>\r\n            </ng-container>\r\n\r\n          </td>\r\n\r\n        </ng-container>\r\n\r\n\r\n        <ng-container *ngIf=\"col=='Action'\">\r\n\r\n          <td cdk-cell *cdkCellDef=\"let element\">\r\n            <span *ngIf=\"media.isActive('xs')\">Action:</span>\r\n            <app-report-action [actions]=\"getActions(element)\" (actionChange)=\"action($event)\">\r\n            </app-report-action>\r\n\r\n          </td>\r\n\r\n        </ng-container>\r\n\r\n      </ng-container>\r\n\r\n      <tr cdk-header-row *cdkHeaderRowDef=\"displayedColumns\"></tr>\r\n      <tr cdk-row *cdkRowDef=\"let row; columns: displayedColumns;\"></tr> <!-- (click)=\"clickRow(row)\" -->\r\n\r\n  </table>\r\n</div>\r\n\r\n<div [hidden]=\"!dataSource\">\r\n  <!-- the paginator must be created before the dataSource has been defined -->\r\n  <mat-paginator #dataPaginator\r\n                 [pageSize]=\"10\"\r\n                 [pageSizeOptions]=\"[10, 25, 50]\">\r\n  </mat-paginator>\r\n\r\n</div>\r\n\r\n<div *ngIf=\"dataError\">\r\n  <div class=\"app-error\">\r\n      <i class=\"material-icons\">error</i>\r\n      {{dataError}}\r\n  </div>\r\n</div>\r\n\r\n</div> <!-- component-margin -->\r\n"

/***/ }),

/***/ "./src/app/report/report.component.ts":
/*!********************************************!*\
  !*** ./src/app/report/report.component.ts ***!
  \********************************************/
/*! exports provided: ReportComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ReportComponent", function() { return ReportComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _angular_flex_layout__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/flex-layout */ "./node_modules/@angular/flex-layout/esm5/flex-layout.es5.js");
/* harmony import */ var _report_edit_dialog_report_edit_dialog_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../report-edit-dialog/report-edit-dialog.component */ "./src/app/report-edit-dialog/report-edit-dialog.component.ts");
/* harmony import */ var _report_type_enum__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../report-type.enum */ "./src/app/report-type.enum.ts");
/* harmony import */ var _report_action_type_enum__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../report-action-type.enum */ "./src/app/report-action-type.enum.ts");
/* harmony import */ var _webin_report_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../webin-report.service */ "./src/app/webin-report.service.ts");
/* harmony import */ var _webin_authentication_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../webin-authentication.service */ "./src/app/webin-authentication.service.ts");
/*
 * Copyright 2018 EMBL - European Bioinformatics Institute
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this
 * file except in compliance with the License. You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software distributed under the
 * License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
 * CONDITIONS OF ANY KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations under the License.
 */











var ReportComponent = /** @class */ (function () {
    function ReportComponent(_webinReportService, _webinAuthenticationService, _reportDialog, media) {
        this._webinReportService = _webinReportService;
        this._webinAuthenticationService = _webinAuthenticationService;
        this._reportDialog = _reportDialog;
        this.media = media;
        this.ReportType = _report_type_enum__WEBPACK_IMPORTED_MODULE_6__["ReportType"]; // Allows use in template
        this.reportChange = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this._showAlias = false;
        this.rows = '100';
    }
    ReportComponent.prototype.isEga = function () {
        return this._webinAuthenticationService.ega;
    };
    Object.defineProperty(ReportComponent.prototype, "id", {
        get: function () {
            return this._id;
        },
        set: function (id) {
            this._id = id;
            this._status = undefined;
            this._processStatus = undefined;
            this._analysisType = undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ReportComponent.prototype, "showAlias", {
        get: function () {
            return this._showAlias;
        },
        set: function (showAlias) {
            this._showAlias = showAlias;
            this.initReportColumns();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ReportComponent.prototype, "status", {
        get: function () {
            return this._status;
        },
        set: function (status) {
            this._status = status;
            this._id = undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ReportComponent.prototype, "processStatus", {
        get: function () {
            return this._processStatus;
        },
        set: function (processStatus) {
            this._processStatus = processStatus;
            this._id = undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ReportComponent.prototype, "analysisType", {
        get: function () {
            return this._analysisType;
        },
        set: function (analysisType) {
            this._analysisType = analysisType;
            this._id = undefined;
        },
        enumerable: true,
        configurable: true
    });
    ReportComponent.prototype.isMetadataReport = function () {
        return this.reportType !== _report_type_enum__WEBPACK_IMPORTED_MODULE_6__["ReportType"].runFiles &&
            this.reportType !== _report_type_enum__WEBPACK_IMPORTED_MODULE_6__["ReportType"].analysisFiles &&
            this.reportType !== _report_type_enum__WEBPACK_IMPORTED_MODULE_6__["ReportType"].runProcess &&
            this.reportType !== _report_type_enum__WEBPACK_IMPORTED_MODULE_6__["ReportType"].analysisProcess &&
            this.reportType !== _report_type_enum__WEBPACK_IMPORTED_MODULE_6__["ReportType"].unsubmittedFiles;
    };
    ReportComponent.prototype.isFileReport = function () {
        return this.reportType === _report_type_enum__WEBPACK_IMPORTED_MODULE_6__["ReportType"].runFiles ||
            this.reportType === _report_type_enum__WEBPACK_IMPORTED_MODULE_6__["ReportType"].analysisFiles;
    };
    ReportComponent.prototype.isProcessReport = function () {
        return this.reportType === _report_type_enum__WEBPACK_IMPORTED_MODULE_6__["ReportType"].runProcess ||
            this.reportType === _report_type_enum__WEBPACK_IMPORTED_MODULE_6__["ReportType"].analysisProcess;
    };
    ReportComponent.prototype.setStudyReportColumns = function () {
        this.displayedColumns = [
            this._showAlias ? 'Unique name' : 'Accession',
            'Secondary Accession',
            'Title',
            'Submission date',
            'Release date',
            'Status',
            'Action',
        ];
        this.displayedColumnsCallback = {
            Accession: this.accessionColumnCallback.bind(this),
            'Unique name': this.aliasColumnCallback.bind(this),
            'Secondary Accession': this.secondaryIdColumnCallback.bind(this),
            Title: this.titleColumnCallback.bind(this),
            'Submission date': this.submissionDateColumnCallback.bind(this),
            'Release date': this.releaseDateColumnCallback.bind(this),
            Status: this.statusColumnCallback.bind(this)
        };
    };
    ReportComponent.prototype.setSampleReportColumns = function () {
        this.displayedColumns = [
            this._showAlias ? 'Unique name' : 'Accession',
            'BioSample',
            'Title',
            'Organism',
            'Tax id',
            'Submission date',
            'Status',
            'Action',
        ];
        this.displayedColumnsCallback = {
            Accession: this.accessionColumnCallback.bind(this),
            'Unique name': this.aliasColumnCallback.bind(this),
            BioSample: this.secondaryIdColumnCallback.bind(this),
            Title: this.titleColumnCallback.bind(this),
            Organism: this.organismColumnCallback.bind(this),
            'Tax id': this.taxIdColumnCallback.bind(this),
            'Submission date': this.submissionDateColumnCallback.bind(this),
            Status: this.statusColumnCallback.bind(this)
        };
    };
    ReportComponent.prototype.setRunReportColumns = function () {
        this.displayedColumns = [
            this._showAlias ? 'Unique name' : 'Accession',
            'Instrument',
            'Study',
            'Sample',
            'Experiment',
            'Submission date',
            'Status',
            'Action',
        ];
        this.displayedColumnsCallback = {
            Accession: this.accessionColumnCallback.bind(this),
            'Unique name': this.aliasColumnCallback.bind(this),
            Instrument: this.instrumentColumnCallback.bind(this),
            Study: this.studyColumnCallback.bind(this),
            Sample: this.sampleColumnCallback.bind(this),
            Experiment: this.experimentColumnCallback.bind(this),
            'Submission date': this.submissionDateColumnCallback.bind(this),
            Status: this.statusColumnCallback.bind(this)
        };
    };
    ReportComponent.prototype.setAnalysisReportColumns = function () {
        this.displayedColumns = [
            this._showAlias ? 'Unique name' : 'Accession',
            'Analysis type',
            'Study',
            'Sample',
            'Submission date',
            'Status',
            'Action',
        ];
        this.displayedColumnsCallback = {
            Accession: this.accessionColumnCallback.bind(this),
            'Unique name': this.aliasColumnCallback.bind(this),
            'Analysis type': this.analysisTypeColumnCallback.bind(this),
            Study: this.studyColumnCallback.bind(this),
            Sample: this.sampleColumnCallback.bind(this),
            'Submission date': this.submissionDateColumnCallback.bind(this),
            Status: this.statusColumnCallback.bind(this)
        };
    };
    ReportComponent.prototype.setRunFileReportColumns = function () {
        this.displayedColumns = [
            'Accession',
            // 'Submission date',
            'File name',
            'File format',
            'File size',
            // 'Checksum method',
            'MD5 checksum',
            'Archive status',
            'Action' // No callback for Action column
        ];
        this.displayedColumnsCallback = {
            Accession: this.accessionColumnCallback.bind(this),
            // 'Submission date': this.submissionDateColumnCallback.bind(this),
            'File name': this.fileNameColumnCallback.bind(this),
            'File format': this.fileFormatColumnCallback.bind(this),
            'File size': this.fileSizeColumnCallback.bind(this),
            // 'Checksum method': this.fileChecksumMethodColumnCallback.bind(this),
            'MD5 checksum': this.fileChecksumColumnCallback.bind(this),
            'Archive status': this.fileArchiveStatusColumnCallback.bind(this)
        };
    };
    ReportComponent.prototype.setAnalysisFileReportColumns = function () {
        this.displayedColumns = [
            'Accession',
            // 'Analysis type',
            // 'Submission date',
            'File name',
            'File format',
            'File size',
            // 'Checksum method',
            'MD5 checksum',
            'Archive status',
            'Action' // No callback for Action column
        ];
        this.displayedColumnsCallback = {
            Accession: this.accessionColumnCallback.bind(this),
            // 'Analysis type': this.analysisTypeColumnCallback.bind(this),
            // 'Submission date': this.submissionDateColumnCallback.bind(this),
            'File name': this.fileNameColumnCallback.bind(this),
            'File format': this.fileFormatColumnCallback.bind(this),
            'File size': this.fileSizeColumnCallback.bind(this),
            // 'Checksum method': this.fileChecksumMethodColumnCallback.bind(this),
            'MD5 checksum': this.fileChecksumColumnCallback.bind(this),
            'Archive status': this.fileArchiveStatusColumnCallback.bind(this)
        };
    };
    ReportComponent.prototype.setRunProcessReportColumns = function () {
        this.displayedColumns = [
            'Accession',
            'Process status',
            'Process error',
            'Action',
        ];
        this.displayedColumnsCallback = {
            Accession: this.accessionColumnCallback.bind(this),
            'Process status': this.processingStatusColumnCallback.bind(this),
            'Process error': this.processingErrorColumnCallback.bind(this)
        };
    };
    ReportComponent.prototype.setAnalysisProcessReportColumns = function () {
        this.displayedColumns = [
            'Accession',
            'Analysis type',
            'Sequence accession',
            'Process status',
            'Process error',
            'Action',
        ];
        this.displayedColumnsCallback = {
            Accession: this.accessionColumnCallback.bind(this),
            'Analysis type': this.analysisTypeColumnCallback.bind(this),
            'Sequence accession': this.processingAccessionColumnCallback.bind(this),
            'Process status': this.processingStatusColumnCallback.bind(this),
            'Process error': this.processingErrorColumnCallback.bind(this)
        };
    };
    ReportComponent.prototype.setUnsubmittedFilesReportColumns = function () {
        this.displayedColumns = [
            'File name',
            'File size',
            'Upload date',
            'Expiration date'
        ];
        this.displayedColumnsCallback = {
            'File name': this.fileNameColumnCallback.bind(this),
            'File size': this.fileSizeColumnCallback.bind(this),
            'Upload date': this.uploadDateColumnCallback.bind(this),
            'Expiration date': this.expirationDateColumnCallback.bind(this)
        };
    };
    ReportComponent.prototype.setDacReportColumns = function () {
        this.displayedColumns = [
            this._showAlias ? 'Unique name' : 'Accession',
            'Title',
            'Submission date',
            'Status',
            'Action',
        ];
        this.displayedColumnsCallback = {
            Accession: this.accessionColumnCallback.bind(this),
            'Unique name': this.aliasColumnCallback.bind(this),
            Title: this.titleColumnCallback.bind(this),
            'Submission date': this.submissionDateColumnCallback.bind(this),
            Status: this.statusColumnCallback.bind(this)
        };
    };
    ReportComponent.prototype.setPolicyReportColumns = function () {
        this.displayedColumns = [
            this._showAlias ? 'Unique name' : 'Accession',
            'Dac',
            'Title',
            'Submission date',
            'Status',
            'Action',
        ];
        this.displayedColumnsCallback = {
            Accession: this.accessionColumnCallback.bind(this),
            'Unique name': this.aliasColumnCallback.bind(this),
            Dac: this.dacColumnCallback.bind(this),
            Title: this.titleColumnCallback.bind(this),
            'Submission date': this.submissionDateColumnCallback.bind(this),
            Status: this.statusColumnCallback.bind(this)
        };
    };
    ReportComponent.prototype.setDatasetReportColumns = function () {
        this.displayedColumns = [
            this._showAlias ? 'Unique name' : 'Accession',
            'Policy',
            'Title',
            'Submission date',
            'Status',
            'Action',
        ];
        this.displayedColumnsCallback = {
            Accession: this.accessionColumnCallback.bind(this),
            'Unique name': this.aliasColumnCallback.bind(this),
            Policy: this.policyColumnCallback.bind(this),
            Title: this.titleColumnCallback.bind(this),
            'Submission date': this.submissionDateColumnCallback.bind(this),
            Status: this.statusColumnCallback.bind(this)
        };
    };
    ReportComponent.prototype.getElementValue = function (result, col) {
        var columnName = '';
        if (this.media.isActive('xs')) {
            columnName = col + ": ";
        }
        var callback = this.displayedColumnsCallback[col];
        return columnName + callback(result);
    };
    ReportComponent.prototype.getActions = function (result) {
        var actions = [];
        // Allow edit XML.
        if (this.reportType === _report_type_enum__WEBPACK_IMPORTED_MODULE_6__["ReportType"].runFiles) {
            actions.push(_report_action_type_enum__WEBPACK_IMPORTED_MODULE_7__["ReportActionType"].createEditXmlAction(_report_type_enum__WEBPACK_IMPORTED_MODULE_6__["ReportType"].runs, this.getId(result)));
        }
        else if (this.reportType === _report_type_enum__WEBPACK_IMPORTED_MODULE_6__["ReportType"].analysisFiles) {
            actions.push(_report_action_type_enum__WEBPACK_IMPORTED_MODULE_7__["ReportActionType"].createEditXmlAction(_report_type_enum__WEBPACK_IMPORTED_MODULE_6__["ReportType"].analyses, this.getId(result)));
        }
        else if (this.reportType === _report_type_enum__WEBPACK_IMPORTED_MODULE_6__["ReportType"].studies ||
            this.reportType === _report_type_enum__WEBPACK_IMPORTED_MODULE_6__["ReportType"].projects) {
            actions.push(_report_action_type_enum__WEBPACK_IMPORTED_MODULE_7__["ReportActionType"].createEditXmlAction(_report_type_enum__WEBPACK_IMPORTED_MODULE_6__["ReportType"].projects, this.getId(result)));
            // actions.push(this.createEditXmlAction(ReportType.studies, this.getSecondaryId(result)));
        }
        else {
            actions.push(_report_action_type_enum__WEBPACK_IMPORTED_MODULE_7__["ReportActionType"].createEditXmlAction(this.reportType, this.getId(result)));
            if (this.reportType === _report_type_enum__WEBPACK_IMPORTED_MODULE_6__["ReportType"].runs) {
                actions.push(_report_action_type_enum__WEBPACK_IMPORTED_MODULE_7__["ReportActionType"].createEditXmlAction(_report_type_enum__WEBPACK_IMPORTED_MODULE_6__["ReportType"].experiments, this.getExperimentId(result)));
            }
        }
        // Allow navigation to studies report.
        if (this.getStudyId(result)) {
            actions.push(_report_action_type_enum__WEBPACK_IMPORTED_MODULE_7__["ReportActionType"].createChangeReportAction(_report_type_enum__WEBPACK_IMPORTED_MODULE_6__["ReportType"].studies, this.getStudyId(result)));
        }
        // Allow navigation to samples report.
        if (this.getSampleId(result)) {
            actions.push(_report_action_type_enum__WEBPACK_IMPORTED_MODULE_7__["ReportActionType"].createChangeReportAction(_report_type_enum__WEBPACK_IMPORTED_MODULE_6__["ReportType"].samples, this.getId(result)));
        }
        // Allow navigation to run report.
        if (this.reportType === _report_type_enum__WEBPACK_IMPORTED_MODULE_6__["ReportType"].studies) {
            actions.push(_report_action_type_enum__WEBPACK_IMPORTED_MODULE_7__["ReportActionType"].createChangeReportAction(_report_type_enum__WEBPACK_IMPORTED_MODULE_6__["ReportType"].runs, this.getSecondaryId(result)));
        }
        if (this.reportType === _report_type_enum__WEBPACK_IMPORTED_MODULE_6__["ReportType"].samples ||
            this.reportType === _report_type_enum__WEBPACK_IMPORTED_MODULE_6__["ReportType"].runFiles) {
            actions.push(_report_action_type_enum__WEBPACK_IMPORTED_MODULE_7__["ReportActionType"].createChangeReportAction(_report_type_enum__WEBPACK_IMPORTED_MODULE_6__["ReportType"].runs, this.getId(result)));
        }
        // Allow navigation to analysis report.
        if (this.reportType === _report_type_enum__WEBPACK_IMPORTED_MODULE_6__["ReportType"].studies) {
            actions.push(_report_action_type_enum__WEBPACK_IMPORTED_MODULE_7__["ReportActionType"].createChangeReportAction(_report_type_enum__WEBPACK_IMPORTED_MODULE_6__["ReportType"].analyses, this.getSecondaryId(result)));
        }
        if (this.reportType === _report_type_enum__WEBPACK_IMPORTED_MODULE_6__["ReportType"].samples ||
            this.reportType === _report_type_enum__WEBPACK_IMPORTED_MODULE_6__["ReportType"].analysisFiles) {
            actions.push(_report_action_type_enum__WEBPACK_IMPORTED_MODULE_7__["ReportActionType"].createChangeReportAction(_report_type_enum__WEBPACK_IMPORTED_MODULE_6__["ReportType"].analyses, this.getId(result)));
        }
        // Allow navigation to run files and run process.
        if (this.reportType === _report_type_enum__WEBPACK_IMPORTED_MODULE_6__["ReportType"].runs && !this.isEga()) {
            actions.push(_report_action_type_enum__WEBPACK_IMPORTED_MODULE_7__["ReportActionType"].createChangeReportAction(_report_type_enum__WEBPACK_IMPORTED_MODULE_6__["ReportType"].runFiles, this.getId(result)));
            actions.push(_report_action_type_enum__WEBPACK_IMPORTED_MODULE_7__["ReportActionType"].createChangeReportAction(_report_type_enum__WEBPACK_IMPORTED_MODULE_6__["ReportType"].runProcess, this.getId(result)));
        }
        // Allow navigation to analysis files annd analysis process.
        if (this.reportType === _report_type_enum__WEBPACK_IMPORTED_MODULE_6__["ReportType"].analyses && !this.isEga()) {
            actions.push(_report_action_type_enum__WEBPACK_IMPORTED_MODULE_7__["ReportActionType"].createChangeReportAction(_report_type_enum__WEBPACK_IMPORTED_MODULE_6__["ReportType"].analysisFiles, this.getId(result)));
            actions.push(_report_action_type_enum__WEBPACK_IMPORTED_MODULE_7__["ReportActionType"].createChangeReportAction(_report_type_enum__WEBPACK_IMPORTED_MODULE_6__["ReportType"].analysisProcess, this.getId(result)));
        }
        // Allow navigation from run process.
        if (this.reportType === _report_type_enum__WEBPACK_IMPORTED_MODULE_6__["ReportType"].runProcess) {
            actions.push(_report_action_type_enum__WEBPACK_IMPORTED_MODULE_7__["ReportActionType"].createChangeReportAction(_report_type_enum__WEBPACK_IMPORTED_MODULE_6__["ReportType"].runs, this.getId(result)));
            actions.push(_report_action_type_enum__WEBPACK_IMPORTED_MODULE_7__["ReportActionType"].createChangeReportAction(_report_type_enum__WEBPACK_IMPORTED_MODULE_6__["ReportType"].runFiles, this.getId(result)));
        }
        // Allow navigation from analysis process.
        if (this.reportType === _report_type_enum__WEBPACK_IMPORTED_MODULE_6__["ReportType"].analysisProcess) {
            actions.push(_report_action_type_enum__WEBPACK_IMPORTED_MODULE_7__["ReportActionType"].createChangeReportAction(_report_type_enum__WEBPACK_IMPORTED_MODULE_6__["ReportType"].analyses, this.getId(result)));
            actions.push(_report_action_type_enum__WEBPACK_IMPORTED_MODULE_7__["ReportActionType"].createChangeReportAction(_report_type_enum__WEBPACK_IMPORTED_MODULE_6__["ReportType"].analysisFiles, this.getId(result)));
        }
        if (this.reportType === _report_type_enum__WEBPACK_IMPORTED_MODULE_6__["ReportType"].dacs) {
            actions.push(_report_action_type_enum__WEBPACK_IMPORTED_MODULE_7__["ReportActionType"].createChangeReportAction(_report_type_enum__WEBPACK_IMPORTED_MODULE_6__["ReportType"].policies, this.getId(result)));
        }
        if (this.reportType === _report_type_enum__WEBPACK_IMPORTED_MODULE_6__["ReportType"].policies) {
            actions.push(_report_action_type_enum__WEBPACK_IMPORTED_MODULE_7__["ReportActionType"].createChangeReportAction(_report_type_enum__WEBPACK_IMPORTED_MODULE_6__["ReportType"].dacs, this.getDacId(result)));
            actions.push(_report_action_type_enum__WEBPACK_IMPORTED_MODULE_7__["ReportActionType"].createChangeReportAction(_report_type_enum__WEBPACK_IMPORTED_MODULE_6__["ReportType"].datasets, this.getId(result)));
        }
        if (this.reportType === _report_type_enum__WEBPACK_IMPORTED_MODULE_6__["ReportType"].datasets) {
            actions.push(_report_action_type_enum__WEBPACK_IMPORTED_MODULE_7__["ReportActionType"].createChangeReportAction(_report_type_enum__WEBPACK_IMPORTED_MODULE_6__["ReportType"].policies, this.getPolicyId(result)));
        }
        return actions;
    };
    ReportComponent.prototype.action = function (action) {
        console.log('** action **', action);
        if (action && action.reportActionType === _report_action_type_enum__WEBPACK_IMPORTED_MODULE_7__["ReportActionType"].changeReport) {
            // console.log('** change report action **', action);
            this.reportChange.emit(action);
        }
        if (action && action.reportActionType === _report_action_type_enum__WEBPACK_IMPORTED_MODULE_7__["ReportActionType"].editXml) {
            // console.log('** edit xml action **', action);
            this.editXml(action);
        }
    };
    ReportComponent.prototype.editXml = function (action) {
        var reportDialogRef = this._reportDialog.open(_report_edit_dialog_report_edit_dialog_component__WEBPACK_IMPORTED_MODULE_5__["ReportEditDialogComponent"], {
            width: '600px',
            data: action
        });
        reportDialogRef.afterClosed().subscribe();
    };
    ReportComponent.prototype.reset = function () {
        this.active = false;
        this.data = undefined;
        this.dataSource = undefined;
        this.dataError = undefined;
        this._id = undefined;
        this._status = undefined;
        this._processStatus = undefined;
        this._analysisType = undefined;
        // this.report();
    };
    ReportComponent.prototype.report = function () {
        // console.log(" ** report **", this.reportType);
        var _this = this;
        this.initReportColumns();
        var observable = this.initReportObservable('json', this.rows);
        if (observable) {
            this.active = true;
            this.data = undefined;
            this.dataError = undefined;
            observable.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["retry"])(3)).subscribe(function (data) {
                // console.log('** Webin reports service **', data);
                _this.data = data;
                _this.dataSource = new _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatTableDataSource"](_this.data);
                _this.dataSource.paginator = _this.dataPaginator;
            }, function (err) {
                console.log('** Webin reports service failed **', err);
                var msg = 'Webin reports service failed. Please try again later. If the problem persists please contact the helpdesk.';
                _this.dataError = msg;
            }, function () {
                _this.active = false;
            });
        }
    };
    ReportComponent.prototype.initReportColumns = function () {
        if (this.reportType === _report_type_enum__WEBPACK_IMPORTED_MODULE_6__["ReportType"].studies) {
            this.setStudyReportColumns();
        }
        else if (this.reportType === _report_type_enum__WEBPACK_IMPORTED_MODULE_6__["ReportType"].samples) {
            this.setSampleReportColumns();
        }
        else if (this.reportType === _report_type_enum__WEBPACK_IMPORTED_MODULE_6__["ReportType"].runs) {
            this.setRunReportColumns();
        }
        else if (this.reportType === _report_type_enum__WEBPACK_IMPORTED_MODULE_6__["ReportType"].analyses) {
            this.setAnalysisReportColumns();
        }
        else if (this.reportType === _report_type_enum__WEBPACK_IMPORTED_MODULE_6__["ReportType"].runFiles) {
            this.setRunFileReportColumns();
        }
        else if (this.reportType === _report_type_enum__WEBPACK_IMPORTED_MODULE_6__["ReportType"].analysisFiles) {
            this.setAnalysisFileReportColumns();
        }
        else if (this.reportType === _report_type_enum__WEBPACK_IMPORTED_MODULE_6__["ReportType"].runProcess) {
            this.setRunProcessReportColumns();
        }
        else if (this.reportType === _report_type_enum__WEBPACK_IMPORTED_MODULE_6__["ReportType"].analysisProcess) {
            this.setAnalysisProcessReportColumns();
        }
        else if (this.reportType === _report_type_enum__WEBPACK_IMPORTED_MODULE_6__["ReportType"].unsubmittedFiles) {
            this.setUnsubmittedFilesReportColumns();
        }
        else if (this.reportType === _report_type_enum__WEBPACK_IMPORTED_MODULE_6__["ReportType"].dacs) {
            this.setDacReportColumns();
        }
        else if (this.reportType === _report_type_enum__WEBPACK_IMPORTED_MODULE_6__["ReportType"].policies) {
            this.setPolicyReportColumns();
        }
        else if (this.reportType === _report_type_enum__WEBPACK_IMPORTED_MODULE_6__["ReportType"].datasets) {
            this.setDatasetReportColumns();
        }
    };
    ReportComponent.prototype.initReportObservable = function (format, rows) {
        if (!rows) {
            rows = this.rows;
        }
        if (this.reportType === _report_type_enum__WEBPACK_IMPORTED_MODULE_6__["ReportType"].studies ||
            this.reportType === _report_type_enum__WEBPACK_IMPORTED_MODULE_6__["ReportType"].projects) {
            if (this.id) {
                return this._webinReportService.getProjects(this.id, rows, format);
                // return this._webinReportService.getStudies(this.id, rows, format);
            }
            return this._webinReportService.getProjectsAll(this._status, rows, format);
            // return this._webinReportService.getStudiesAll(this._status, rows, format);
        }
        if (this.reportType === _report_type_enum__WEBPACK_IMPORTED_MODULE_6__["ReportType"].samples) {
            if (this.id) {
                return this._webinReportService.getSamples(this.id, rows, format);
            }
            return this._webinReportService.getSamplesAll(this._status, rows, format);
        }
        if (this.reportType === _report_type_enum__WEBPACK_IMPORTED_MODULE_6__["ReportType"].runs) {
            if (this.id) {
                return this._webinReportService.getRuns(this.id, rows, format);
            }
            return this._webinReportService.getRunsAll(this._status, rows, format);
        }
        if (this.reportType === _report_type_enum__WEBPACK_IMPORTED_MODULE_6__["ReportType"].analyses) {
            if (this.id) {
                return this._webinReportService.getAnalyses(this.id, rows, format);
            }
            return this._webinReportService.getAnalysesAll(this._status, this._analysisType, rows, format);
        }
        if (this.reportType === _report_type_enum__WEBPACK_IMPORTED_MODULE_6__["ReportType"].runFiles) {
            if (this.id) {
                return this._webinReportService.getRunFiles(this.id, rows, format);
            }
            return this._webinReportService.getRunFilesAll(this._processStatus, rows, format);
        }
        if (this.reportType === _report_type_enum__WEBPACK_IMPORTED_MODULE_6__["ReportType"].analysisFiles) {
            if (this.id) {
                return this._webinReportService.getAnalysisFiles(this.id, rows, format);
            }
            return this._webinReportService.getAnalysisFilesAll(this._analysisType, this._processStatus, rows, format);
        }
        if (this.reportType === _report_type_enum__WEBPACK_IMPORTED_MODULE_6__["ReportType"].runProcess) {
            if (this.id) {
                return this._webinReportService.getRunProcess(this.id, rows, format);
            }
            return this._webinReportService.getRunProcessAll(this._processStatus, rows, format);
        }
        if (this.reportType === _report_type_enum__WEBPACK_IMPORTED_MODULE_6__["ReportType"].analysisProcess) {
            if (this.id) {
                return this._webinReportService.getAnalysisProcess(this.id, rows, format);
            }
            return this._webinReportService.getAnalysisProcessAll(this._analysisType, this._processStatus, rows, format);
        }
        if (this.reportType === _report_type_enum__WEBPACK_IMPORTED_MODULE_6__["ReportType"].unsubmittedFiles) {
            return this._webinReportService.getUnsubmittedFilesAll(this.id, rows, format);
        }
        if (this.reportType === _report_type_enum__WEBPACK_IMPORTED_MODULE_6__["ReportType"].dacs) {
            if (this.id) {
                return this._webinReportService.getDacs(this.id, rows, format);
            }
            return this._webinReportService.getDacsAll(this._status, rows, format);
        }
        if (this.reportType === _report_type_enum__WEBPACK_IMPORTED_MODULE_6__["ReportType"].policies) {
            if (this.id) {
                return this._webinReportService.getPolicies(this.id, rows, format);
            }
            return this._webinReportService.getPoliciesAll(this._status, rows, format);
        }
        if (this.reportType === _report_type_enum__WEBPACK_IMPORTED_MODULE_6__["ReportType"].datasets) {
            if (this.id) {
                return this._webinReportService.getDatasets(this.id, rows, format);
            }
            return this._webinReportService.getDatasetsAll(this._status, rows, format);
        }
    };
    // Id getters
    //
    ReportComponent.prototype.getId = function (result) {
        if (result.report.egaId) {
            return result.report.egaId;
        }
        return result.report.id;
    };
    ReportComponent.prototype.getStudyId = function (result) {
        if (result.report.studyEgaId) {
            return result.report.studyEgaId;
        }
        return result.report.studyId;
    };
    ReportComponent.prototype.getSampleId = function (result) {
        if (result.report.sampleEgaId) {
            return result.report.sampleEgaId;
        }
        return result.report.sampleId;
    };
    ReportComponent.prototype.getExperimentId = function (result) {
        if (result.report.experimentEgaId) {
            return result.report.experimentEgaId;
        }
        return result.report.experimentId;
    };
    ReportComponent.prototype.getDacId = function (result) {
        return result.report.egaDacId;
    };
    ReportComponent.prototype.getPolicyId = function (result) {
        return result.report.egaPolicyId;
    };
    ReportComponent.prototype.getSecondaryId = function (result) {
        return result.report.secondaryId;
    };
    ReportComponent.prototype.removeNullAndUndefined = function (value) {
        if (value === null || value === undefined) {
            return '';
        }
        return value;
    };
    // Column callbacks
    //
    ReportComponent.prototype.accessionColumnCallback = function (result) {
        return this.removeNullAndUndefined(this.getId(result));
    };
    ReportComponent.prototype.aliasColumnCallback = function (result) {
        return this.removeNullAndUndefined(result.report.alias);
    };
    ReportComponent.prototype.studyColumnCallback = function (result) {
        return this.removeNullAndUndefined(this.getStudyId(result));
    };
    ReportComponent.prototype.sampleColumnCallback = function (result) {
        return this.removeNullAndUndefined(this.getSampleId(result));
    };
    ReportComponent.prototype.experimentColumnCallback = function (result) {
        return this.removeNullAndUndefined(this.getExperimentId(result));
    };
    ReportComponent.prototype.humanReadableFormat = function (token) {
        if (token) {
            var str = token.toLowerCase();
            str = str.replace(/_/g, ' ');
            return str.charAt(0).toUpperCase() + str.slice(1);
        }
        return token;
    };
    ReportComponent.prototype.analysisTypeColumnCallback = function (result) {
        return this.humanReadableFormat(this.removeNullAndUndefined(result.report.analysisType));
    };
    ReportComponent.prototype.processingStatusColumnCallback = function (result) {
        return this.removeNullAndUndefined(result.report.processingStatus);
    };
    ReportComponent.prototype.processingErrorColumnCallback = function (result) {
        return this.removeNullAndUndefined(result.report.processingError);
    };
    ReportComponent.prototype.processingAccessionColumnCallback = function (result) {
        return this.removeNullAndUndefined(result.report.acc);
    };
    ReportComponent.prototype.dateFormat = function (date) {
        var month = [
            'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
            'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
        ];
        var day = date.getDate();
        var daySuffix;
        if (day > 3 && day < 21) {
            daySuffix = 'th';
        }
        else {
            switch (day % 10) {
                case 1:
                    daySuffix = 'st';
                    break;
                case 2:
                    daySuffix = 'nd';
                    break;
                case 3:
                    daySuffix = 'rd';
                    break;
                default: daySuffix = 'th';
            }
        }
        return date.getDate() + daySuffix + ' ' +
            month[date.getMonth()] + ' ' +
            date.getFullYear();
    };
    ReportComponent.prototype.submissionDateColumnCallback = function (result) {
        if (result.report.firstCreated) {
            var date = new Date(result.report.firstCreated);
            return this.dateFormat(date);
        }
        return '';
    };
    ReportComponent.prototype.releaseDateColumnCallback = function (result) {
        if (result.report.holdDate) {
            var date = new Date(result.report.holdDate);
            return this.dateFormat(date);
        }
        return '';
    };
    ReportComponent.prototype.uploadDateColumnCallback = function (result) {
        if (result.report.uploadDate) {
            var date = new Date(result.report.uploadDate);
            return this.dateFormat(date);
        }
        return '';
    };
    ReportComponent.prototype.expirationDateColumnCallback = function (result) {
        if (result.report.expirationDate) {
            var date = new Date(result.report.expirationDate);
            return this.dateFormat(date);
        }
        return '';
    };
    ReportComponent.prototype.statusColumnCallback = function (result) {
        return this.removeNullAndUndefined(this.humanReadableFormat(result.report.releaseStatus));
    };
    ReportComponent.prototype.fileNameColumnCallback = function (result) {
        return this.removeNullAndUndefined(result.report.fileName);
    };
    ReportComponent.prototype.fileSizeColumnCallback = function (result) {
        return this.removeNullAndUndefined(result.report.bytes);
    };
    ReportComponent.prototype.fileChecksumMethodColumnCallback = function (result) {
        return this.removeNullAndUndefined(result.report.checksumMethod);
    };
    ReportComponent.prototype.fileChecksumColumnCallback = function (result) {
        return this.removeNullAndUndefined(result.report.checksum);
    };
    ReportComponent.prototype.fileFormatColumnCallback = function (result) {
        return this.removeNullAndUndefined(result.report.fileFormat);
    };
    ReportComponent.prototype.fileArchiveStatusColumnCallback = function (result) {
        return this.removeNullAndUndefined(result.report.archiveStatus);
    };
    ReportComponent.prototype.secondaryIdColumnCallback = function (result) {
        return this.removeNullAndUndefined(this.getSecondaryId(result));
    };
    ReportComponent.prototype.titleColumnCallback = function (result) {
        return this.removeNullAndUndefined(result.report.title);
    };
    ReportComponent.prototype.organismColumnCallback = function (result) {
        return this.removeNullAndUndefined(result.report.scientificName);
    };
    ReportComponent.prototype.taxIdColumnCallback = function (result) {
        return this.removeNullAndUndefined(result.report.taxId);
    };
    ReportComponent.prototype.instrumentColumnCallback = function (result) {
        return this.removeNullAndUndefined(result.report.instrumentModel);
    };
    ReportComponent.prototype.dacColumnCallback = function (result) {
        return this.removeNullAndUndefined(this.getDacId(result));
    };
    ReportComponent.prototype.policyColumnCallback = function (result) {
        return this.removeNullAndUndefined(this.getPolicyId(result));
    };
    ReportComponent.prototype.csvDownloadAllLink = function () {
        return this.initReportObservable('csv', '10000000');
    };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", String)
    ], ReportComponent.prototype, "reportType", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
    ], ReportComponent.prototype, "reportChange", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])(_angular_material__WEBPACK_IMPORTED_MODULE_2__["MatPaginator"]),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatPaginator"])
    ], ReportComponent.prototype, "dataPaginator", void 0);
    ReportComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-report',
            template: __webpack_require__(/*! ./report.component.html */ "./src/app/report/report.component.html"),
            encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewEncapsulation"].None,
            styles: [__webpack_require__(/*! ./report.component.css */ "./src/app/report/report.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_webin_report_service__WEBPACK_IMPORTED_MODULE_8__["WebinReportService"],
            _webin_authentication_service__WEBPACK_IMPORTED_MODULE_9__["WebinAuthenticationService"],
            _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatDialog"],
            _angular_flex_layout__WEBPACK_IMPORTED_MODULE_4__["ObservableMedia"]])
    ], ReportComponent);
    return ReportComponent;
}());



/***/ }),

/***/ "./src/app/submission-result-dialog/submission-result-dialog.component.css":
/*!*********************************************************************************!*\
  !*** ./src/app/submission-result-dialog/submission-result-dialog.component.css ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3N1Ym1pc3Npb24tcmVzdWx0LWRpYWxvZy9zdWJtaXNzaW9uLXJlc3VsdC1kaWFsb2cuY29tcG9uZW50LmNzcyJ9 */"

/***/ }),

/***/ "./src/app/submission-result-dialog/submission-result-dialog.component.html":
/*!**********************************************************************************!*\
  !*** ./src/app/submission-result-dialog/submission-result-dialog.component.html ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<h2 mat-dialog-title>Submission result</h2>\r\n\r\n<mat-dialog-content>\r\n\r\n  <app-submission-result #submissionResult></app-submission-result>\r\n\r\n</mat-dialog-content>\r\n\r\n<mat-dialog-actions>\r\n\r\n  <button mat-button color=\"primary\" [mat-dialog-close]=\"true\">Close</button>\r\n\r\n</mat-dialog-actions>\r\n"

/***/ }),

/***/ "./src/app/submission-result-dialog/submission-result-dialog.component.ts":
/*!********************************************************************************!*\
  !*** ./src/app/submission-result-dialog/submission-result-dialog.component.ts ***!
  \********************************************************************************/
/*! exports provided: SubmissionResultDialogComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SubmissionResultDialogComponent", function() { return SubmissionResultDialogComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var _submission_result_submission_result_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../submission-result/submission-result.component */ "./src/app/submission-result/submission-result.component.ts");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/*
 * Copyright 2018 EMBL - European Bioinformatics Institute
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this
 * file except in compliance with the License. You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software distributed under the
 * License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
 * CONDITIONS OF ANY KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations under the License.
 */





var SubmissionResultDialogComponent = /** @class */ (function () {
    function SubmissionResultDialogComponent(dialogRef, data) {
        this.dialogRef = dialogRef;
        this.data = data;
    }
    SubmissionResultDialogComponent.prototype.ngOnInit = function () {
        this.submissionResult.submit(this.data);
    };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])(_submission_result_submission_result_component__WEBPACK_IMPORTED_MODULE_3__["SubmissionResultComponent"]),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _submission_result_submission_result_component__WEBPACK_IMPORTED_MODULE_3__["SubmissionResultComponent"])
    ], SubmissionResultDialogComponent.prototype, "submissionResult", void 0);
    SubmissionResultDialogComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-submission-result-dialog',
            template: __webpack_require__(/*! ./submission-result-dialog.component.html */ "./src/app/submission-result-dialog/submission-result-dialog.component.html"),
            styles: [__webpack_require__(/*! ./submission-result-dialog.component.css */ "./src/app/submission-result-dialog/submission-result-dialog.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__param"](1, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"])(_angular_material__WEBPACK_IMPORTED_MODULE_4__["MAT_DIALOG_DATA"])),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_material__WEBPACK_IMPORTED_MODULE_4__["MatDialogRef"],
            rxjs__WEBPACK_IMPORTED_MODULE_2__["Observable"]])
    ], SubmissionResultDialogComponent);
    return SubmissionResultDialogComponent;
}());



/***/ }),

/***/ "./src/app/submission-result/submission-result.component.css":
/*!*******************************************************************!*\
  !*** ./src/app/submission-result/submission-result.component.css ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3N1Ym1pc3Npb24tcmVzdWx0L3N1Ym1pc3Npb24tcmVzdWx0LmNvbXBvbmVudC5jc3MifQ== */"

/***/ }),

/***/ "./src/app/submission-result/submission-result.component.html":
/*!********************************************************************!*\
  !*** ./src/app/submission-result/submission-result.component.html ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div *ngIf=\"active\" style=\"height:70px;\">\r\n    <mat-spinner [diameter]=\"50\" [strokeWidth]=\"5\" style=\"margin:0 auto;\">\r\n    </mat-spinner>\r\n</div>\r\n\r\n<div *ngIf=\"resultError\">\r\n  <div class=\"app-error\">\r\n      <i class=\"material-icons\">error</i>\r\n      {{resultError}}\r\n  </div>\r\n</div>\r\n\r\n<div *ngIf=\"isResult()\">\r\n\r\n  <!-- Show success or failure message -->\r\n\r\n  <div *ngIf=\"webinErrorDataSource\">\r\n    <div class=\"app-error\">\r\n        <i class=\"material-icons\">error</i>\r\n        Submission failed.\r\n    </div>\r\n  </div>\r\n  <div *ngIf=\"webinAccessionDataSource\">\r\n    <div class=\"app-success\">\r\n        <i class=\"material-icons\">done</i>\r\n        The submission was successful.\r\n    </div>\r\n  </div>\r\n\r\n</div>\r\n\r\n<div *ngIf=\"showReceipt()\">\r\n\r\n  <!-- Show receipt -->\r\n\r\n  <div class=\"container\"\r\n       fxLayout=\"row wrap\">\r\n    <div class=\"app-field-padding\">\r\n        <mat-checkbox [(ngModel)]=\"showReceiptXml\">\r\n          Show receipt XML\r\n        </mat-checkbox>\r\n    </div>\r\n\r\n    <div fxFlex>\r\n   </div>\r\n\r\n   <div *ngIf=\"webinErrorDataSource\" class=\"app-field-padding\">\r\n     <button mat-raised-button color=\"accent\" (click)=\"downloadErrorTable()\">\r\n       Download errors\r\n     </button>\r\n   </div>\r\n\r\n   <div *ngIf=\"webinAccessionDataSource\" class=\"app-field-padding\">\r\n     <button mat-raised-button color=\"accent\" (click)=\"downloadAccessionTable()\">\r\n       Download accessions\r\n     </button>\r\n   </div>\r\n\r\n    <div class=\"app-field-padding\">\r\n      <button mat-raised-button color=\"accent\" (click)=\"downloadReceiptXml()\">\r\n        Download receipt XML\r\n      </button>\r\n    </div>\r\n  </div>\r\n\r\n  <!-- Show errors -->\r\n\r\n  <div *ngIf=\"webinErrorDataSource\">\r\n\r\n    <div *ngIf=\"!showReceiptXml\" class=\"app-submission-result-container\">\r\n\r\n      <table cdk-table #webinErrorTable [dataSource]=\"webinErrorDataSource\" >\r\n\r\n        <ng-container cdkColumnDef=\"error\">\r\n          <th cdk-header-cell *cdkHeaderCellDef><span class=\"app-table-header\">Error message</span></th>\r\n          <td cdk-cell *cdkCellDef=\"let element\">{{element.error}}</td>\r\n        </ng-container>\r\n        <tr cdk-header-row *cdkHeaderRowDef=\"webinErrorTableColumns\"></tr>\r\n        <tr cdk-row *cdkRowDef=\"let row; columns: webinErrorTableColumns;\"></tr>\r\n\r\n      </table>\r\n\r\n    </div>\r\n\r\n    <div *ngIf=\"showReceiptXml\">\r\n      <div class=\"app-receipt app-submission-result-container\">\r\n        <pre>{{result.xml}}</pre>\r\n      </div>\r\n    </div>\r\n\r\n  </div> <!-- <div *ngIf=\"webinErrorDataSource\"> -->\r\n\r\n  <!-- Show accessions -->\r\n\r\n  <div *ngIf=\"webinAccessionDataSource\">\r\n\r\n    <div *ngIf=\"!showReceiptXml\" class=\"app-submission-result-container\">\r\n\r\n      <table cdk-table #webinAccessionTable [dataSource]=\"webinAccessionDataSource\" >\r\n\r\n        <ng-container cdkColumnDef=\"type\">\r\n          <th cdk-header-cell  *cdkHeaderCellDef><span class=\"app-table-header\">Type</span></th>\r\n          <td cdk-cell *cdkCellDef=\"let element\">\r\n            <span *ngIf=\"media.isActive('xs')\">Type:</span>\r\n            {{humanReadableFormat(element.type)}}\r\n          </td>\r\n        </ng-container>\r\n\r\n        <ng-container cdkColumnDef=\"accession\">\r\n          <th cdk-header-cell  *cdkHeaderCellDef><span class=\"app-table-header\">Accession</span></th>\r\n          <td cdk-cell *cdkCellDef=\"let element\">\r\n            <span *ngIf=\"media.isActive('xs')\">Accession:</span>\r\n            {{element.accession}}\r\n          </td>\r\n        </ng-container>\r\n\r\n        <ng-container cdkColumnDef=\"alias\">\r\n          <th cdk-header-cell  *cdkHeaderCellDef><span class=\"app-table-header\">Unique name (alias)</span></th>\r\n          <td cdk-cell *cdkCellDef=\"let element\">\r\n            <span *ngIf=\"media.isActive('xs')\">Unique name (Alias):</span>\r\n            {{element.alias}}\r\n          </td>\r\n        </ng-container>\r\n\r\n        <tr cdk-header-row *cdkHeaderRowDef=\"webinAccessionTableColumns\"></tr>\r\n        <tr cdk-row *cdkRowDef=\"let row; columns: webinAccessionTableColumns;\"></tr>\r\n\r\n      </table>\r\n\r\n    </div>\r\n\r\n    <div *ngIf=\"showReceiptXml\">\r\n      <div class=\"app-receipt app-submission-result-container\">\r\n        <pre>{{result.xml}}</pre>\r\n      </div>\r\n    </div>\r\n\r\n  </div> <!-- <div *ngIf=\"webinErrorDataSource\"> -->\r\n\r\n  <div [hidden]=\"!webinErrorDataSource\">\r\n    <!-- the paginator must be created before the dataSource has been defined -->\r\n    <div *ngIf=\"!showReceiptXml\">\r\n\r\n      <mat-paginator #webinErrorPaginator\r\n                     [pageSize]=\"10\"\r\n                     [pageSizeOptions]=\"[10, 25, 50]\">\r\n      </mat-paginator>\r\n\r\n    </div>\r\n\r\n  </div>\r\n\r\n  <div [hidden]=\"!webinAccessionDataSource\">\r\n    <!-- the paginator must be created before the dataSource has been defined -->\r\n    <mat-paginator #webinAccessionPaginator\r\n                   [pageSize]=\"10\"\r\n                   [pageSizeOptions]=\"[10, 25, 50]\">\r\n    </mat-paginator>\r\n\r\n  </div>\r\n\r\n</div> <!-- <div *ngIf=\"showReceipt()\"> -->\r\n"

/***/ }),

/***/ "./src/app/submission-result/submission-result.component.ts":
/*!******************************************************************!*\
  !*** ./src/app/submission-result/submission-result.component.ts ***!
  \******************************************************************/
/*! exports provided: SubmissionResultComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SubmissionResultComponent", function() { return SubmissionResultComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _angular_flex_layout__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/flex-layout */ "./node_modules/@angular/flex-layout/esm5/flex-layout.es5.js");
/* harmony import */ var _webin_rest_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../webin-rest.service */ "./src/app/webin-rest.service.ts");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var file_saver__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! file-saver */ "./node_modules/file-saver/dist/FileSaver.min.js");
/* harmony import */ var file_saver__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(file_saver__WEBPACK_IMPORTED_MODULE_6__);
/*
 * Copyright 2018 EMBL - European Bioinformatics Institute
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this
 * file except in compliance with the License. You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software distributed under the
 * License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
 * CONDITIONS OF ANY KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations under the License.
 */







var SubmissionResultComponent = /** @class */ (function () {
    function SubmissionResultComponent(_webinRestService, media) {
        this._webinRestService = _webinRestService;
        this.media = media;
        this.webinErrorTableColumns = ['error'];
        this.webinAccessionTableColumns = ['type', 'accession', 'alias'];
        this.showReceiptXml = false;
        this.showReceiptSuccess = true;
    }
    SubmissionResultComponent.prototype.isResult = function () {
        return this.result ? true : false;
    };
    SubmissionResultComponent.prototype.isError = function () {
        return this.result.isError;
    };
    SubmissionResultComponent.prototype.showReceipt = function () {
        if (!this.isResult()) {
            return false;
        }
        if (this.isError()) {
            return true;
        }
        return this.showReceiptSuccess;
    };
    SubmissionResultComponent.prototype.reset = function () {
        this.webinErrorDataSource = undefined;
        this.webinAccessionDataSource = undefined;
        this.result = undefined;
        this.resultError = undefined;
    };
    SubmissionResultComponent.prototype.submit = function (observable) {
        var _this = this;
        if (observable) {
            this.reset();
            this.active = true;
            observable.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["retry"])(3)).subscribe(function (data) {
                // HttpResponse when using {observe: 'response'}
                _this.result = _this._webinRestService.parseResult(data);
                // console.log('** Webin submission **', this.result);
                if (_this.result.isError) {
                    _this.webinErrorDataSource = new _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatTableDataSource"](_this.result.errors);
                    _this.webinErrorDataSource.paginator = _this.webinErrorPaginator;
                }
                else {
                    _this.webinAccessionDataSource = new _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatTableDataSource"](_this.result.accessions);
                    _this.webinAccessionDataSource.paginator = _this.webinAccessionPaginator;
                }
            }, function (err) {
                console.error('** Webin submission service failed **', err);
                var msg = 'Webin submission service failed. Please try again later. If the problem persists please contact the helpdesk.';
                _this.resultError = msg;
            }, function () {
                _this.active = false;
            });
        }
    };
    SubmissionResultComponent.prototype.downloadReceiptXml = function () {
        var blob = new Blob([this.result.xml], { type: 'text/plain;charset=utf-8' });
        Object(file_saver__WEBPACK_IMPORTED_MODULE_6__["saveAs"])(blob, 'Webin-receipt-' + this.result.date + '.xml');
    };
    SubmissionResultComponent.prototype.downloadErrorTable = function () {
        if (this.result.errors) {
            var arr_1 = [];
            arr_1.push('ERROR');
            this.result.errors.forEach(function (error) { return arr_1.push(error.error); });
            var blob = new Blob([arr_1.join('\n')], { type: 'text/plain;charset=utf-8' });
            Object(file_saver__WEBPACK_IMPORTED_MODULE_6__["saveAs"])(blob, 'Webin-errors-' + this.result.date + '.txt');
        }
    };
    SubmissionResultComponent.prototype.downloadAccessionTable = function () {
        if (this.result.accessions) {
            var arr_2 = [];
            arr_2.push('TYPE\tACCESSION\tALIAS');
            this.result.accessions.forEach(function (accession) { return arr_2.push(accession.type + "\t" + accession.accession + "\t" + accession.alias); });
            var blob = new Blob([arr_2.join('\n')], { type: 'text/plain;charset=utf-8' });
            Object(file_saver__WEBPACK_IMPORTED_MODULE_6__["saveAs"])(blob, 'Webin-accessions-' + this.result.date + '.txt');
        }
    };
    SubmissionResultComponent.prototype.humanReadableFormat = function (token) {
        if (token) {
            var str = token.toLowerCase();
            return str.charAt(0).toUpperCase() + str.slice(1);
        }
        return token;
    };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])(_angular_material__WEBPACK_IMPORTED_MODULE_2__["MatPaginator"]),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatPaginator"])
    ], SubmissionResultComponent.prototype, "webinErrorPaginator", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])(_angular_material__WEBPACK_IMPORTED_MODULE_2__["MatPaginator"]),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatPaginator"])
    ], SubmissionResultComponent.prototype, "webinAccessionPaginator", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
    ], SubmissionResultComponent.prototype, "showReceiptSuccess", void 0);
    SubmissionResultComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-submission-result',
            template: __webpack_require__(/*! ./submission-result.component.html */ "./src/app/submission-result/submission-result.component.html"),
            encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewEncapsulation"].None,
            styles: [__webpack_require__(/*! ./submission-result.component.css */ "./src/app/submission-result/submission-result.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_webin_rest_service__WEBPACK_IMPORTED_MODULE_4__["WebinRestService"],
            _angular_flex_layout__WEBPACK_IMPORTED_MODULE_3__["ObservableMedia"]])
    ], SubmissionResultComponent);
    return SubmissionResultComponent;
}());



/***/ }),

/***/ "./src/app/submit/submit.component.css":
/*!*********************************************!*\
  !*** ./src/app/submit/submit.component.css ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".component-margin {\r\n    margin-top: 5px;\r\n    margin-right: 5px;\r\n    margin-bottom: 5px;\r\n    margin-left: 5px;\r\n}\r\n\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvc3VibWl0L3N1Ym1pdC5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0lBQ0ksZUFBZTtJQUNmLGlCQUFpQjtJQUNqQixrQkFBa0I7SUFDbEIsZ0JBQWdCO0FBQ3BCIiwiZmlsZSI6InNyYy9hcHAvc3VibWl0L3N1Ym1pdC5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmNvbXBvbmVudC1tYXJnaW4ge1xyXG4gICAgbWFyZ2luLXRvcDogNXB4O1xyXG4gICAgbWFyZ2luLXJpZ2h0OiA1cHg7XHJcbiAgICBtYXJnaW4tYm90dG9tOiA1cHg7XHJcbiAgICBtYXJnaW4tbGVmdDogNXB4O1xyXG59XHJcbiJdfQ== */"

/***/ }),

/***/ "./src/app/submit/submit.component.html":
/*!**********************************************!*\
  !*** ./src/app/submit/submit.component.html ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!--\r\n  ~ Copyright 2018 EMBL - European Bioinformatics Institute\r\n  ~ Licensed under the Apache License, Version 2.0 (the \"License\"); you may not use this\r\n  ~ file except in compliance with the License. You may obtain a copy of the License at\r\n  ~ http://www.apache.org/licenses/LICENSE-2.0\r\n  ~ Unless required by applicable law or agreed to in writing, software distributed under the\r\n  ~ License is distributed on an \"AS IS\" BASIS, WITHOUT WARRANTIES OR\r\n  ~ CONDITIONS OF ANY KIND, either express or implied. See the License for the\r\n  ~ specific language governing permissions and limitations under the License.\r\n  -->\r\n\r\n<div class=\"component-margin\">\r\n\r\n  <div>\r\n    <p>\r\n      <span class=\"app-primary-color\">\r\n        <i class=\"material-icons\">info</i>\r\n      </span>\r\n      This page is used for making new submissions. To access other functionality please select one of the other pages\r\n      above.\r\n    </p>\r\n  </div>\r\n\r\n  <mat-accordion>\r\n    <mat-expansion-panel>\r\n      <mat-expansion-panel-header>\r\n        <mat-panel-title>\r\n          <b>Submit XML files</b>\r\n        </mat-panel-title>\r\n      </mat-expansion-panel-header>\r\n\r\n      <p>\r\n        Use this submission option to make any type of Webin submission using XML files.\r\n      </p>\r\n\r\n      <div class=\"container\" fxLayout fxLayout.xs=\"column\" fxLayoutAlign=\"space-around start\" fxLayoutGap=\"10px\">\r\n        <div fxFlex=\"33\">\r\n          Submission XML (mandatory)\r\n          <input type=\"file\" class=\"app-choose-file\" #submissionFile\r\n            (change)=\"onChangeSubmissionFile(submissionFile.files)\" />\r\n          Study XML\r\n          <input type=\"file\" class=\"app-choose-file\" #studyFile (change)=\"onChangeStudyFile(studyFile.files)\" />\r\n          Project XML\r\n          <input type=\"file\" class=\"app-choose-file\" #projectFile (change)=\"onChangeProjectFile(projectFile.files)\" />\r\n          Sample XML\r\n          <input type=\"file\" class=\"app-choose-file\" #sampleFile (change)=\"onChangeSampleFile(sampleFile.files)\" />\r\n        </div>\r\n        <div fxFlex=\"33\">\r\n          Experiment XML\r\n          <input type=\"file\" class=\"app-choose-file\" #experimentFile\r\n            (change)=\"onChangeExperimentFile(experimentFile.files)\" />\r\n          Run XML\r\n          <input type=\"file\" class=\"app-choose-file\" #runFile (change)=\"onChangeRunFile(runFile.files)\" />\r\n          Analysis XML\r\n          <input type=\"file\" class=\"app-choose-file\" #analysisFile\r\n            (change)=\"onChangeAnalysisFile(analysisFile.files)\" />\r\n        </div>\r\n\r\n        <div *ngIf=\"isEga()\">\r\n          <div fxFlex>\r\n            EGA DAC XML\r\n            <input type=\"file\" class=\"app-choose-file\" #dacFile (change)=\"onChangeDacFile(dacFile.files)\" />\r\n            EGA Policy XML\r\n            <input type=\"file\" class=\"app-choose-file\" #policyFile (change)=\"onChangePolicyFile(policyFile.files)\" />\r\n            EGA Dataset XML\r\n            <input type=\"file\" class=\"app-choose-file\" #datasetFile (change)=\"onChangeDatasetFile(datasetFile.files)\" />\r\n          </div>\r\n        </div>\r\n      </div>\r\n\r\n      <button mat-raised-button color=\"accent\" [disabled]=\"!canSubmit()\" (click)=\"submit()\">Submit</button>\r\n    </mat-expansion-panel>\r\n\r\n    <ng-container *ngIf=\"!isEga()\">\r\n      <app-checklist [checklistType]=\"ChecklistType.sequence\" [init]=\"false\"></app-checklist>\r\n    </ng-container>\r\n  </mat-accordion>\r\n\r\n</div> <!-- component-margin -->\r\n"

/***/ }),

/***/ "./src/app/submit/submit.component.ts":
/*!********************************************!*\
  !*** ./src/app/submit/submit.component.ts ***!
  \********************************************/
/*! exports provided: SubmitComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SubmitComponent", function() { return SubmitComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _checklist_type_enum__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../checklist-type.enum */ "./src/app/checklist-type.enum.ts");
/* harmony import */ var _webin_authentication_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../webin-authentication.service */ "./src/app/webin-authentication.service.ts");
/* harmony import */ var _webin_rest_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../webin-rest.service */ "./src/app/webin-rest.service.ts");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _submission_result_dialog_submission_result_dialog_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../submission-result-dialog/submission-result-dialog.component */ "./src/app/submission-result-dialog/submission-result-dialog.component.ts");
/*
 * Copyright 2018 EMBL - European Bioinformatics Institute
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this
 * file except in compliance with the License. You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software distributed under the
 * License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
 * CONDITIONS OF ANY KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations under the License.
 */







var SubmitComponent = /** @class */ (function () {
    function SubmitComponent(_webinAuthenticationService, _webinRestService, dialog) {
        this._webinAuthenticationService = _webinAuthenticationService;
        this._webinRestService = _webinRestService;
        this.dialog = dialog;
        this.ChecklistType = _checklist_type_enum__WEBPACK_IMPORTED_MODULE_2__["ChecklistType"]; // Allows use in template
    }
    SubmitComponent.prototype.isEga = function () {
        return this._webinAuthenticationService.ega;
    };
    SubmitComponent.prototype.onChangeSubmissionFile = function (files) {
        this.submissionFile = files[0];
        // console.log("Submission file: " + this.submissionFile);
    };
    SubmitComponent.prototype.onChangeStudyFile = function (files) {
        this.studyFile = files[0];
        // console.log("Study file: " + this.studyFile);
    };
    SubmitComponent.prototype.onChangeProjectFile = function (files) {
        this.projectFile = files[0];
        // console.log("Project file: " + this.projectFile);
    };
    SubmitComponent.prototype.onChangeSampleFile = function (files) {
        this.sampleFile = files[0];
        // console.log("Sample file: " + this.sampleFile);
    };
    SubmitComponent.prototype.onChangeExperimentFile = function (files) {
        this.experimentFile = files[0];
        // console.log("Experiment file: " + this.experimentFile);
    };
    SubmitComponent.prototype.onChangeRunFile = function (files) {
        this.runFile = files[0];
        // console.log("Run file: " + this.runFile);
    };
    SubmitComponent.prototype.onChangeAnalysisFile = function (files) {
        this.analysisFile = files[0];
        // console.log("Analysis file: " + this.analysisFile);
    };
    SubmitComponent.prototype.onChangeDacFile = function (files) {
        this.dacFile = files[0];
        // console.log("Dac file: " + this.dacFile);
    };
    SubmitComponent.prototype.onChangePolicyFile = function (files) {
        this.policyFile = files[0];
        // console.log("Policy file: " + this.policyFile);
    };
    SubmitComponent.prototype.onChangeDatasetFile = function (files) {
        this.datasetFile = files[0];
        // console.log("Dataset file: " + this.datasetFile);
    };
    SubmitComponent.prototype.canSubmit = function () {
        return this.submissionFile ? true : false;
    };
    SubmitComponent.prototype.submit = function () {
        console.log('** Webin XML submission **');
        var observable = this._webinRestService.submitXml(this.submissionFile, this.studyFile, this.projectFile, this.sampleFile, this.experimentFile, this.runFile, this.analysisFile, this.dacFile, this.policyFile, this.datasetFile);
        this.dialog.open(_submission_result_dialog_submission_result_dialog_component__WEBPACK_IMPORTED_MODULE_6__["SubmissionResultDialogComponent"], {
            width: '600px',
            data: observable
        });
    };
    SubmitComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-submit',
            template: __webpack_require__(/*! ./submit.component.html */ "./src/app/submit/submit.component.html"),
            encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewEncapsulation"].None,
            styles: [__webpack_require__(/*! ./submit.component.css */ "./src/app/submit/submit.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_webin_authentication_service__WEBPACK_IMPORTED_MODULE_3__["WebinAuthenticationService"],
            _webin_rest_service__WEBPACK_IMPORTED_MODULE_4__["WebinRestService"],
            _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatDialog"]])
    ], SubmitComponent);
    return SubmitComponent;
}());



/***/ }),

/***/ "./src/app/ui/ui.module.ts":
/*!*********************************!*\
  !*** ./src/app/ui/ui.module.ts ***!
  \*********************************/
/*! exports provided: UiModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UiModule", function() { return UiModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/platform-browser/animations */ "./node_modules/@angular/platform-browser/fesm5/animations.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_flex_layout__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/flex-layout */ "./node_modules/@angular/flex-layout/esm5/flex-layout.es5.js");
/* harmony import */ var _angular_cdk_table__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/cdk/table */ "./node_modules/@angular/cdk/esm5/table.es5.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");

/*
 * Copyright 2018 EMBL - European Bioinformatics Institute
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this
 * file except in compliance with the License. You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software distributed under the
 * License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
 * CONDITIONS OF ANY KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations under the License.
 */







var UiModule = /** @class */ (function () {
    function UiModule() {
    }
    UiModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"]
            ],
            declarations: [],
            exports: [
                _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_3__["BrowserAnimationsModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormsModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_4__["ReactiveFormsModule"],
                _angular_flex_layout__WEBPACK_IMPORTED_MODULE_5__["FlexLayoutModule"],
                _angular_cdk_table__WEBPACK_IMPORTED_MODULE_6__["CdkTableModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_7__["MatAutocompleteModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_7__["MatButtonModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_7__["MatButtonToggleModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_7__["MatCardModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_7__["MatCheckboxModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_7__["MatChipsModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_7__["MatDatepickerModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_7__["MatDialogModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_7__["MatExpansionModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_7__["MatGridListModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_7__["MatIconModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_7__["MatInputModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_7__["MatListModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_7__["MatMenuModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_7__["MatNativeDateModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_7__["MatPaginatorModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_7__["MatProgressBarModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_7__["MatProgressSpinnerModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_7__["MatRadioModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_7__["MatRippleModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_7__["MatSelectModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_7__["MatSidenavModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_7__["MatSliderModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_7__["MatSlideToggleModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_7__["MatSnackBarModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_7__["MatSortModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_7__["MatTableModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_7__["MatTabsModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_7__["MatToolbarModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_7__["MatTooltipModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_7__["MatStepperModule"],
            ]
        })
    ], UiModule);
    return UiModule;
}());



/***/ }),

/***/ "./src/app/webin-authentication-guard.service.ts":
/*!*******************************************************!*\
  !*** ./src/app/webin-authentication-guard.service.ts ***!
  \*******************************************************/
/*! exports provided: WebinAuthenticationGuardService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WebinAuthenticationGuardService", function() { return WebinAuthenticationGuardService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _webin_authentication_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./webin-authentication.service */ "./src/app/webin-authentication.service.ts");
/*
 * Copyright 2018 EMBL - European Bioinformatics Institute
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this
 * file except in compliance with the License. You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software distributed under the
 * License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
 * CONDITIONS OF ANY KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations under the License.
 */




var WebinAuthenticationGuardService = /** @class */ (function () {
    function WebinAuthenticationGuardService(webinAuthenticationService, router) {
        this.webinAuthenticationService = webinAuthenticationService;
        this.router = router;
    }
    WebinAuthenticationGuardService.prototype.canActivate = function (route, state) {
        // console.log('WebinAuthenticationGuardService.canActivate');
        if (this.webinAuthenticationService.authenticated) {
            if (new Date() >=
                this.webinAuthenticationService.logoutDate) {
                // console.log('WebinAuthenticationGuardService: authentication timeout');
                this.webinAuthenticationService.logout();
                this.router.navigate(['login']);
                return false;
            }
            else {
                // console.log('WebinAuthenticationGuardService: authenticated');
                return true;
            }
        }
        // console.log('WebinAuthenticationGuardService: not authenticated');
        var url = state.url;
        if (url.startsWith("/?page=")) {
            // console.log('WebinAuthenticationGuardService: set redirectUrl', url);
            this.webinAuthenticationService.redirectUrl = url;
        }
        this.router.navigate(['login']);
        return false;
    };
    WebinAuthenticationGuardService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_webin_authentication_service__WEBPACK_IMPORTED_MODULE_3__["WebinAuthenticationService"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"]])
    ], WebinAuthenticationGuardService);
    return WebinAuthenticationGuardService;
}());



/***/ }),

/***/ "./src/app/webin-authentication.interceptor.ts":
/*!*****************************************************!*\
  !*** ./src/app/webin-authentication.interceptor.ts ***!
  \*****************************************************/
/*! exports provided: WebinAuthenticationInterceptor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WebinAuthenticationInterceptor", function() { return WebinAuthenticationInterceptor; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _webin_authentication_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./webin-authentication.service */ "./src/app/webin-authentication.service.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../environments/environment */ "./src/environments/environment.ts");
/*
 * Copyright 2018 EMBL - European Bioinformatics Institute
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this
 * file except in compliance with the License. You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software distributed under the
 * License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
 * CONDITIONS OF ANY KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations under the License.
 */




var WebinAuthenticationInterceptor = /** @class */ (function () {
    function WebinAuthenticationInterceptor(injector) {
        this.injector = injector;
    }
    WebinAuthenticationInterceptor.prototype.intercept = function (req, next) {
        console.log(req.url);
        if (!req.url.startsWith(_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].webinAuthenticationServiceUrl) &&
            !req.url.startsWith(_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].webinReportServiceUrl + "/checklist-groups") &&
            !req.url.startsWith(_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].webinReportServiceUrl + "/checklists")) {
            // console.log('Webin authentication interceptor');
            var webinAuthenticationService = this.injector.get(_webin_authentication_service__WEBPACK_IMPORTED_MODULE_2__["WebinAuthenticationService"]);
            var authReq = req.clone({ headers: req.headers.set('Authorization', webinAuthenticationService.getAuthorizationTokenHeader()) });
            return next.handle(authReq);
        }
        else {
            return next.handle(req);
        }
    };
    WebinAuthenticationInterceptor = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injector"]])
    ], WebinAuthenticationInterceptor);
    return WebinAuthenticationInterceptor;
}());



/***/ }),

/***/ "./src/app/webin-authentication.service.ts":
/*!*************************************************!*\
  !*** ./src/app/webin-authentication.service.ts ***!
  \*************************************************/
/*! exports provided: WebinAuthenticationService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WebinAuthenticationService", function() { return WebinAuthenticationService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../environments/environment */ "./src/environments/environment.ts");
/*
 * Copyright 2018 EMBL - European Bioinformatics Institute
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this
 * file except in compliance with the License. You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software distributed under the
 * License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
 * CONDITIONS OF ANY KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations under the License.
 */

// https://medium.com/@ryanchenkie_40935/angular-webin-authentication-using-the-http-client-and-http-interceptors-2f9d1540eb8



var WebinAuthenticationService = /** @class */ (function () {
    function WebinAuthenticationService(_http) {
        this._http = _http;
    }
    Object.defineProperty(WebinAuthenticationService.prototype, "username", {
        get: function () {
            return sessionStorage.getItem('username');
        },
        set: function (username) {
            sessionStorage.setItem('username', username);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WebinAuthenticationService.prototype, "token", {
        get: function () {
            return sessionStorage.getItem('token');
        },
        set: function (token) {
            sessionStorage.setItem('token', token);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WebinAuthenticationService.prototype, "authenticated", {
        get: function () {
            if (sessionStorage['authenticated']) {
                return JSON.parse(sessionStorage.getItem('authenticated'));
            }
            return false;
        },
        set: function (authenticated) {
            sessionStorage.setItem('authenticated', JSON.stringify(authenticated));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WebinAuthenticationService.prototype, "account", {
        get: function () {
            return sessionStorage.getItem('account');
        },
        set: function (account) {
            sessionStorage.setItem('account', account);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WebinAuthenticationService.prototype, "ega", {
        get: function () {
            return JSON.parse(sessionStorage.getItem('ega'));
        },
        set: function (ega) {
            sessionStorage.setItem('ega', JSON.stringify(ega));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WebinAuthenticationService.prototype, "loginDate", {
        get: function () {
            return JSON.parse(sessionStorage.getItem('loginDate'));
        },
        set: function (loginDate) {
            sessionStorage.setItem('loginDate', JSON.stringify(loginDate));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WebinAuthenticationService.prototype, "logoutDate", {
        get: function () {
            return JSON.parse(sessionStorage.getItem('logoutDate'));
        },
        set: function (logoutDate) {
            sessionStorage.setItem('logoutDate', JSON.stringify(logoutDate));
        },
        enumerable: true,
        configurable: true
    });
    /*
    getAuthorizationHeader() {
        console.log('** Webin authorization header **');
        return 'Basic ' + btoa(this.username + ':' + this.password);
    }
    */
    WebinAuthenticationService.prototype.getAuthorizationTokenHeader = function () {
        console.log('** Webin authorization token header **');
        return 'Bearer ' + this.token;
    };
    WebinAuthenticationService.prototype.logout = function () {
        // console.log('logout');
        sessionStorage.removeItem('username');
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('authenticated');
        sessionStorage.removeItem('account');
        sessionStorage.removeItem('ega');
        sessionStorage.removeItem('loginDate');
        sessionStorage.removeItem('logoutDate');
    };
    WebinAuthenticationService.prototype.login = function (username, password) {
        var baseUrl = _environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].webinAuthenticationServiceUrl;
        // console.log('Webin authentication login', baseUrl);
        this.username = username;
        var today = new Date();
        this.loginDate = today;
        this.logoutDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7);
        var body = { authRealms: ['SRA', 'EGA'], password: password, username: this.username };
        var headers = new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpHeaders"]()
            .append('Content-Type', 'application/json')
            .append('Accept', '*/*');
        return this._http.post(baseUrl, body, { headers: headers, withCredentials: false });
    };
    WebinAuthenticationService.prototype.loginToken = function (username, password) {
        var baseUrl = _environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].webinAuthenticationTokenUrl;
        // console.log('Webin authentication token', baseUrl);
        this.username = username;
        var today = new Date();
        this.loginDate = today;
        this.logoutDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7);
        var body = { authRealms: ['SRA', 'EGA'], password: password, username: this.username };
        var headers = new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpHeaders"]()
            .append('Content-Type', 'application/json')
            .append('Accept', '*/*');
        return this._http.post(baseUrl, body, { headers: headers, withCredentials: false, responseType: 'text' });
    };
    WebinAuthenticationService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"]])
    ], WebinAuthenticationService);
    return WebinAuthenticationService;
}());



/***/ }),

/***/ "./src/app/webin-gdpr-guard.service.ts":
/*!*********************************************!*\
  !*** ./src/app/webin-gdpr-guard.service.ts ***!
  \*********************************************/
/*! exports provided: WebinGdprGuardService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WebinGdprGuardService", function() { return WebinGdprGuardService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _webin_gdpr_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./webin-gdpr.service */ "./src/app/webin-gdpr.service.ts");
/*
 * Copyright 2018 EMBL - European Bioinformatics Institute
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this
 * file except in compliance with the License. You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software distributed under the
 * License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
 * CONDITIONS OF ANY KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations under the License.
 */




var WebinGdprGuardService = /** @class */ (function () {
    function WebinGdprGuardService(webinGdprService, router) {
        this.webinGdprService = webinGdprService;
        this.router = router;
    }
    WebinGdprGuardService.prototype.canActivate = function (route, state) {
        return true;
        /*
        console.log('WebinGdprGuardService');
    
        if (this.webinGdprService.consented) {
          console.log('WebinGdprGuardService: consented');
          return true;
        }
        else {
          this.router.navigate(['consent']);
          return false;
        }
        */
    };
    WebinGdprGuardService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_webin_gdpr_service__WEBPACK_IMPORTED_MODULE_3__["WebinGdprService"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"]])
    ], WebinGdprGuardService);
    return WebinGdprGuardService;
}());



/***/ }),

/***/ "./src/app/webin-gdpr.service.ts":
/*!***************************************!*\
  !*** ./src/app/webin-gdpr.service.ts ***!
  \***************************************/
/*! exports provided: WebinGdprService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WebinGdprService", function() { return WebinGdprService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../environments/environment */ "./src/environments/environment.ts");
/*
 * Copyright 2018 EMBL - European Bioinformatics Institute
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this
 * file except in compliance with the License. You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software distributed under the
 * License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
 * CONDITIONS OF ANY KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations under the License.
 */





var WebinGdprService = /** @class */ (function () {
    function WebinGdprService(_http, _router) {
        this._http = _http;
        this._router = _router;
        this._baseUrl = _environments_environment__WEBPACK_IMPORTED_MODULE_4__["environment"].webinGdprServiceUrl;
        // TODO check consent
        this.consented = false;
    }
    WebinGdprService.prototype.consent = function () {
        console.log('** Webin consent **', this._baseUrl);
        this.consented = true;
        // TODO set consent
        this._router.navigateByUrl('');
    };
    WebinGdprService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"], _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"]])
    ], WebinGdprService);
    return WebinGdprService;
}());



/***/ }),

/***/ "./src/app/webin-report.service.ts":
/*!*****************************************!*\
  !*** ./src/app/webin-report.service.ts ***!
  \*****************************************/
/*! exports provided: WebinReportService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WebinReportService", function() { return WebinReportService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../environments/environment */ "./src/environments/environment.ts");
/* harmony import */ var _webin_authentication_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./webin-authentication.service */ "./src/app/webin-authentication.service.ts");
/*
 * Copyright 2018 EMBL - European Bioinformatics Institute
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this
 * file except in compliance with the License. You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software distributed under the
 * License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
 * CONDITIONS OF ANY KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations under the License.
 */





var WebinReportService = /** @class */ (function () {
    function WebinReportService(_webinAuthenticationService, _http) {
        this._webinAuthenticationService = _webinAuthenticationService;
        this._http = _http;
        this._baseUrl = _environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].webinReportServiceUrl;
    }
    WebinReportService.prototype.getStudiesAll = function (status, rows, format) {
        return this.getAll('studies', status, rows, format);
    };
    WebinReportService.prototype.getStudies = function (id, rows, format) {
        return this.getById('studies', id, rows, format);
    };
    WebinReportService.prototype.getProjectsAll = function (status, rows, format) {
        return this.getAll('projects', status, rows, format);
    };
    WebinReportService.prototype.getProjects = function (id, rows, format) {
        return this.getById('projects', id, rows, format);
    };
    WebinReportService.prototype.getSamplesAll = function (status, rows, format) {
        return this.getAll('samples', status, rows, format);
    };
    WebinReportService.prototype.getSamples = function (id, rows, format) {
        return this.getById('samples', id, rows, format);
    };
    WebinReportService.prototype.getRunsAll = function (status, rows, format) {
        return this.getAll('runs', status, rows, format);
    };
    WebinReportService.prototype.getRuns = function (id, rows, format) {
        return this.getById('runs', id, rows, format);
    };
    WebinReportService.prototype.getAnalysesAll = function (status, analysisType, rows, format) {
        var params = {};
        if (status) {
            params['status'] = status;
        }
        if (analysisType) {
            params['analysis-type'] = analysisType;
        }
        return this.getAllParams('analyses', params, rows, format);
    };
    WebinReportService.prototype.getAnalyses = function (id, rows, format) {
        return this.getById('analyses', id, rows, format);
    };
    WebinReportService.prototype.getRunFilesAll = function (archiveStatus, rows, format) {
        var params = {};
        if (archiveStatus) {
            params['archive-status'] = archiveStatus;
        }
        return this.getAllParams('run-files', params, rows, format);
    };
    WebinReportService.prototype.getRunFiles = function (id, rows, format) {
        return this.getById('run-files', id, rows, format);
    };
    WebinReportService.prototype.getAnalysisFilesAll = function (analysisType, archiveStatus, rows, format) {
        var params = {};
        if (analysisType) {
            params['analysis-type'] = analysisType;
        }
        if (archiveStatus) {
            params['archive-status'] = archiveStatus;
        }
        return this.getAllParams('analysis-files', params, rows, format);
    };
    WebinReportService.prototype.getAnalysisFiles = function (id, rows, format) {
        return this.getById('analysis-files', id, rows, format);
    };
    WebinReportService.prototype.getRunProcessAll = function (processStatus, rows, format) {
        var params = {};
        if (processStatus) {
            params['process-status'] = processStatus;
        }
        return this.getAllParams('run-process', params, rows, format);
    };
    WebinReportService.prototype.getRunProcess = function (id, rows, format) {
        return this.getById('run-process', id, rows, format);
    };
    WebinReportService.prototype.getAnalysisProcessAll = function (analysisType, processStatus, rows, format) {
        var params = {};
        if (analysisType) {
            params['analysis-type'] = analysisType;
        }
        if (processStatus) {
            params['process-status'] = processStatus;
        }
        return this.getAllParams('analysis-process', params, rows, format);
    };
    WebinReportService.prototype.getAnalysisProcess = function (id, rows, format) {
        return this.getById('analysis-process', id, rows, format);
    };
    WebinReportService.prototype.getUnsubmittedFilesAll = function (status, rows, format) {
        var params = {};
        return this.getAllParams('unsubmitted-files', params, rows, format);
    };
    WebinReportService.prototype.getDacsAll = function (status, rows, format) {
        return this.getAll('dacs', status, rows, format);
    };
    WebinReportService.prototype.getDacs = function (id, rows, format) {
        return this.getById('dacs', id, rows, format);
    };
    WebinReportService.prototype.getPoliciesAll = function (status, rows, format) {
        return this.getAll('policies', status, rows, format);
    };
    WebinReportService.prototype.getPolicies = function (id, rows, format) {
        return this.getById('policies', id, rows, format);
    };
    WebinReportService.prototype.getDatasetsAll = function (status, rows, format) {
        return this.getAll('datasets', status, rows, format);
    };
    WebinReportService.prototype.getDatasets = function (id, rows, format) {
        return this.getById('datasets', id, rows, format);
    };
    WebinReportService.prototype.getChecklistGroups = function (type) {
        var params = {};
        params['type'] = type;
        var url = this._baseUrl + '/checklist-groups' + '?' + this.getUrlParams(params);
        return this._http.get(url);
    };
    WebinReportService.prototype.getChecklists = function (type) {
        var params = {};
        params['type'] = type;
        var url = this._baseUrl + '/checklists' + '?' + this.getUrlParams(params);
        return this._http.get(url);
    };
    WebinReportService.prototype.getChecklistXmls = function (type) {
        var params = {};
        params['type'] = type;
        var url = this._baseUrl + '/checklists/xml/*' + '?' + this.getUrlParams(params);
        return this._http.get(url, { responseType: 'text', observe: 'response' });
    };
    WebinReportService.prototype.getAll = function (reportType, status, rows, format) {
        var params = {};
        if (status) {
            params['status'] = status;
        }
        params['max-results'] = rows;
        params['format'] = format;
        var url = this._baseUrl + '/' + reportType + '?' + this.getUrlParams(params);
        if (format === 'json') {
            // console.log(url);
            return this._http.get(url);
        }
        if (format === 'csv') {
            return this.getCsvUrlWithToken(url);
        }
    };
    WebinReportService.prototype.getAllParams = function (reportType, params, rows, format) {
        params['max-results'] = rows;
        params['format'] = format;
        var url = this._baseUrl + '/' + reportType + '?' + this.getUrlParams(params);
        if (format === 'json') {
            // console.log(url);
            return this._http.get(url);
        }
        if (format === 'csv') {
            return this.getCsvUrlWithToken(url);
        }
    };
    WebinReportService.prototype.getUrlParams = function (params) {
        var ret = [];
        for (var param in params) {
            if (params.hasOwnProperty(param)) {
                ret.push(encodeURIComponent(param) + '=' + encodeURIComponent(params[param]));
            }
        }
        return ret.join('&');
    };
    WebinReportService.prototype.getById = function (reportType, id, rows, format) {
        var params = {};
        params['max-results'] = rows;
        params['format'] = format;
        var url = this._baseUrl + '/' + reportType + '/' + encodeURIComponent(id.trim()) + '?' + this.getUrlParams(params);
        if (format === 'json') {
            // console.log(url);
            return this._http.get(url);
        }
        if (format === 'csv') {
            return this.getCsvUrlWithToken(url);
        }
    };
    WebinReportService.prototype.getCsvUrlWithToken = function (url) {
        url = url + '&token=' + this._webinAuthenticationService.token;
        // console.log(url);
        return url;
    };
    WebinReportService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_webin_authentication_service__WEBPACK_IMPORTED_MODULE_4__["WebinAuthenticationService"], _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"]])
    ], WebinReportService);
    return WebinReportService;
}());



/***/ }),

/***/ "./src/app/webin-rest.service.ts":
/*!***************************************!*\
  !*** ./src/app/webin-rest.service.ts ***!
  \***************************************/
/*! exports provided: WebinRestService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WebinRestService", function() { return WebinRestService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../environments/environment */ "./src/environments/environment.ts");
/* harmony import */ var _report_type_enum__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./report-type.enum */ "./src/app/report-type.enum.ts");
/* harmony import */ var _webin_authentication_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./webin-authentication.service */ "./src/app/webin-authentication.service.ts");
/*
 * Copyright 2018 EMBL - European Bioinformatics Institute
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this
 * file except in compliance with the License. You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software distributed under the
 * License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
 * CONDITIONS OF ANY KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations under the License.
 */






var WebinRestService = /** @class */ (function () {
    function WebinRestService(_http, _webinAuthenticationService) {
        this._http = _http;
        this._webinAuthenticationService = _webinAuthenticationService;
        this._baseUrl = _environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].webinServiceUrl;
        this._xmlParser = new DOMParser();
    }
    WebinRestService.prototype.headers = function () {
        return new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpHeaders"]();
    };
    WebinRestService.prototype.appendXml = function (formData, name, blob) {
        if (blob) {
            var fileName = blob.name;
            if (!fileName) {
                fileName = name.toLowerCase() + '.xml';
            }
            formData.append(name, blob, fileName);
        }
    };
    WebinRestService.prototype.post = function (formData) {
        var headers = this.headers();
        return this._http.post(this._baseUrl, formData, { headers: headers, responseType: 'text' });
    };
    WebinRestService.prototype.updateXml = function (reportType, xml) {
        console.log('** Update XML **');
        var formData = new FormData();
        var submissionXml = new Blob([
            '<SUBMISSION_SET>' +
                '  <SUBMISSION>' +
                '	<ACTIONS>' +
                '    		<ACTION>' +
                '    			<MODIFY/>' +
                '    		</ACTION>' +
                '    	</ACTIONS>' +
                '    </SUBMISSION>' +
                '</SUBMISSION_SET>'
        ]);
        if (this._webinAuthenticationService.ega) {
            submissionXml = new Blob([
                '<SUBMISSION_SET>' +
                    '  <SUBMISSION broker_name="EGA">' +
                    '	<ACTIONS>' +
                    '    		<ACTION>' +
                    '    			<MODIFY/>' +
                    '    		</ACTION>' +
                    '    		<ACTION>' +
                    '    			<PROTECT/>' +
                    '    		</ACTION>' +
                    '    	</ACTIONS>' +
                    '    </SUBMISSION>' +
                    '</SUBMISSION_SET>'
            ]);
        }
        this.appendXml(formData, 'SUBMISSION', submissionXml);
        switch (reportType) {
            case _report_type_enum__WEBPACK_IMPORTED_MODULE_4__["ReportType"].studies: {
                this.appendXml(formData, 'STUDY', xml);
                break;
            }
            case _report_type_enum__WEBPACK_IMPORTED_MODULE_4__["ReportType"].projects: {
                this.appendXml(formData, 'PROJECT', xml);
                break;
            }
            case _report_type_enum__WEBPACK_IMPORTED_MODULE_4__["ReportType"].samples: {
                this.appendXml(formData, 'SAMPLE', xml);
                break;
            }
            case _report_type_enum__WEBPACK_IMPORTED_MODULE_4__["ReportType"].experiments: {
                this.appendXml(formData, 'EXPERIMENT', xml);
                break;
            }
            case _report_type_enum__WEBPACK_IMPORTED_MODULE_4__["ReportType"].runs: {
                this.appendXml(formData, 'RUN', xml);
                break;
            }
            case _report_type_enum__WEBPACK_IMPORTED_MODULE_4__["ReportType"].analyses: {
                this.appendXml(formData, 'ANALYSIS', xml);
                break;
            }
            case _report_type_enum__WEBPACK_IMPORTED_MODULE_4__["ReportType"].dacs: {
                this.appendXml(formData, 'DAC', xml);
                break;
            }
            case _report_type_enum__WEBPACK_IMPORTED_MODULE_4__["ReportType"].policies: {
                this.appendXml(formData, 'POLICY', xml);
                break;
            }
            case _report_type_enum__WEBPACK_IMPORTED_MODULE_4__["ReportType"].datasets: {
                this.appendXml(formData, 'DATASET', xml);
                break;
            }
        }
        console.log('** webin submission form data **', formData);
        return this.post(formData);
    };
    WebinRestService.prototype.submitXml = function (submissionXml, studyXml, projectXml, sampleXml, experimentXml, runXml, analysisXml, dacXml, policyXml, datasetXml) {
        console.log('** Submit XML **');
        var formData = new FormData();
        this.appendXml(formData, 'SUBMISSION', submissionXml);
        this.appendXml(formData, 'STUDY', studyXml);
        this.appendXml(formData, 'PROJECT', projectXml);
        this.appendXml(formData, 'SAMPLE', sampleXml);
        this.appendXml(formData, 'EXPERIMENT', experimentXml);
        this.appendXml(formData, 'RUN', runXml);
        this.appendXml(formData, 'ANALYSIS', analysisXml);
        this.appendXml(formData, 'DAC', dacXml);
        this.appendXml(formData, 'POLICY', policyXml);
        this.appendXml(formData, 'DATASET', datasetXml);
        return this.post(formData);
    };
    WebinRestService.prototype.parseResult = function (data) {
        var xmlDoc = this._xmlParser.parseFromString(data, 'text/xml');
        var rootNode = xmlDoc.getElementsByTagName('RECEIPT')[0];
        var isError = (rootNode.getAttribute('success') !== 'true');
        var date = rootNode.getAttribute('receiptDate');
        var receipt = {
            isError: isError,
            xml: data,
            date: date,
            accessions: [],
            errors: []
        };
        var i = 0;
        if (!isError) {
            var nodes = rootNode.childNodes;
            // Safer not use forEach for NodeList.
            for (i = 0; i < nodes.length; i++) {
                var childNode = nodes[i];
                if (childNode.tagName === 'ANALYSIS' ||
                    childNode.tagName === 'EXPERIMENT' ||
                    childNode.tagName === 'RUN' ||
                    childNode.tagName === 'SAMPLE' ||
                    childNode.tagName === 'STUDY' ||
                    childNode.tagName === 'DAC' ||
                    childNode.tagName === 'POLICY' ||
                    childNode.tagName === 'DATASET' ||
                    childNode.tagName === 'PROJECT' ||
                    (childNode.tagName === 'SUBMISSION' && childNode.getAttribute('accession'))) {
                    receipt.accessions.push({
                        type: childNode.tagName,
                        accession: childNode.getAttribute('accession'),
                        alias: childNode.getAttribute('alias')
                    });
                }
            }
        }
        else {
            var messageRootNode = rootNode.getElementsByTagName('MESSAGES')[0];
            var nodes = messageRootNode.getElementsByTagName('ERROR');
            // Safer not use forEach for NodeList.
            for (i = 0; i < nodes.length; i++) {
                receipt.errors.push({
                    error: nodes[i].textContent
                });
            }
        }
        return receipt;
    };
    WebinRestService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"],
            _webin_authentication_service__WEBPACK_IMPORTED_MODULE_5__["WebinAuthenticationService"]])
    ], WebinRestService);
    return WebinRestService;
}());



/***/ }),

/***/ "./src/app/webin-xml-report.service.ts":
/*!*********************************************!*\
  !*** ./src/app/webin-xml-report.service.ts ***!
  \*********************************************/
/*! exports provided: WebinXmlReportService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WebinXmlReportService", function() { return WebinXmlReportService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../environments/environment */ "./src/environments/environment.ts");
/*
 * Copyright 2018 EMBL - European Bioinformatics Institute
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this
 * file except in compliance with the License. You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software distributed under the
 * License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
 * CONDITIONS OF ANY KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations under the License.
 */




var WebinXmlReportService = /** @class */ (function () {
    function WebinXmlReportService(http) {
        this.http = http;
        this._baseUrl = _environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].webinXmlReportServiceUrl;
    }
    WebinXmlReportService.prototype.getStudyXml = function (id) {
        return this.getXml('studies', id);
    };
    WebinXmlReportService.prototype.getProjectXml = function (id) {
        return this.getXml('projects', id);
    };
    WebinXmlReportService.prototype.getSampleXml = function (id) {
        return this.getXml('samples', id);
    };
    WebinXmlReportService.prototype.getRunXml = function (id) {
        return this.getXml('runs', id);
    };
    WebinXmlReportService.prototype.getExperimentXml = function (id) {
        return this.getXml('experiments', id);
    };
    WebinXmlReportService.prototype.getAnalysisXml = function (id) {
        return this.getXml('analyses', id);
    };
    WebinXmlReportService.prototype.getDacXml = function (id) {
        return this.getXml('dacs', id);
    };
    WebinXmlReportService.prototype.getPolicyXml = function (id) {
        return this.getXml('policies', id);
    };
    WebinXmlReportService.prototype.getDatasetXml = function (id) {
        return this.getXml('datasets', id);
    };
    WebinXmlReportService.prototype.getXml = function (xmlType, id) {
        var url = this._baseUrl + '/' + xmlType + '/' + id + '?format=xml';
        console.log(url);
        return this.http.get(url, { responseType: 'text' });
    };
    WebinXmlReportService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"]])
    ], WebinXmlReportService);
    return WebinXmlReportService;
}());



/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
var environment = {
    production: false,
    title: 'Webin submissions portal (DEV)',
    webinServiceUrl: 'https://wwwdev.ebi.ac.uk/ena/submit/drop-box/submit/',
    webinAuthenticationServiceUrl: 'https://www.ebi.ac.uk/ena/auth/login',
    webinAuthenticationTokenUrl: 'https://www.ebi.ac.uk/ena/auth/token',
    webinReportServiceUrl: 'https://wwwdev.ebi.ac.uk/ena/submit/report',
    webinXmlReportServiceUrl: 'https://wwwdev.ebi.ac.uk/ena/submit/drop-box',
    webinGdprServiceUrl: 'TODO'
};


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "./node_modules/@angular/platform-browser-dynamic/fesm5/platform-browser-dynamic.js");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");
/*
 * Copyright 2018 EMBL - European Bioinformatics Institute
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this
 * file except in compliance with the License. You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software distributed under the
 * License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
 * CONDITIONS OF ANY KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations under the License.
 */




if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(function (err) { return console.log(err); });


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! C:\Git\webin-portal\frontend\src\main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map
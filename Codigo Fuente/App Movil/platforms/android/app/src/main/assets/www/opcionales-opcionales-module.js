(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["opcionales-opcionales-module"],{

/***/ "./src/app/opcionales/opcionales.module.ts":
/*!*************************************************!*\
  !*** ./src/app/opcionales/opcionales.module.ts ***!
  \*************************************************/
/*! exports provided: OpcionalesPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OpcionalesPageModule", function() { return OpcionalesPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _opcionales_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./opcionales.page */ "./src/app/opcionales/opcionales.page.ts");







var routes = [
    {
        path: '',
        component: _opcionales_page__WEBPACK_IMPORTED_MODULE_6__["OpcionalesPage"]
    }
];
var OpcionalesPageModule = /** @class */ (function () {
    function OpcionalesPageModule() {
    }
    OpcionalesPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["IonicModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild(routes)
            ],
            declarations: [_opcionales_page__WEBPACK_IMPORTED_MODULE_6__["OpcionalesPage"]]
        })
    ], OpcionalesPageModule);
    return OpcionalesPageModule;
}());



/***/ }),

/***/ "./src/app/opcionales/opcionales.page.html":
/*!*************************************************!*\
  !*** ./src/app/opcionales/opcionales.page.html ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\n  <ion-navbar>\n    <ion-title>\n      <img src=\"assets/img/logo.png\" width=\"30\" height=\"40\" />\n    </ion-title>\n    <button ion-button menuToggle end>\n                        <ion-icon name=\"menu\"></ion-icon>\n                    </button>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n  <form [formGroup]=\"todo\" (ngSubmit)=\"Valorar()\">\n      <p> \n          <ion-item *ngIf=\"permite_descripcion == 1\">\n              <ion-label position=\"floating\">Descripcion:</ion-label>\n              <ion-input type=\"text\" formControlName=\"descripcion\" [(ngModel)]=\"descripcion\"></ion-input>\n          </ion-item>     \n          <ion-item *ngIf=\"permite_email == 1\">\n              <ion-label position=\"floating\">e-Mail:</ion-label>\n              <ion-input type=\"text\" formControlName=\"email\" [(ngModel)]=\"email\"></ion-input>\n          </ion-item> \n          <ng-container *ngIf=\"todo.get('email').errors && todo.get('email').dirty\">\n              <p color=\"danger\" ion-text *ngIf=\"todo.get('email').hasError('pattern')\">\n                Formato: ________ @ _______\n              </p>\n          </ng-container>\n         </p>\n        </form>\n         <div *ngIf=\"permite_foto == 1\">\n            <button ion-button color=\"verdea\" icon-right full large (click)=\"tomarFoto()\">\n                <ion-icon name=\"camera\"></ion-icon>\n              </button>\n              <img  src=\"{{ foto }}\"></div>\n            \n    <button ion-button full type=\"submit\" [disabled]=\"!todo.valid\" color=\"verdea\"  (click)=\"Valorar()\">VALORAR</button>\n  \n</ion-content>\n\n<ion-footer>\n  <ion-toolbar>\n    <ion-title>Opcionales</ion-title>\n  </ion-toolbar>\n</ion-footer>\n"

/***/ }),

/***/ "./src/app/opcionales/opcionales.page.scss":
/*!*************************************************!*\
  !*** ./src/app/opcionales/opcionales.page.scss ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL29wY2lvbmFsZXMvb3BjaW9uYWxlcy5wYWdlLnNjc3MifQ== */"

/***/ }),

/***/ "./src/app/opcionales/opcionales.page.ts":
/*!***********************************************!*\
  !*** ./src/app/opcionales/opcionales.page.ts ***!
  \***********************************************/
/*! exports provided: OpcionalesPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OpcionalesPage", function() { return OpcionalesPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var OpcionalesPage = /** @class */ (function () {
    function OpcionalesPage() {
    }
    OpcionalesPage.prototype.ngOnInit = function () {
    };
    OpcionalesPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-opcionales',
            template: __webpack_require__(/*! ./opcionales.page.html */ "./src/app/opcionales/opcionales.page.html"),
            styles: [__webpack_require__(/*! ./opcionales.page.scss */ "./src/app/opcionales/opcionales.page.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], OpcionalesPage);
    return OpcionalesPage;
}());



/***/ })

}]);
//# sourceMappingURL=opcionales-opcionales-module.js.map
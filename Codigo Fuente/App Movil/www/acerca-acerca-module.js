(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["acerca-acerca-module"],{

/***/ "./src/app/acerca/acerca.module.ts":
/*!*****************************************!*\
  !*** ./src/app/acerca/acerca.module.ts ***!
  \*****************************************/
/*! exports provided: AcercaPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AcercaPageModule", function() { return AcercaPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _acerca_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./acerca.page */ "./src/app/acerca/acerca.page.ts");







var routes = [
    {
        path: '',
        component: _acerca_page__WEBPACK_IMPORTED_MODULE_6__["AcercaPage"]
    }
];
var AcercaPageModule = /** @class */ (function () {
    function AcercaPageModule() {
    }
    AcercaPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["IonicModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild(routes)
            ],
            declarations: [_acerca_page__WEBPACK_IMPORTED_MODULE_6__["AcercaPage"]]
        })
    ], AcercaPageModule);
    return AcercaPageModule;
}());



/***/ }),

/***/ "./src/app/acerca/acerca.page.html":
/*!*****************************************!*\
  !*** ./src/app/acerca/acerca.page.html ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\n  <ion-toolbar color=\"secondary\">\n    <ion-buttons slot=\"start\">\n      <ion-menu-button></ion-menu-button>\n    </ion-buttons>\n    <ion-title text-center>\n          <img src=\"assets/img/logo.png\" width=\"30\" height=\"40\" />\n    </ion-title>\n  </ion-toolbar> \n</ion-header>\n\n<ion-content padding>\n  <br/><b><i>Version: </i></b>1.0.0 beta\n  <br/><b><i>Desarrolladores: </i></b>GVR Soluciones Informaticas\n  <br/>\n  <p align=\"justify\">Esta aplicación Fue desarrollada en el marco de la cursada de la materia Laboratorio de Desarrollo de Software de la\n      carrera Analista de SIstemas </p>\n  <br/><b><i>Alumnos: </i></b><br/> -Rojas Juan<br/> -Guanuco Gustavo<br/> -Valentin Victor<br/>\n  <br/><b><i>Docentes: </i></b><br/> -Sofia Osiris<br/> -Gestos Esteban<br/> -Hallar Karim\n</ion-content>\n\n<ion-footer>\n  <ion-toolbar color=\"tertiary\">\n    <ion-title text-center color=\"light\">Acerca</ion-title>\n</ion-toolbar>\n</ion-footer>\n"

/***/ }),

/***/ "./src/app/acerca/acerca.page.scss":
/*!*****************************************!*\
  !*** ./src/app/acerca/acerca.page.scss ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2FjZXJjYS9hY2VyY2EucGFnZS5zY3NzIn0= */"

/***/ }),

/***/ "./src/app/acerca/acerca.page.ts":
/*!***************************************!*\
  !*** ./src/app/acerca/acerca.page.ts ***!
  \***************************************/
/*! exports provided: AcercaPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AcercaPage", function() { return AcercaPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var AcercaPage = /** @class */ (function () {
    function AcercaPage() {
    }
    AcercaPage.prototype.ngOnInit = function () {
    };
    AcercaPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-acerca',
            template: __webpack_require__(/*! ./acerca.page.html */ "./src/app/acerca/acerca.page.html"),
            styles: [__webpack_require__(/*! ./acerca.page.scss */ "./src/app/acerca/acerca.page.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], AcercaPage);
    return AcercaPage;
}());



/***/ })

}]);
//# sourceMappingURL=acerca-acerca-module.js.map
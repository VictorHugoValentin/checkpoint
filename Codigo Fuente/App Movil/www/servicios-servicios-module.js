(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["servicios-servicios-module"],{

/***/ "./src/app/servicios/servicios.module.ts":
/*!***********************************************!*\
  !*** ./src/app/servicios/servicios.module.ts ***!
  \***********************************************/
/*! exports provided: ServiciosPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ServiciosPageModule", function() { return ServiciosPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _servicios_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./servicios.page */ "./src/app/servicios/servicios.page.ts");







var routes = [
    {
        path: '',
        component: _servicios_page__WEBPACK_IMPORTED_MODULE_6__["ServiciosPage"]
    }
];
var ServiciosPageModule = /** @class */ (function () {
    function ServiciosPageModule() {
    }
    ServiciosPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["IonicModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild(routes)
            ],
            declarations: [_servicios_page__WEBPACK_IMPORTED_MODULE_6__["ServiciosPage"]]
        })
    ], ServiciosPageModule);
    return ServiciosPageModule;
}());



/***/ }),

/***/ "./src/app/servicios/servicios.page.html":
/*!***********************************************!*\
  !*** ./src/app/servicios/servicios.page.html ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\n  <ion-navbar>\n      <ion-title>\n          <img src=\"assets/img/logo.png\" width=\"30\" height=\"40\" />\n      </ion-title>\n      <button ion-button menuToggle end>\n                      <ion-icon name=\"menu\"></ion-icon>\n                  </button>\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n  <ion-grid>\n      <ion-row text-center>\n          <ion-col col-3 col-md-2 col-xl-2 *ngFor=\"let icono of iconos\">\n              <div class=\"image-container\" [style.background-image]=\"'url(assets/servicios/'+icono.iconoservicio+'.png)'\" (click)=\"valoraciones(icono.idservicio,icono.descripcionservicio,icono.nombreservicio,icono.iconoservicio)\"></div>\n              <div class=\"servicio\">{{icono.nombreservicio}}</div>\n          </ion-col>\n      </ion-row>\n  </ion-grid>\n</ion-content>\n\n<ion-footer>\n  <ion-toolbar>\n      <ion-title>Servicios</ion-title>\n  </ion-toolbar>\n</ion-footer>\n"

/***/ }),

/***/ "./src/app/servicios/servicios.page.scss":
/*!***********************************************!*\
  !*** ./src/app/servicios/servicios.page.scss ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3NlcnZpY2lvcy9zZXJ2aWNpb3MucGFnZS5zY3NzIn0= */"

/***/ }),

/***/ "./src/app/servicios/servicios.page.ts":
/*!*********************************************!*\
  !*** ./src/app/servicios/servicios.page.ts ***!
  \*********************************************/
/*! exports provided: ServiciosPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ServiciosPage", function() { return ServiciosPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var ServiciosPage = /** @class */ (function () {
    function ServiciosPage() {
    }
    ServiciosPage.prototype.ngOnInit = function () {
    };
    ServiciosPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-servicios',
            template: __webpack_require__(/*! ./servicios.page.html */ "./src/app/servicios/servicios.page.html"),
            styles: [__webpack_require__(/*! ./servicios.page.scss */ "./src/app/servicios/servicios.page.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], ServiciosPage);
    return ServiciosPage;
}());



/***/ })

}]);
//# sourceMappingURL=servicios-servicios-module.js.map
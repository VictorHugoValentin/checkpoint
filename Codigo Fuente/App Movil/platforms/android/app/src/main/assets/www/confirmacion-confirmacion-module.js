(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["confirmacion-confirmacion-module"],{

/***/ "./src/app/confirmacion/confirmacion.module.ts":
/*!*****************************************************!*\
  !*** ./src/app/confirmacion/confirmacion.module.ts ***!
  \*****************************************************/
/*! exports provided: ConfirmacionPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ConfirmacionPageModule", function() { return ConfirmacionPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _confirmacion_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./confirmacion.page */ "./src/app/confirmacion/confirmacion.page.ts");







var routes = [
    {
        path: '',
        component: _confirmacion_page__WEBPACK_IMPORTED_MODULE_6__["ConfirmacionPage"]
    }
];
var ConfirmacionPageModule = /** @class */ (function () {
    function ConfirmacionPageModule() {
    }
    ConfirmacionPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["IonicModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild(routes)
            ],
            declarations: [_confirmacion_page__WEBPACK_IMPORTED_MODULE_6__["ConfirmacionPage"]]
        })
    ], ConfirmacionPageModule);
    return ConfirmacionPageModule;
}());



/***/ }),

/***/ "./src/app/confirmacion/confirmacion.page.html":
/*!*****************************************************!*\
  !*** ./src/app/confirmacion/confirmacion.page.html ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\n  <ion-navbar>\n      <ion-title>\n          <img src=\"assets/img/logo.png\" width=\"30\" height=\"40\" />\n      </ion-title>\n      <button ion-button menuToggle end>\n    <ion-icon name=\"menu\"></ion-icon>\n  </button>\n  </ion-navbar>\n</ion-header>\n\n\n<ion-content padding>\n\n          <p> \n              <ion-item>\n                  <ion-thumbnail item-left *ngIf=\"foto\">\n                      <img src=\"{{ foto }}\">\n                  </ion-thumbnail>\n                  <h1>{{ servicio }}</h1>\n                  <ion-thumbnail item-left *ngIf=\"tipo == 'rango' && tipo_rango == 'emoticon'\">\n                      <div class=\"image-container\" [style.background-image]=\"'url(assets/rangos/'+valoracion+'.png)'\"></div>                 \n                  </ion-thumbnail>\n                  <ion-thumbnail item-left *ngIf=\"tipo == 'rango' && tipo_rango == 'numerico'\">\n                          <div class=\"image-container\" [style.background-image]=\"'url(assets/numeros/'+valoracion+'.png)'\"></div>                 \n                  </ion-thumbnail>\n                          <div *ngIf=\"tipo == 'rango' && tipo_rango == 'texto'\"> \n                          <h2>{{ valoracion }}</h2>\n                          </div>\n                          <div *ngIf=\"tipo == 'reclamo'\"> \n                                  <h2>{{ valoracion }}</h2>\n                          </div>\n                      \n                      \n                      <div *ngIf=\"descripcion\">\n                              <p><b>Descripcion:</b> {{descripcion}}</p>\n                          </div>     \n                          <div *ngIf=\"email\">\n                              <p><b>e-Mail:</b> {{email}}</p>\n                          </div>\n              </ion-item>\n          </p>\n  \n  <ion-grid>\n      <ion-row>\n          <ion-col col-12 col-sm>\n              <button color=\"verdea\" ion-button icon-only full large (click)=\"confirmar()\"> \n        CONFIRMAR\n        <ion-icon name=\"checkmark\"></ion-icon> \n     </button>\n          </ion-col>\n      </ion-row>\n      <ion-row>\n          <ion-col col-12 col-sm>\n              <button color=\"verdea\" ion-button icon-only full large (click)=\"cancelar()\"> \n        CANCELAR    \n        <ion-icon name=\"close\"></ion-icon>\n     </button>\n          </ion-col>\n      </ion-row>\n  </ion-grid>\n</ion-content>\n\n<ion-footer>\n  <ion-toolbar>\n      <ion-title>Confirmación</ion-title>\n  </ion-toolbar>\n</ion-footer>"

/***/ }),

/***/ "./src/app/confirmacion/confirmacion.page.scss":
/*!*****************************************************!*\
  !*** ./src/app/confirmacion/confirmacion.page.scss ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2NvbmZpcm1hY2lvbi9jb25maXJtYWNpb24ucGFnZS5zY3NzIn0= */"

/***/ }),

/***/ "./src/app/confirmacion/confirmacion.page.ts":
/*!***************************************************!*\
  !*** ./src/app/confirmacion/confirmacion.page.ts ***!
  \***************************************************/
/*! exports provided: ConfirmacionPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ConfirmacionPage", function() { return ConfirmacionPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var ConfirmacionPage = /** @class */ (function () {
    function ConfirmacionPage() {
    }
    ConfirmacionPage.prototype.ngOnInit = function () {
    };
    ConfirmacionPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-confirmacion',
            template: __webpack_require__(/*! ./confirmacion.page.html */ "./src/app/confirmacion/confirmacion.page.html"),
            styles: [__webpack_require__(/*! ./confirmacion.page.scss */ "./src/app/confirmacion/confirmacion.page.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], ConfirmacionPage);
    return ConfirmacionPage;
}());



/***/ })

}]);
//# sourceMappingURL=confirmacion-confirmacion-module.js.map
(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["valoraciones-valoraciones-module"],{

/***/ "./src/app/valoraciones/valoraciones.module.ts":
/*!*****************************************************!*\
  !*** ./src/app/valoraciones/valoraciones.module.ts ***!
  \*****************************************************/
/*! exports provided: ValoracionesPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ValoracionesPageModule", function() { return ValoracionesPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _valoraciones_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./valoraciones.page */ "./src/app/valoraciones/valoraciones.page.ts");







var routes = [
    {
        path: '',
        component: _valoraciones_page__WEBPACK_IMPORTED_MODULE_6__["ValoracionesPage"]
    }
];
var ValoracionesPageModule = /** @class */ (function () {
    function ValoracionesPageModule() {
    }
    ValoracionesPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["IonicModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild(routes)
            ],
            declarations: [_valoraciones_page__WEBPACK_IMPORTED_MODULE_6__["ValoracionesPage"]]
        })
    ], ValoracionesPageModule);
    return ValoracionesPageModule;
}());



/***/ }),

/***/ "./src/app/valoraciones/valoraciones.page.html":
/*!*****************************************************!*\
  !*** ./src/app/valoraciones/valoraciones.page.html ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\n  <ion-navbar>\n    <ion-title>\n      <img src=\"assets/img/logo.png\" width=\"30\" height=\"40\" />\n    </ion-title>\n    <button ion-button menuToggle end>\n                        <ion-icon name=\"menu\"></ion-icon>\n                    </button>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n  <ion-card>\n    <ion-card-content>\n      <ion-card-title>\n        <ion-grid>\n          <ion-row align-items-center>\n            <ion-col col-auto>\n              <img src=\"assets/servicios/{{iconoservicio}}.png\" />\n            </ion-col>\n            <ion-col col-7>\n              <h1>{{nombreservicio}}</h1>\n            </ion-col>\n          </ion-row>\n          <ion-row>\n            <ion-col col-12>\n              <p>{{descripcionservicio}}</p>\n            </ion-col>\n          </ion-row>\n        </ion-grid>\n      </ion-card-title>\n    </ion-card-content>\n  </ion-card>\n\n\n\n  <ion-list>\n    <ng-container *ngFor=\"let valor of valoraciones; let i=index\">\n    <ng-container *ngIf=\"valor.tipovaloracion == 'rango'\">\n    <ion-item text-wrap (click)=\"desplegarNivel('idx'+i)\" [ngClass]=\"{active: rangoVisible('idx'+i)}\">\n        <h1>\n          {{valor.nombrevaloracion}}\n          <ion-icon color=\"success\" item-right [name]=\"rangoVisible('idx'+i) ? 'arrow-dropdown' : 'arrow-dropright'\"></ion-icon>\n        </h1>\n      <ion-list *ngIf=\"rangoVisible('idx'+i)\">\n          <ng-container *ngIf=\"valor.tipo == 'emoticon'\"> \n              \n            <ion-grid>\n              <ion-row text-center>\n                <ion-col *ngFor=\"let subvalor of valor.subs\" text-wrap>\n                  <div class=\"image-container\" [style.background-image]=\"'url(assets/rangos/'+subvalor.valor+'.png)'\" (click)=\"valorar(valor.idvaloracion, subvalor.valor, valor.descripcion, valor.tipo)\"></div>\n                </ion-col>\n              </ion-row>\n            </ion-grid>\n        \n          </ng-container>\n          <ng-container *ngIf=\"valor.tipo == 'texto'\" text-wrap>\n              <ion-item *ngFor=\"let subvalor of valor.subs\" text-wrap (click)=\"valorar(valor.idvaloracion, subvalor.valor, valor.descripcion, valor.tipo)\" >\n            <h2>\n              {{subvalor.valor}}\n            </h2>\n            </ion-item>\n          </ng-container>\n          <ng-container *ngIf=\"valor.tipo == 'numerico'\" text-wrap>\n\n              <ion-grid>\n                  <ion-row text-center>\n                    <ion-col *ngFor=\"let subvalor of valor.subs\" text-wrap>\n                      <div class=\"image-container\" [style.background-image]=\"'url(assets/numeros/'+subvalor.valor+'.png)'\" (click)=\"valorar(valor.idvaloracion, subvalor.valor, valor.descripcion, valor.tipo)\"></div>\n                    </ion-col>\n                  </ion-row>\n                </ion-grid>\n          </ng-container>\n      </ion-list>\n    </ion-item>\n  </ng-container>\n  <!--<ng-container *ngIf=\"valor.tipovaloracion == 'reclamo'\" >-->\n    <ng-container >\n    <!--<ion-item (click)=\"reclamo(valor.idvaloracion, valor.nombrevaloracion, valor.descripcion, valor.foto, valor.email)\">-->\n    <ion-item >\n        <h1>\n            <!--{{valor.nombrevaloracion}}-->\n          </h1>\n    </ion-item>\n    </ng-container>\n  </ng-container>\n  </ion-list>\n</ion-content>\n\n<ion-footer>\n  <ion-toolbar>\n    <ion-title>Valoraciones</ion-title>\n  </ion-toolbar>\n</ion-footer>"

/***/ }),

/***/ "./src/app/valoraciones/valoraciones.page.scss":
/*!*****************************************************!*\
  !*** ./src/app/valoraciones/valoraciones.page.scss ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3ZhbG9yYWNpb25lcy92YWxvcmFjaW9uZXMucGFnZS5zY3NzIn0= */"

/***/ }),

/***/ "./src/app/valoraciones/valoraciones.page.ts":
/*!***************************************************!*\
  !*** ./src/app/valoraciones/valoraciones.page.ts ***!
  \***************************************************/
/*! exports provided: ValoracionesPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ValoracionesPage", function() { return ValoracionesPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var ValoracionesPage = /** @class */ (function () {
    function ValoracionesPage() {
    }
    ValoracionesPage.prototype.ngOnInit = function () {
    };
    ValoracionesPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-valoraciones',
            template: __webpack_require__(/*! ./valoraciones.page.html */ "./src/app/valoraciones/valoraciones.page.html"),
            styles: [__webpack_require__(/*! ./valoraciones.page.scss */ "./src/app/valoraciones/valoraciones.page.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], ValoracionesPage);
    return ValoracionesPage;
}());



/***/ })

}]);
//# sourceMappingURL=valoraciones-valoraciones-module.js.map
(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["ubmanual-ubmanual-module"],{

/***/ "./src/app/ubmanual/ubmanual.module.ts":
/*!*********************************************!*\
  !*** ./src/app/ubmanual/ubmanual.module.ts ***!
  \*********************************************/
/*! exports provided: UbmanualPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UbmanualPageModule", function() { return UbmanualPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _ubmanual_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./ubmanual.page */ "./src/app/ubmanual/ubmanual.page.ts");







var routes = [
    {
        path: '',
        component: _ubmanual_page__WEBPACK_IMPORTED_MODULE_6__["UbmanualPage"]
    }
];
var UbmanualPageModule = /** @class */ (function () {
    function UbmanualPageModule() {
    }
    UbmanualPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["IonicModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild(routes)
            ],
            declarations: [_ubmanual_page__WEBPACK_IMPORTED_MODULE_6__["UbmanualPage"]]
        })
    ], UbmanualPageModule);
    return UbmanualPageModule;
}());



/***/ }),

/***/ "./src/app/ubmanual/ubmanual.page.html":
/*!*********************************************!*\
  !*** ./src/app/ubmanual/ubmanual.page.html ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\n  <ion-toolbar color=\"secondary\">\n    <ion-buttons slot=\"start\">\n      <ion-menu-button></ion-menu-button>\n    </ion-buttons>\n    <ion-title text-center>\n          <img src=\"assets/img/logo.png\" width=\"30\" height=\"40\" />\n    </ion-title>\n  </ion-toolbar> \n</ion-header>\n\n<ion-content>\n  <ion-list>\n      <ion-item *ngFor=\"let ubicacion of ubicaciones\">\n          <div (click)=\"valoraciones(idservicio,descripcionservicio,nombreservicio,iconoservicio,ubicacion.codigoqr,ubicacion.idubicacion)\">\n              <h1>{{ubicacion.nombreubicacion}}</h1>\n          </div>\n      </ion-item>\n  </ion-list>\n</ion-content>\n\n<ion-footer>\n  <ion-toolbar color=\"tertiary\">\n      <ion-title text-center color=\"light\">Ubicación</ion-title>\n  </ion-toolbar>\n</ion-footer>\n"

/***/ }),

/***/ "./src/app/ubmanual/ubmanual.page.scss":
/*!*********************************************!*\
  !*** ./src/app/ubmanual/ubmanual.page.scss ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3VibWFudWFsL3VibWFudWFsLnBhZ2Uuc2NzcyJ9 */"

/***/ }),

/***/ "./src/app/ubmanual/ubmanual.page.ts":
/*!*******************************************!*\
  !*** ./src/app/ubmanual/ubmanual.page.ts ***!
  \*******************************************/
/*! exports provided: UbmanualPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UbmanualPage", function() { return UbmanualPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _s_qlite_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../s-qlite.service */ "./src/app/s-qlite.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");




var UbmanualPage = /** @class */ (function () {
    function UbmanualPage(sQlite, router, route) {
        this.sQlite = sQlite;
        this.router = router;
        this.route = route;
        this.descripcionservicio = this.route.snapshot.paramMap.get('descripcion');
        this.nombreservicio = this.route.snapshot.paramMap.get('nombre');
        this.iconoservicio = parseInt(this.route.snapshot.paramMap.get('icono'));
        this.idservicio = parseInt(this.route.snapshot.paramMap.get('servicio'));
        this.getUbicaciones(this.idservicio);
    }
    UbmanualPage.prototype.getUbicaciones = function (servicio) {
        var _this = this;
        if (servicio) {
            this.sQlite.getUbicaciones(servicio)
                .then(function (data) {
                return _this.ubicaciones = JSON.parse(data);
            });
        }
    };
    UbmanualPage.prototype.valoraciones = function (servicio, descripcion, nombre, icono, ubicacion, idubicacion) {
        this.router.navigate(['valoraciones',
            servicio,
            descripcion,
            nombre,
            icono,
            ubicacion,
            idubicacion]);
    };
    UbmanualPage.prototype.ngOnInit = function () {
    };
    UbmanualPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-ubmanual',
            template: __webpack_require__(/*! ./ubmanual.page.html */ "./src/app/ubmanual/ubmanual.page.html"),
            styles: [__webpack_require__(/*! ./ubmanual.page.scss */ "./src/app/ubmanual/ubmanual.page.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_s_qlite_service__WEBPACK_IMPORTED_MODULE_2__["SQliteService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"],
            _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"]])
    ], UbmanualPage);
    return UbmanualPage;
}());



/***/ })

}]);
//# sourceMappingURL=ubmanual-ubmanual-module.js.map
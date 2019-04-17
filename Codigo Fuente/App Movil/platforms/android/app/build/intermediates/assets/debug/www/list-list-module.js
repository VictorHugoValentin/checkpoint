(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["list-list-module"],{

/***/ "./src/app/list/list.module.ts":
/*!*************************************!*\
  !*** ./src/app/list/list.module.ts ***!
  \*************************************/
/*! exports provided: ListPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ListPageModule", function() { return ListPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _list_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./list.page */ "./src/app/list/list.page.ts");







var ListPageModule = /** @class */ (function () {
    function ListPageModule() {
    }
    ListPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonicModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_5__["RouterModule"].forChild([
                    {
                        path: '',
                        component: _list_page__WEBPACK_IMPORTED_MODULE_6__["ListPage"]
                    }
                ])
            ],
            declarations: [_list_page__WEBPACK_IMPORTED_MODULE_6__["ListPage"]]
        })
    ], ListPageModule);
    return ListPageModule;
}());



/***/ }),

/***/ "./src/app/list/list.page.html":
/*!*************************************!*\
  !*** ./src/app/list/list.page.html ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\n  <ion-toolbar color=\"secondary\">\n    <ion-buttons slot=\"start\">\n      <ion-menu-button></ion-menu-button>\n    </ion-buttons>\n    <ion-buttons *ngIf=\"valoraciones !=null\" slot=\"end\" color=\"secondary\" (click)=\"eliminar(-1)\">\n        <ion-icon slot=\"icon-only\" name=\"trash\"></ion-icon>\n      </ion-buttons>\n    <ion-title text-center>\n          <img src=\"assets/img/logo.png\" width=\"30\" height=\"40\" />\n    </ion-title>\n  </ion-toolbar> \n</ion-header>\n\n<ion-content>\n  <ion-list *ngIf = \"valoraciones != null\">\n      <ng-container *ngFor=\"let val of valoraciones\">\n\n        <ion-item-sliding *ngIf=\"val.tipo == 'rango' && val.tipo_rango == 'emoticon'\">\n            <ion-item >\n                <h5>{{val.servicio}}</h5> \n                <ion-thumbnail slot=\"end\">\n                <div class=\"image-container\" [style.background-image]=\"'url(assets/rangos/'+val.valoracion+'.png)'\"></div>                 \n              </ion-thumbnail>\n              </ion-item>\n            <ion-item-options side=\"end\" (click)=\"eliminar(val.idvaloracion_hecha)\">\n                <ion-item-option color=\"danger\">\n                  <ion-icon slot=\"icon-only\" name=\"trash\"></ion-icon>\n                </ion-item-option>\n            </ion-item-options>\n        </ion-item-sliding>\n\n        <ion-item-sliding *ngIf=\"val.tipo == 'rango' && val.tipo_rango == 'numerico'\">\n            <ion-item >\n                <h5>{{val.servicio}}</h5>\n                <ion-thumbnail slot=\"end\">\n                <div slot=\"end\" class=\"image-container\" [style.background-image]=\"'url(assets/numeros/'+val.valoracion+'.png)'\"></div>            \n              </ion-thumbnail>\n            </ion-item>\n            <ion-item-options side=\"end\" (click)=\"eliminar(val.idvaloracion_hecha)\">\n                <ion-item-option color=\"danger\">\n                  <ion-icon slot=\"icon-only\" name=\"trash\"></ion-icon>\n                </ion-item-option>\n            </ion-item-options>\n        </ion-item-sliding>\n\n        <ion-item-sliding *ngIf=\"val.tipo == 'rango' && val.tipo_rango == 'texto'\">\n          \n            <ion-item >\n                <ion-row>\n                    <ion-col >\n                        <ng-container *ngIf=\"val.valoracion == 1\">\n                            <h5>{{val.servicio}}: &nbsp; </h5>  <h6>MALO</h6>\n                        </ng-container>\n                        <ng-container *ngIf=\"val.valoracion == 2\">\n                            <h5>{{val.servicio}}: &nbsp; </h5>  <h6>REGULAR</h6>\n                        </ng-container>\n                        <ng-container *ngIf=\"val.valoracion == 3\">\n                            <h5>{{val.servicio}}: &nbsp; </h5>  <h6>BUENO</h6>\n                        </ng-container>\n                        <ng-container *ngIf=\"val.valoracion == 4\">\n                            <h5>{{val.servicio}}: &nbsp; </h5>  <h6>MUY BUENO</h6>\n                        </ng-container>\n                        <ng-container *ngIf=\"val.valoracion == 5\">\n                            <h5>{{val.servicio}}: &nbsp; </h5>  <h6>EXCELENTE</h6>\n                        </ng-container>\n                    </ion-col >\n                </ion-row>\n                <ion-row>\n                    <ion-col>\n                        <div>{{val.fecha}}</div>\n                    </ion-col>\n                </ion-row>\n            </ion-item>\n          \n            <ion-item-options side=\"end\" (click)=\"eliminar(val.idvaloracion_hecha)\">\n                <ion-item-option color=\"danger\">\n                  <ion-icon slot=\"icon-only\" name=\"trash\"></ion-icon>\n                </ion-item-option>\n            </ion-item-options>\n        </ion-item-sliding>\n\n        <ion-item-sliding *ngIf=\"val.tipo == 'reclamo'\">\n            <ion-item >\n                <ng-container *ngIf=\"val.estado == 'espera'\" slot=\"start\">\n                  <ion-icon name=\"checkmark\"></ion-icon>\n                </ng-container>\n                <ng-container *ngIf=\"val.estado == 'creado'\" slot=\"start\">\n                  <ion-icon name=\"alarm\"></ion-icon>\n                </ng-container>\n                <ng-container *ngIf=\"val.estado == 'terminado'\" slot=\"start\">\n                  <ion-icon name=\"done-all\"></ion-icon>\n                </ng-container>\n                <ng-container *ngIf=\"val.estado == 'vencido'\" slot=\"start\">\n                  <ion-icon name=\"close-circle-outline\"></ion-icon>\n                </ng-container>\n      \n              <h5>&nbsp;&nbsp;{{val.servicio}}: &nbsp; </h5>  <h6>{{val.valoracion}}</h6>\n                     <ion-thumbnail *ngIf = \"val.foto != ''\" slot=\"end\">\n                        <img src=\"{{val.foto}}\" >\n                    </ion-thumbnail>\n          </ion-item>\n            <ion-item-options side=\"end\" (click)=\"eliminar(val.idvaloracion_hecha)\">\n                <ion-item-option color=\"danger\">\n                  <ion-icon slot=\"icon-only\" name=\"trash\"></ion-icon>\n                </ion-item-option>\n            </ion-item-options>\n        </ion-item-sliding>\n    </ng-container>\n  </ion-list>\n</ion-content>\n\n<ion-footer>\n  <ion-toolbar color=\"tertiary\">\n      <ion-title text-center color=\"light\">Mis Valoraciones</ion-title>\n  </ion-toolbar>\n</ion-footer>\n"

/***/ }),

/***/ "./src/app/list/list.page.scss":
/*!*************************************!*\
  !*** ./src/app/list/list.page.scss ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".image-container {\n  background-size: cover;\n  min-height: 45px; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvbGlzdC9DOlxcVXNlcnNcXG1haWxvXFxEb2N1bWVudHNcXGNoZWNrcG9pbnRcXENvZGlnbyBGdWVudGVcXEFwcCBNb3ZpbC9zcmNcXGFwcFxcbGlzdFxcbGlzdC5wYWdlLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDSSxzQkFBc0I7RUFFdEIsZ0JBQWdCLEVBQUEiLCJmaWxlIjoic3JjL2FwcC9saXN0L2xpc3QucGFnZS5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmltYWdlLWNvbnRhaW5lcntcbiAgICBiYWNrZ3JvdW5kLXNpemU6IGNvdmVyO1xuXG4gICAgbWluLWhlaWdodDogNDVweDtcbn0iXX0= */"

/***/ }),

/***/ "./src/app/list/list.page.ts":
/*!***********************************!*\
  !*** ./src/app/list/list.page.ts ***!
  \***********************************/
/*! exports provided: ListPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ListPage", function() { return ListPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _my_sql_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../my-sql.service */ "./src/app/my-sql.service.ts");
/* harmony import */ var _s_qlite_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../s-qlite.service */ "./src/app/s-qlite.service.ts");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");





var ListPage = /** @class */ (function () {
    function ListPage(sqlite, mysql, alertController) {
        this.sqlite = sqlite;
        this.mysql = mysql;
        this.alertController = alertController;
        this.valoraciones = null;
        this.getEstadoValoraciones();
    }
    ListPage.prototype.ngOnInit = function () {
    };
    ListPage.prototype.getEstadoValoraciones = function () {
        var _this = this;
        this.sqlite.getIdEstados()
            .then(function (data) {
            _this.mysql.getEstadoValoraciones(data).subscribe(function (respuesta) {
                _this.sqlite.cambiarEstado(respuesta);
                _this.getMisValoraciones();
            });
        });
    };
    ListPage.prototype.getMisValoraciones = function () {
        var _this = this;
        this.sqlite.getMisValoraciones()
            .then(function (data) {
            return _this.valoraciones = JSON.parse(data);
        });
    };
    ListPage.prototype.eliminar = function (id) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var alert_1, alert_2;
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(id != -1)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.alertController.create({
                                header: 'Eliminar',
                                message: '¿Estás seguro de que deseas eliminar esta valoracion?',
                                buttons: [
                                    {
                                        text: 'No',
                                        role: 'cancelar',
                                        handler: function () {
                                        }
                                    },
                                    {
                                        text: 'Si',
                                        handler: function () {
                                            _this.sqlite.eliminarMisValoraciones(id).then(function (data) {
                                                _this.getMisValoraciones();
                                                console.log(data);
                                            });
                                        }
                                    }
                                ]
                            })];
                    case 1:
                        alert_1 = _a.sent();
                        return [4 /*yield*/, alert_1.present()];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 6];
                    case 3: return [4 /*yield*/, this.alertController.create({
                            header: 'Eliminar',
                            message: '¿Estás seguro de que deseas eliminar todas sus valoraciones?',
                            buttons: [
                                {
                                    text: 'No',
                                    role: 'cancelar',
                                    handler: function () {
                                    }
                                },
                                {
                                    text: 'Si',
                                    handler: function () {
                                        _this.sqlite.eliminarMisValoraciones(id).then(function (data) {
                                            _this.getMisValoraciones();
                                            console.log(data);
                                        });
                                    }
                                }
                            ]
                        })];
                    case 4:
                        alert_2 = _a.sent();
                        return [4 /*yield*/, alert_2.present()];
                    case 5:
                        _a.sent();
                        _a.label = 6;
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    ListPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-list',
            template: __webpack_require__(/*! ./list.page.html */ "./src/app/list/list.page.html"),
            styles: [__webpack_require__(/*! ./list.page.scss */ "./src/app/list/list.page.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_s_qlite_service__WEBPACK_IMPORTED_MODULE_3__["SQliteService"],
            _my_sql_service__WEBPACK_IMPORTED_MODULE_2__["MySqlService"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["AlertController"]])
    ], ListPage);
    return ListPage;
}());



/***/ })

}]);
//# sourceMappingURL=list-list-module.js.map
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

module.exports = "<ion-header>\n    <ion-toolbar color=\"secondary\">\n        <ion-buttons slot=\"start\">\n          <ion-menu-button></ion-menu-button>\n        </ion-buttons>\n        <ion-title text-center>\n              <img src=\"assets/img/logo.png\" width=\"30\" height=\"40\" />\n        </ion-title>\n      </ion-toolbar> \n</ion-header>\n\n\n<ion-content padding>            \n              <ion-list>\n                  <ion-item text-wrap>\n                            <ion-thumbnail slot=\"start\" *ngIf=\"foto != ''\">\n                                <img src=\"{{ foto }}\">\n                            </ion-thumbnail>\n                            <ion-thumbnail slot=\"start\" *ngIf=\"tipo == 'rango' && tipo_rango == 'emoticon'\">\n                                <div class=\"image-container\" [style.background-image]=\"'url(assets/rangos/'+valoracion+'.png)'\"></div>                 \n                            </ion-thumbnail>\n                            <ion-thumbnail slot=\"start\" *ngIf=\"tipo == 'rango' && tipo_rango == 'numerico'\">\n                                <div class=\"image-container\" [style.background-image]=\"'url(assets/numeros/'+valoracion+'.png)'\"></div>                 \n                            </ion-thumbnail>\n                            <ion-label text-wrap>\n                                    <h2>{{ servicio }}</h2>\n                                    <div *ngIf=\"tipo == 'rango' && tipo_rango == 'texto'\"> \n                                            <h4>{{ valoracion }}</h4>\n                                    </div>\n                                    <div *ngIf=\"tipo == 'reclamo'\"> \n                                            <h4>{{ valoracion }}</h4>\n                                    </div>\n                                    <h4>{{nombre_ubicacion}}</h4>\n                            </ion-label>\n                  </ion-item>\n                <ion-item text-wrap *ngIf=\"descripcion != ''\">\n                        <b>Descripcion:&nbsp;&nbsp;</b> {{descripcion}}\n                </ion-item>\n                <ion-item text-wrap *ngIf=\"email != ''\">\n                        <b>e-Mail:&nbsp;&nbsp;</b> {{email}}\n                </ion-item>\n             </ion-list>\n                  \n\n  <ion-grid>\n      <ion-row>\n          <ion-col col-12 col-sm>\n              <ion-button color=\"primary\" expand=\"full\" size=\"large\" (click)=\"confirmar()\"> \n                 CONFIRMAR\n                 <ion-icon name=\"checkmark\"></ion-icon> \n              </ion-button>\n          </ion-col>\n      </ion-row>\n      <ion-row>\n          <ion-col col-12 col-sm>\n              <ion-button color=\"primary\" expand=\"full\" size=\"large\" (click)=\"cancelar()\"> \n        CANCELAR    \n        <ion-icon name=\"close\"></ion-icon>\n     </ion-button>\n          </ion-col>\n      </ion-row>\n  </ion-grid>\n</ion-content>\n\n<ion-footer>\n  <ion-toolbar color=\"tertiary\">\n      <ion-title text-center color=\"light\">Confirmación</ion-title>\n  </ion-toolbar>\n</ion-footer>"

/***/ }),

/***/ "./src/app/confirmacion/confirmacion.page.scss":
/*!*****************************************************!*\
  !*** ./src/app/confirmacion/confirmacion.page.scss ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".image-container {\n  background-size: cover;\n  min-height: 45px; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvY29uZmlybWFjaW9uL0M6XFxVc2Vyc1xcbWFpbG9cXERvY3VtZW50c1xcY2hlY2twb2ludFxcQ29kaWdvIEZ1ZW50ZVxcQXBwIE1vdmlsL3NyY1xcYXBwXFxjb25maXJtYWNpb25cXGNvbmZpcm1hY2lvbi5wYWdlLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDSSxzQkFBc0I7RUFFdEIsZ0JBQWdCLEVBQUEiLCJmaWxlIjoic3JjL2FwcC9jb25maXJtYWNpb24vY29uZmlybWFjaW9uLnBhZ2Uuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5pbWFnZS1jb250YWluZXJ7XHJcbiAgICBiYWNrZ3JvdW5kLXNpemU6IGNvdmVyO1xyXG5cclxuICAgIG1pbi1oZWlnaHQ6IDQ1cHg7XHJcbn0iXX0= */"

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
/* harmony import */ var _my_sql_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../my-sql.service */ "./src/app/my-sql.service.ts");
/* harmony import */ var _s_qlite_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../s-qlite.service */ "./src/app/s-qlite.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ionic_native_file_ngx__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic-native/file/ngx */ "./node_modules/@ionic-native/file/ngx/index.js");






var ConfirmacionPage = /** @class */ (function () {
    function ConfirmacionPage(mysql, sqlite, router, route, file) {
        this.mysql = mysql;
        this.sqlite = sqlite;
        this.router = router;
        this.route = route;
        this.file = file;
        this.idubicacion_valoracion = parseInt(this.route.snapshot.paramMap.get('idubicacion_valoracion'));
        this.nombre_ubicacion = this.route.snapshot.paramMap.get('nombre_ubicacion');
        this.servicio = this.route.snapshot.paramMap.get('nombreservicio');
        this.valoracion = this.route.snapshot.paramMap.get('valoracion');
        this.valor = this.route.snapshot.paramMap.get('valor');
        this.foto = this.route.snapshot.paramMap.get('foto');
        this.base64Image = this.route.snapshot.paramMap.get('base64Image');
        this.email = this.route.snapshot.paramMap.get('email');
        this.descripcion = this.route.snapshot.paramMap.get('descripcion');
        this.tipo_rango = this.route.snapshot.paramMap.get('tipo_rango');
        this.tipo = this.route.snapshot.paramMap.get('tipo');
    }
    ConfirmacionPage.prototype.confirmar = function () {
        var _this = this;
        if (this.tipo == 'rango') {
            if (this.tipo_rango == 'emoticon' || this.tipo_rango == 'numerico') {
                this.valoracion_mySql = { ubicacionValoracion: this.idubicacion_valoracion,
                    descripcion: this.descripcion,
                    tipo: this.tipo,
                    valoracion: this.valor,
                    foto: this.foto,
                    email: this.email };
                this.mysql.insertarValoracion(this.valoracion_mySql).subscribe(function (data) {
                    _this.valoracion_sQlite = { idvaloracion_hecha: data[0].idValoracionHecha,
                        valoracion: _this.valoracion,
                        tipo: _this.tipo,
                        tipo_rango: _this.tipo_rango,
                        foto: _this.foto,
                        descripcion: _this.descripcion,
                        email: _this.email,
                        servicio: _this.servicio };
                    _this.sqlite.insertarValoracion(_this.valoracion_sQlite);
                    _this.router.navigate(['home']);
                });
            }
            else {
                this.valoracion_mySql = { ubicacionValoracion: this.idubicacion_valoracion,
                    descripcion: this.descripcion,
                    tipo: this.tipo,
                    valoracion: this.valor,
                    foto: this.foto,
                    email: this.email };
                this.mysql.insertarValoracion(this.valoracion_mySql).subscribe(function (data) {
                    _this.valoracion_sQlite = { idvaloracion_hecha: data[0].idValoracionHecha,
                        valoracion: _this.valor,
                        tipo: _this.tipo,
                        tipo_rango: _this.tipo_rango,
                        foto: _this.foto,
                        descripcion: _this.descripcion,
                        email: _this.email,
                        servicio: _this.servicio };
                    _this.sqlite.insertarValoracion(_this.valoracion_sQlite);
                    _this.router.navigate(['home']);
                });
            }
        }
        else {
            if (this.foto == '') {
                this.valoracion_mySql = { ubicacionValoracion: this.idubicacion_valoracion,
                    descripcion: this.descripcion,
                    tipo: this.tipo,
                    valoracion: this.valoracion,
                    foto: this.foto,
                    email: this.email };
                this.mysql.insertarValoracion(this.valoracion_mySql).subscribe(function (data) {
                    _this.valoracion_sQlite = { idvaloracion_hecha: data[0].idValoracionHecha,
                        valoracion: _this.valoracion,
                        tipo: _this.tipo,
                        tipo_rango: null,
                        foto: _this.foto,
                        descripcion: _this.descripcion,
                        email: _this.email,
                        servicio: _this.servicio };
                    _this.sqlite.insertarValoracion(_this.valoracion_sQlite);
                    _this.router.navigate(['home']);
                });
            }
            else {
                var ruta = this.base64Image.substr(0, this.base64Image.lastIndexOf('/') + 1);
                var nombre = this.base64Image.substr(this.base64Image.lastIndexOf('/') + 1);
                this.file.readAsDataURL(ruta, nombre)
                    .then(function (base64File) {
                    _this.valoracion_mySql = { ubicacionValoracion: _this.idubicacion_valoracion,
                        descripcion: _this.descripcion,
                        tipo: _this.tipo,
                        valoracion: _this.valoracion,
                        foto: base64File,
                        email: _this.email };
                    _this.mysql.insertarValoracion(_this.valoracion_mySql).subscribe(function (data) {
                        _this.valoracion_sQlite = { idvaloracion_hecha: data[0].idValoracionHecha,
                            valoracion: _this.valoracion,
                            tipo: _this.tipo,
                            tipo_rango: null,
                            foto: _this.foto,
                            descripcion: _this.descripcion,
                            email: _this.email,
                            servicio: _this.servicio };
                        _this.sqlite.insertarValoracion(_this.valoracion_sQlite);
                    });
                    _this.router.navigate(['home']);
                });
            }
        }
    };
    ConfirmacionPage.prototype.cancelar = function () {
        this.router.navigate(['home']);
    };
    ConfirmacionPage.prototype.ngOnInit = function () {
    };
    ConfirmacionPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-confirmacion',
            template: __webpack_require__(/*! ./confirmacion.page.html */ "./src/app/confirmacion/confirmacion.page.html"),
            styles: [__webpack_require__(/*! ./confirmacion.page.scss */ "./src/app/confirmacion/confirmacion.page.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_my_sql_service__WEBPACK_IMPORTED_MODULE_2__["MySqlService"],
            _s_qlite_service__WEBPACK_IMPORTED_MODULE_3__["SQliteService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"],
            _angular_router__WEBPACK_IMPORTED_MODULE_4__["ActivatedRoute"],
            _ionic_native_file_ngx__WEBPACK_IMPORTED_MODULE_5__["File"]])
    ], ConfirmacionPage);
    return ConfirmacionPage;
}());



/***/ })

}]);
//# sourceMappingURL=confirmacion-confirmacion-module.js.map
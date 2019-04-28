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

module.exports = "<ion-header>\n  <ion-toolbar color=\"secondary\">\n    <ion-buttons slot=\"start\">\n      <ion-menu-button></ion-menu-button>\n    </ion-buttons>\n    <ion-title text-center>\n          <img src=\"assets/img/logo.png\" width=\"30\" height=\"40\" />\n    </ion-title>\n  </ion-toolbar> \n</ion-header>\n\n<ion-content padding>\n  <ion-card>\n    <ion-card-content>\n      <ion-card-title>\n        <ion-grid>\n          <ion-row align-items-center>\n            <ion-col size=\"auto\">\n              <img src=\"assets/servicios/{{iconoservicio}}.png\" />\n            </ion-col>\n            <ion-col size=\"7\">\n              <h1>{{nombreservicio}}</h1>\n            </ion-col>\n          </ion-row>\n          <ion-row>\n            <ion-col size=\"12\">\n              <p>{{descripcionservicio}}</p>\n            </ion-col>\n          </ion-row>\n        </ion-grid>\n      </ion-card-title>\n    </ion-card-content>\n  </ion-card>\n\n\n\n  <ion-list>\n    <ng-container *ngFor=\"let valor of valoraciones; let i=index\">\n    <ng-container *ngIf=\"valor.tipovaloracion == 'rango'\">\n    <ion-item text-wrap (click)=\"desplegarNivel('idx'+i)\" [ngClass]=\"{active: rangoVisible('idx'+i)}\">\n        <h5>\n          {{valor.nombrevaloracion}}\n          <ion-icon color=\"success\" [name]=\"rangoVisible('idx'+i) ? 'arrow-dropdown' : 'arrow-dropright'\"></ion-icon>\n        </h5>\n    </ion-item>\n      <ion-list *ngIf=\"rangoVisible('idx'+i)\">\n          <ng-container *ngIf=\"valor.tipo == 'emoticon'\"> \n            <ion-grid>\n              <ion-row text-center>\n                <ion-col *ngFor=\"let subvalor of valor.subs\" >\n                  <div class=\"image-container\" [style.background-image]=\"'url(assets/rangos/'+subvalor.valor+'.png)'\" (click)=\"valorar(valor.idvaloracion, subvalor.valor, valor.descripcion, valor.tipo)\"></div>\n                </ion-col>\n              </ion-row>\n            </ion-grid>\n          </ng-container>\n          <ng-container *ngIf=\"valor.tipo == 'texto'\" text-wrap>\n              <ion-item *ngFor=\"let subvalor of valor.subs\" text-wrap (click)=\"valorar(valor.idvaloracion, subvalor.valor, valor.descripcion, valor.tipo)\" >\n              {{subvalor.valor}}\n            </ion-item>\n          </ng-container>\n          <ng-container *ngIf=\"valor.tipo == 'numerico'\" text-wrap>\n              <ion-grid>\n                  <ion-row text-center>\n                    <ion-col *ngFor=\"let subvalor of valor.subs\" text-wrap>\n                      <div class=\"image-container\" [style.background-image]=\"'url(assets/numeros/'+subvalor.valor+'.png)'\" (click)=\"valorar(valor.idvaloracion, subvalor.valor, valor.descripcion, valor.tipo)\"></div>\n                    </ion-col>\n                  </ion-row>\n                </ion-grid>\n          </ng-container>\n      </ion-list>\n  </ng-container>\n  <ng-container *ngIf=\"valor.tipovaloracion == 'reclamo'\" >\n    <ng-container >\n      <ion-item (click)=\"reclamo(valor.idvaloracion, valor.nombrevaloracion, valor.descripcion, valor.foto, valor.email)\">\n        <h5>\n            {{valor.nombrevaloracion}}\n          </h5>\n    </ion-item>\n    </ng-container>\n  </ng-container>\n</ng-container>\n  </ion-list>\n</ion-content>\n\n<ion-footer>\n  <ion-toolbar color=\"tertiary\">\n    <ion-title text-center color=\"light\">Valoraciones</ion-title>\n  </ion-toolbar>\n</ion-footer>"

/***/ }),

/***/ "./src/app/valoraciones/valoraciones.page.scss":
/*!*****************************************************!*\
  !*** ./src/app/valoraciones/valoraciones.page.scss ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".image-container {\n  background-size: cover;\n  min-height: 44px; }\n\np {\n  text-align: justify; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvdmFsb3JhY2lvbmVzL0M6XFxVc2Vyc1xcbWFpbG9cXERvY3VtZW50c1xcY2hlY2twb2ludFxcQ29kaWdvIEZ1ZW50ZVxcQXBwIE1vdmlsL3NyY1xcYXBwXFx2YWxvcmFjaW9uZXNcXHZhbG9yYWNpb25lcy5wYWdlLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDSSxzQkFBc0I7RUFHdEIsZ0JBQWdCLEVBQUE7O0FBRXBCO0VBQ0ksbUJBQW9CLEVBQUEiLCJmaWxlIjoic3JjL2FwcC92YWxvcmFjaW9uZXMvdmFsb3JhY2lvbmVzLnBhZ2Uuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5pbWFnZS1jb250YWluZXJ7XHJcbiAgICBiYWNrZ3JvdW5kLXNpemU6IGNvdmVyO1xyXG5cclxuICAgIC8vbWluLWhlaWdodDogMTh2aDtcclxuICAgIG1pbi1oZWlnaHQ6IDQ0cHg7XHJcbn1cclxucHtcclxuICAgIHRleHQtYWxpZ24gOiBqdXN0aWZ5O1xyXG59Il19 */"

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
/* harmony import */ var _s_qlite_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../s-qlite.service */ "./src/app/s-qlite.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");




var ValoracionesPage = /** @class */ (function () {
    function ValoracionesPage(sqlite, router, route) {
        this.sqlite = sqlite;
        this.router = router;
        this.route = route;
        this.mostrarRango = null;
        this.ubicacion = this.route.snapshot.paramMap.get('ubicacion');
        this.descripcionservicio = this.route.snapshot.paramMap.get('descripcion');
        this.nombreservicio = this.route.snapshot.paramMap.get('nombre');
        this.iconoservicio = parseInt(this.route.snapshot.paramMap.get('icono'));
        this.getValoraciones(parseInt(this.route.snapshot.paramMap.get('servicio')), this.ubicacion);
    }
    ValoracionesPage.prototype.desplegarNivel = function (idx) {
        if (this.rangoVisible(idx)) {
            this.mostrarRango = null;
        }
        else {
            this.mostrarRango = idx;
        }
    };
    ;
    ValoracionesPage.prototype.rangoVisible = function (idx) {
        return this.mostrarRango === idx;
    };
    ;
    ValoracionesPage.prototype.getValoraciones = function (servicio, ubicacion) {
        var _this = this;
        this.sqlite.getValoraciones(servicio, ubicacion).then(function (data) {
            _this.valoraciones = JSON.parse(data);
        });
    };
    ValoracionesPage.prototype.reclamo = function (idvaloracion, valor, permite_descripcion, permite_foto, permite_email) {
        var _this = this;
        this.sqlite.getIdUbicacionValoracion(this.ubicacion, idvaloracion).then(function (data) {
            _this.idubicacion_valoracion = data;
            _this.sqlite.getNombreUbicacion(_this.ubicacion).then(function (data) {
                _this.nombre_ubicacion = data;
                if (permite_descripcion == 1 || permite_foto == 1 || permite_email == 1) {
                    _this.router.navigate(['opcionales',
                        valor,
                        'null',
                        'reclamo',
                        permite_descripcion,
                        permite_foto,
                        permite_email,
                        _this.idubicacion_valoracion,
                        'null',
                        _this.nombre_ubicacion,
                        _this.nombreservicio]);
                }
                else {
                    _this.router.navigate(['confirmacion',
                        valor,
                        'null',
                        'reclamo',
                        _this.idubicacion_valoracion,
                        _this.nombreservicio,
                        'null',
                        _this.nombre_ubicacion,
                        '',
                        '',
                        '',
                        '']);
                }
            });
        });
    };
    ValoracionesPage.prototype.valorar = function (idvaloracion, valoracion, permite_descripcion, tipo_rango) {
        var _this = this;
        var valor;
        switch (valoracion) {
            case "Malo":
            case "e1":
            case "1":
                valor = 1;
                break;
            case "Regular":
            case "e2":
            case "2":
                valor = 2;
                break;
            case "Bueno":
            case "e3":
            case "3":
                valor = 3;
                break;
            case "Muy Bueno":
            case "e4":
            case "4":
                valor = 4;
                break;
            case "Excelente":
            case "e5":
            case "5":
                valor = 5;
                break;
        }
        this.sqlite.getIdUbicacionValoracion(this.ubicacion, idvaloracion).then(function (data) {
            _this.idubicacion_valoracion = data;
            _this.sqlite.getNombreUbicacion(_this.ubicacion).then(function (data) {
                _this.nombre_ubicacion = data;
                console.log("PERMITE DESCRIPCION: " + permite_descripcion);
                if (permite_descripcion == 1) {
                    _this.router.navigate(['opcionales',
                        valoracion,
                        valor,
                        'rango',
                        1,
                        0,
                        0,
                        _this.idubicacion_valoracion,
                        tipo_rango,
                        _this.nombre_ubicacion,
                        _this.nombreservicio]);
                }
                else {
                    _this.router.navigate(['confirmacion',
                        valoracion,
                        valor,
                        'rango',
                        _this.idubicacion_valoracion,
                        _this.nombreservicio,
                        tipo_rango,
                        _this.nombre_ubicacion,
                        '',
                        '',
                        '',
                        '']);
                }
            });
        });
    };
    ValoracionesPage.prototype.ngOnInit = function () {
    };
    ValoracionesPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-valoraciones',
            template: __webpack_require__(/*! ./valoraciones.page.html */ "./src/app/valoraciones/valoraciones.page.html"),
            styles: [__webpack_require__(/*! ./valoraciones.page.scss */ "./src/app/valoraciones/valoraciones.page.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_s_qlite_service__WEBPACK_IMPORTED_MODULE_2__["SQliteService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"],
            _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"]])
    ], ValoracionesPage);
    return ValoracionesPage;
}());



/***/ })

}]);
//# sourceMappingURL=valoraciones-valoraciones-module.js.map
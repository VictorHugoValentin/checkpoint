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

module.exports = "<ion-header>\n  <ion-toolbar color=\"secondary\">\n    <ion-buttons slot=\"start\">\n      <ion-menu-button></ion-menu-button>\n    </ion-buttons>\n    <ion-title text-center>\n          <img src=\"assets/img/logo.png\" width=\"30\" height=\"40\" />\n    </ion-title>\n  </ion-toolbar> \n</ion-header>\n\n<ion-content>\n  <ion-grid>\n      <ion-row text-center>\n          <ion-col size=\"3\" *ngFor=\"let icono of iconos\">\n              <div class=\"image-container\" [style.background-image]=\"'url(assets/servicios/'+icono.iconoservicio+'.png)'\" (click)=\"valoraciones(icono.idservicio,icono.descripcionservicio,icono.nombreservicio,icono.iconoservicio)\"></div>\n              <div class=\"servicio\">{{icono.nombreservicio}}</div>\n          </ion-col>\n      </ion-row>\n  </ion-grid>\n</ion-content>\n\n<ion-footer>\n  <ion-toolbar color=\"tertiary\">\n      <ion-title text-center color=\"light\">Servicios</ion-title>\n  </ion-toolbar>\n</ion-footer>\n"

/***/ }),

/***/ "./src/app/servicios/servicios.page.scss":
/*!***********************************************!*\
  !*** ./src/app/servicios/servicios.page.scss ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".image-container {\n  background-size: cover;\n  min-height: 75px; }\n\n.servicio {\n  color: #3D3327;\n  font-style: italic; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvc2VydmljaW9zL0M6XFxVc2Vyc1xcbWFpbG9cXERvY3VtZW50c1xcY2hlY2twb2ludFxcQ29kaWdvIEZ1ZW50ZVxcQXBwIE1vdmlsL3NyY1xcYXBwXFxzZXJ2aWNpb3NcXHNlcnZpY2lvcy5wYWdlLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDSSxzQkFBc0I7RUFDdEIsZ0JBQWdCLEVBQUE7O0FBR3BCO0VBQ0ksY0FBYztFQUNkLGtCQUFrQixFQUFBIiwiZmlsZSI6InNyYy9hcHAvc2VydmljaW9zL3NlcnZpY2lvcy5wYWdlLnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuaW1hZ2UtY29udGFpbmVye1xyXG4gICAgYmFja2dyb3VuZC1zaXplOiBjb3ZlcjtcclxuICAgIG1pbi1oZWlnaHQ6IDc1cHg7XHJcbn1cclxuXHJcbi5zZXJ2aWNpb3tcclxuICAgIGNvbG9yOiAjM0QzMzI3O1xyXG4gICAgZm9udC1zdHlsZTogaXRhbGljOyBcclxufSJdfQ== */"

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
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _s_qlite_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../s-qlite.service */ "./src/app/s-qlite.service.ts");




var ServiciosPage = /** @class */ (function () {
    function ServiciosPage(route, sQlite, router) {
        var _this = this;
        this.route = route;
        this.sQlite = sQlite;
        this.router = router;
        this.sQlite.getDatabaseState().subscribe(function (rdy) {
            if (rdy) {
                _this.ubicacion = _this.route.snapshot.paramMap.get('ubicacion');
                if (_this.ubicacion == "ninguno") {
                    _this.cargarIconos(null);
                }
                else {
                    _this.cargarIconos(_this.ubicacion);
                }
            }
        });
    }
    ServiciosPage.prototype.cargarIconos = function (ubicacion) {
        var _this = this;
        this.sQlite.getServicios(ubicacion)
            .then(function (data) {
            return _this.iconos = JSON.parse(data);
        });
    };
    ServiciosPage.prototype.valoraciones = function (servicio, descripcion, nombre, icono) {
        var _this = this;
        if (this.ubicacion != "ninguno") {
            this.sQlite.getIdUbicacion(this.ubicacion).then(function (data) {
                _this.router.navigate(['valoraciones',
                    servicio,
                    descripcion,
                    nombre,
                    icono,
                    _this.ubicacion,
                    data]);
            });
        }
        else {
            this.router.navigate(['ubmanual',
                servicio,
                descripcion,
                nombre,
                icono]);
        }
    };
    ServiciosPage.prototype.ngOnInit = function () {
    };
    ServiciosPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-servicios',
            template: __webpack_require__(/*! ./servicios.page.html */ "./src/app/servicios/servicios.page.html"),
            styles: [__webpack_require__(/*! ./servicios.page.scss */ "./src/app/servicios/servicios.page.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"],
            _s_qlite_service__WEBPACK_IMPORTED_MODULE_3__["SQliteService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"]])
    ], ServiciosPage);
    return ServiciosPage;
}());



/***/ })

}]);
//# sourceMappingURL=servicios-servicios-module.js.map
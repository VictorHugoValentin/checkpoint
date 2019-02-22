webpackJsonp([0],{

/***/ 587:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UbManualPageModule", function() { return UbManualPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ub_manual__ = __webpack_require__(589);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var UbManualPageModule = (function () {
    function UbManualPageModule() {
    }
    return UbManualPageModule;
}());
UbManualPageModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["L" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__ub_manual__["a" /* UbManualPage */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__ub_manual__["a" /* UbManualPage */]),
        ],
    })
], UbManualPageModule);

//# sourceMappingURL=ub-manual.module.js.map

/***/ }),

/***/ 589:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UbManualPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_database_database__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__valoraciones_valoraciones__ = __webpack_require__(79);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var UbManualPage = (function () {
    function UbManualPage(navCtrl, navParams, databaseProvider) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.databaseProvider = databaseProvider;
        this.descripcionservicio = this.navParams.get('descripcion');
        this.nombreservicio = this.navParams.get('nombreservicio');
        this.iconoservicio = this.navParams.get('iconoservicio');
        this.idservicio = this.navParams.get('idservicio');
        this.getUbicaciones(this.idservicio);
    }
    UbManualPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad UbManualPage');
    };
    UbManualPage.prototype.getUbicaciones = function (servicio) {
        var _this = this;
        this.databaseProvider.getUbicaciones(servicio).then(function (data) {
            _this.ubicaciones = JSON.parse(data);
        });
    };
    UbManualPage.prototype.valoraciones = function (servicio, descripcion, nombre, icono, ubicacion) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__valoraciones_valoraciones__["a" /* ValoracionesPage */], {
            idservicio: servicio,
            iconoservicio: icono,
            nombreservicio: nombre,
            descripcion: descripcion,
            ubicacion: ubicacion
        });
    };
    return UbManualPage;
}());
UbManualPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-ub-manual',template:/*ion-inline-start:"C:\Users\mailo\Documents\checkpoint\Codigo Fuente\App Movil\src\pages\ub-manual\ub-manual.html"*/'<ion-header>\n    <ion-navbar>\n        <ion-title>\n            <img src="assets/img/logo.png" width="30" height="40" />\n        </ion-title>\n        <button ion-button menuToggle end>\n                        <ion-icon name="menu"></ion-icon>\n                    </button>\n    </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n    <ion-list>\n        <ion-item *ngFor="let ubicacion of ubicaciones">\n          <div (click)="valoraciones(idservicio,descripcionservicio,nombreservicio,iconoservicio,ubicacion.idubicacion)">\n            <h1>{{ubicacion.nombreubicacion}}</h1>\n          </div>\n        </ion-item>\n      </ion-list>\n    </ion-content>\n</ion-content>\n\n<ion-footer>\n    <ion-toolbar>\n        <ion-title>Ubicación</ion-title>\n    </ion-toolbar>\n</ion-footer>'/*ion-inline-end:"C:\Users\mailo\Documents\checkpoint\Codigo Fuente\App Movil\src\pages\ub-manual\ub-manual.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_2__providers_database_database__["a" /* DatabaseProvider */]])
], UbManualPage);

//# sourceMappingURL=ub-manual.js.map

/***/ })

});
//# sourceMappingURL=0.js.map
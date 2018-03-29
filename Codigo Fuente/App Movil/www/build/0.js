webpackJsonp([0],{

/***/ 583:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UbManualPageModule", function() { return UbManualPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ub_manual__ = __webpack_require__(587);
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

/***/ 587:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UbManualPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(22);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/**
 * Generated class for the UbManualPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var UbManualPage = (function () {
    function UbManualPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    UbManualPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad UbManualPage');
    };
    return UbManualPage;
}());
UbManualPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-ub-manual',template:/*ion-inline-start:"C:\Users\mailo\Desktop\Appcheck\lectoQR2\src\pages\ub-manual\ub-manual.html"*/`<ion-header>\n    <ion-navbar>\n        <ion-title>\n            <img src="assets/img/logo.png" width="30" height="40" />\n        </ion-title>\n        <button ion-button menuToggle end>\n                        <ion-icon name="menu"></ion-icon>\n                    </button>\n    </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n\n</ion-content>\n\n<ion-footer>\n    <ion-toolbar>\n        <ion-title>Ubicación</ion-title>\n    </ion-toolbar>\n</ion-footer>`/*ion-inline-end:"C:\Users\mailo\Desktop\Appcheck\lectoQR2\src\pages\ub-manual\ub-manual.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */]])
], UbManualPage);

//# sourceMappingURL=ub-manual.js.map

/***/ })

});
//# sourceMappingURL=0.js.map
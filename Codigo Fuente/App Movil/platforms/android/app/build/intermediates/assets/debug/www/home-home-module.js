(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["home-home-module"],{

/***/ "./src/app/home/home.module.ts":
/*!*************************************!*\
  !*** ./src/app/home/home.module.ts ***!
  \*************************************/
/*! exports provided: HomePageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HomePageModule", function() { return HomePageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _home_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./home.page */ "./src/app/home/home.page.ts");







var HomePageModule = /** @class */ (function () {
    function HomePageModule() {
    }
    HomePageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonicModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_5__["RouterModule"].forChild([
                    {
                        path: '',
                        component: _home_page__WEBPACK_IMPORTED_MODULE_6__["HomePage"]
                    }
                ])
            ],
            declarations: [_home_page__WEBPACK_IMPORTED_MODULE_6__["HomePage"]]
        })
    ], HomePageModule);
    return HomePageModule;
}());



/***/ }),

/***/ "./src/app/home/home.page.html":
/*!*************************************!*\
  !*** ./src/app/home/home.page.html ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\n  <ion-toolbar color=\"secondary\">\n        <ion-buttons slot=\"start\">\n          <ion-menu-button></ion-menu-button>\n        </ion-buttons>\n        <ion-title text-center>\n              <img src=\"assets/img/logo.png\" width=\"30\" height=\"40\" />\n        </ion-title>\n      </ion-toolbar> \n</ion-header>\n\n<ion-content padding>\n<ion-grid>\n <ion-row text-center>\n    <br/><b><i>Bienvenido</i></b><br/>\n </ion-row>\n <ion-row>\n    <p align=\"justify\">Esta aplicación le permitira valorar los servicios brindados por la Unidad Academica Rio Gallegos\n                            de Universidad Nacional de la Patagonia Austral\n    </p><br/>\n </ion-row>\n <ion-row>\n    <br/>\n </ion-row>\n <ion-row>\n    <br/>\n </ion-row>\n <ion-row>\n    <br/>\n </ion-row>\n <ion-row>\n    <br/>\n </ion-row>\n <ion-row>\n    <br/>\n </ion-row>\n <ion-row>\n    <br/>\n </ion-row>\n <ion-row>\n    <br/>\n </ion-row>\n <ion-row>\n    <br/>\n </ion-row>\n <ion-row>\n    <ion-col col-12 col-sm>\n       <ion-button color=\"primary\" expand=\"full\" size=\"large\" (click)=\"servicios(null)\"> \n          Acceso Manual\n          <ion-icon name=\"hand\"></ion-icon> \n       </ion-button>\n    </ion-col>\n </ion-row>\n <ion-row>\n    <ion-col col-12 col-sm>\n       <ion-button color=\"primary\" expand=\"full\" size=\"large\" (click)=\"scanCode()\"> \n          Codigo QR     \n          <ion-icon name=\"expand\"></ion-icon>\n       </ion-button>\n    </ion-col>\n  </ion-row>\n</ion-grid>\n</ion-content>\n\n<ion-footer>\n<ion-toolbar color=\"tertiary\">\n  <ion-title text-center><img src=\"assets/img/logoinf.png\" width=\"110\" height=\"20\" /></ion-title>\n</ion-toolbar>\n</ion-footer>"

/***/ }),

/***/ "./src/app/home/home.page.scss":
/*!*************************************!*\
  !*** ./src/app/home/home.page.scss ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".welcome-card ion-img {\n  max-height: 35vh;\n  overflow: hidden; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvaG9tZS9DOlxcVXNlcnNcXG1haWxvXFxEb2N1bWVudHNcXGNoZWNrcG9pbnRcXENvZGlnbyBGdWVudGVcXEFwcCBNb3ZpbC9zcmNcXGFwcFxcaG9tZVxcaG9tZS5wYWdlLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxnQkFBZ0I7RUFDaEIsZ0JBQWdCLEVBQUEiLCJmaWxlIjoic3JjL2FwcC9ob21lL2hvbWUucGFnZS5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLndlbGNvbWUtY2FyZCBpb24taW1nIHtcbiAgbWF4LWhlaWdodDogMzV2aDtcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcbn1cbiJdfQ== */"

/***/ }),

/***/ "./src/app/home/home.page.ts":
/*!***********************************!*\
  !*** ./src/app/home/home.page.ts ***!
  \***********************************/
/*! exports provided: HomePage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HomePage", function() { return HomePage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _ionic_native_barcode_scanner_ngx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic-native/barcode-scanner/ngx */ "./node_modules/@ionic-native/barcode-scanner/ngx/index.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");




var HomePage = /** @class */ (function () {
    function HomePage(barcodeScanner, router) {
        this.barcodeScanner = barcodeScanner;
        this.router = router;
    }
    HomePage.prototype.scanCode = function () {
        var _this = this;
        //Options
        this.options = {
            showTorchButton: true,
            showFlipCameraButton: true,
            formats: "QR_CODE",
            resultDisplayDuration: 100,
            prompt: "Escanee el codigoQR"
        };
        this.barcodeScanner.scan(this.options).then(function (barcodeData) {
            if (barcodeData.text != '') {
                _this.servicios(barcodeData.text);
            }
        }, function (err) {
            console.log(err);
        });
    };
    HomePage.prototype.servicios = function (ubicacion) {
        console.log("UBICACION: " + ubicacion);
        if (ubicacion == null) {
            ubicacion = "ninguno";
        }
        this.router.navigate(['servicios', ubicacion]);
    };
    HomePage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-home',
            template: __webpack_require__(/*! ./home.page.html */ "./src/app/home/home.page.html"),
            styles: [__webpack_require__(/*! ./home.page.scss */ "./src/app/home/home.page.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_ionic_native_barcode_scanner_ngx__WEBPACK_IMPORTED_MODULE_2__["BarcodeScanner"],
            _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"]])
    ], HomePage);
    return HomePage;
}());



/***/ })

}]);
//# sourceMappingURL=home-home-module.js.map
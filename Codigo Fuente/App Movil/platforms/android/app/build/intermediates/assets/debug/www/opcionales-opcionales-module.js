(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["opcionales-opcionales-module"],{

/***/ "./src/app/opcionales/opcionales.module.ts":
/*!*************************************************!*\
  !*** ./src/app/opcionales/opcionales.module.ts ***!
  \*************************************************/
/*! exports provided: OpcionalesPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OpcionalesPageModule", function() { return OpcionalesPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _opcionales_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./opcionales.page */ "./src/app/opcionales/opcionales.page.ts");







var routes = [
    {
        path: '',
        component: _opcionales_page__WEBPACK_IMPORTED_MODULE_6__["OpcionalesPage"]
    }
];
var OpcionalesPageModule = /** @class */ (function () {
    function OpcionalesPageModule() {
    }
    OpcionalesPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["ReactiveFormsModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["IonicModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild(routes)
            ],
            declarations: [_opcionales_page__WEBPACK_IMPORTED_MODULE_6__["OpcionalesPage"]]
        })
    ], OpcionalesPageModule);
    return OpcionalesPageModule;
}());



/***/ }),

/***/ "./src/app/opcionales/opcionales.page.html":
/*!*************************************************!*\
  !*** ./src/app/opcionales/opcionales.page.html ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\n  <ion-toolbar color=\"secondary\">\n    <ion-buttons slot=\"start\">\n      <ion-menu-button></ion-menu-button>\n    </ion-buttons>\n    <ion-title text-center>\n          <img src=\"assets/img/logo.png\" width=\"30\" height=\"40\" />\n    </ion-title>\n  </ion-toolbar> \n</ion-header>\n\n<ion-content padding>\n  <form [formGroup]=\"todo\" (ngSubmit)=\"Valorar()\">\n      <p> \n          <ion-item *ngIf=\"permite_descripcion == 1\">\n              <ion-label position=\"floating\">Descripcion:</ion-label>\n              <ion-input type=\"text\" formControlName=\"descripcion\" [(ngModel)]=\"descripcion\"></ion-input>\n          </ion-item>     \n          <ion-item *ngIf=\"permite_email == 1\">\n              <ion-label position=\"floating\">e-Mail:</ion-label>\n              <ion-input type=\"text\" formControlName=\"email\" [(ngModel)]=\"email\"></ion-input>\n          </ion-item> \n          <ng-container *ngIf=\"todo.get('email').errors && todo.get('email').dirty\">\n              <p color=\"danger\" ion-text *ngIf=\"todo.get('email').hasError('pattern')\">\n                Formato: ________ @ _______\n              </p>\n          </ng-container>\n         </p>\n        </form>\n         <div *ngIf=\"permite_foto == 1\">\n            <ion-button color=\"primary\" expand=\"full\" size=\"large\"  icon-right (click)=\"tomarFoto()\">\n                <ion-icon name=\"camera\"></ion-icon>\n              </ion-button>\n              <img  src=\"{{ foto }}\"></div>\n            \n    <ion-button color=\"primary\" expand=\"full\" size=\"large\"  type=\"submit\" [disabled]=\"!todo.valid\"  (click)=\"Valorar()\">VALORAR</ion-button>\n  \n</ion-content>\n\n<ion-footer>\n  <ion-toolbar color=\"tertiary\">\n    <ion-title text-center color=\"light\">Opcionales</ion-title>\n  </ion-toolbar>\n</ion-footer>\n"

/***/ }),

/***/ "./src/app/opcionales/opcionales.page.scss":
/*!*************************************************!*\
  !*** ./src/app/opcionales/opcionales.page.scss ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".term {\n  padding-top: 20px; }\n\n.terms-checkbox-label {\n  overflow: visible;\n  text-overflow: initial;\n  white-space: initial;\n  opacity: 0.5;\n  font-size: 14px;\n  font-weight: bold; }\n\n.alert {\n  color: red; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvb3BjaW9uYWxlcy9DOlxcVXNlcnNcXG1haWxvXFxEb2N1bWVudHNcXGNoZWNrcG9pbnRcXENvZGlnbyBGdWVudGVcXEFwcCBNb3ZpbC9zcmNcXGFwcFxcb3BjaW9uYWxlc1xcb3BjaW9uYWxlcy5wYWdlLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFFUSxpQkFBaUIsRUFBQTs7QUFHbkI7RUFFRSxpQkFBaUI7RUFDakIsc0JBQXNCO0VBQ3RCLG9CQUFvQjtFQUNwQixZQUFZO0VBQ1osZUFBZTtFQUNmLGlCQUFpQixFQUFBOztBQUduQjtFQUVFLFVBQVUsRUFBQSIsImZpbGUiOiJzcmMvYXBwL29wY2lvbmFsZXMvb3BjaW9uYWxlcy5wYWdlLnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIudGVybVxyXG4gICAgICB7XHJcbiAgICAgICAgcGFkZGluZy10b3A6IDIwcHg7XHJcbiAgICAgIH1cclxuICAgICBcclxuICAgICAgLnRlcm1zLWNoZWNrYm94LWxhYmVsXHJcbiAgICAgIHtcclxuICAgICAgICBvdmVyZmxvdzogdmlzaWJsZTtcclxuICAgICAgICB0ZXh0LW92ZXJmbG93OiBpbml0aWFsO1xyXG4gICAgICAgIHdoaXRlLXNwYWNlOiBpbml0aWFsO1xyXG4gICAgICAgIG9wYWNpdHk6IDAuNTtcclxuICAgICAgICBmb250LXNpemU6IDE0cHg7XHJcbiAgICAgICAgZm9udC13ZWlnaHQ6IGJvbGQ7XHJcbiAgICAgIH1cclxuICAgICBcclxuICAgICAgLmFsZXJ0XHJcbiAgICAgIHtcclxuICAgICAgICBjb2xvcjogcmVkO1xyXG4gICAgICB9Il19 */"

/***/ }),

/***/ "./src/app/opcionales/opcionales.page.ts":
/*!***********************************************!*\
  !*** ./src/app/opcionales/opcionales.page.ts ***!
  \***********************************************/
/*! exports provided: OpcionalesPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OpcionalesPage", function() { return OpcionalesPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _my_sql_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../my-sql.service */ "./src/app/my-sql.service.ts");
/* harmony import */ var _ionic_native_camera_ngx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ionic-native/camera/ngx */ "./node_modules/@ionic-native/camera/ngx/index.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ionic_native_ionic_webview_ngx__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ionic-native/ionic-webview/ngx */ "./node_modules/@ionic-native/ionic-webview/ngx/index.js");







var OpcionalesPage = /** @class */ (function () {
    function OpcionalesPage(camara, mysql, formBuilder, router, route, webview) {
        this.camara = camara;
        this.mysql = mysql;
        this.formBuilder = formBuilder;
        this.router = router;
        this.route = route;
        this.webview = webview;
        this.base64Image = null;
        this.foto = null;
        this.todo = this.formBuilder.group({
            descripcion: [''],
            email: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].compose([
                    _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
                ])],
        });
        this.email = null;
        this.descripcion = null;
        this.nombreValoracion = this.route.snapshot.paramMap.get('valoracion');
        this.valor = parseInt(this.route.snapshot.paramMap.get('valor'));
        this.nombreServicio = this.route.snapshot.paramMap.get('nombreservicio');
        this.idubicacion_valoracion = parseInt(this.route.snapshot.paramMap.get('idubicacion_valoracion'));
        this.nombre_ubicacion = this.route.snapshot.paramMap.get('nombre_ubicacion');
        this.tipo = this.route.snapshot.paramMap.get('tipo');
        this.tipo_rango = this.route.snapshot.paramMap.get('tipo_rango');
        this.permite_descripcion = parseInt(this.route.snapshot.paramMap.get('permite_descripcion'));
        this.permite_foto = parseInt(this.route.snapshot.paramMap.get('permite_foto'));
        this.permite_email = parseInt(this.route.snapshot.paramMap.get('permite_email'));
    }
    OpcionalesPage.prototype.tomarFoto = function () {
        var _this = this;
        var options = {
            quality: 30,
            correctOrientation: true,
            targetWidth: 600,
            targetHeight: 600,
            destinationType: this.camara.DestinationType.FILE_URI,
            encodingType: this.camara.EncodingType.JPEG,
            mediaType: this.camara.MediaType.PICTURE
        };
        this.camara.getPicture(options).then(function (imageData) {
            _this.foto = _this.webview.convertFileSrc(imageData);
            _this.base64Image = imageData;
        });
    };
    OpcionalesPage.prototype.Valorar = function () {
        if (this.tipo == 'rango') {
            if (this.descripcion == null) {
                this.descripcion = '';
            }
            this.router.navigate(['confirmacion',
                this.nombreValoracion,
                this.valor,
                this.tipo,
                this.idubicacion_valoracion,
                this.nombreServicio,
                this.tipo_rango,
                this.nombre_ubicacion,
                '',
                '',
                '',
                this.descripcion]);
        }
        else {
            if (this.foto == null) {
                this.foto = '';
            }
            if (this.base64Image == null) {
                this.base64Image = '';
            }
            if (this.email == null) {
                this.email = '';
            }
            if (this.descripcion == null) {
                this.descripcion = '';
            }
            this.router.navigate(['confirmacion',
                this.nombreValoracion,
                'null',
                this.tipo,
                this.idubicacion_valoracion,
                this.nombreServicio,
                'null',
                this.nombre_ubicacion,
                this.foto,
                this.base64Image,
                this.email,
                this.descripcion]);
        }
    };
    OpcionalesPage.prototype.ngOnInit = function () {
    };
    OpcionalesPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-opcionales',
            template: __webpack_require__(/*! ./opcionales.page.html */ "./src/app/opcionales/opcionales.page.html"),
            styles: [__webpack_require__(/*! ./opcionales.page.scss */ "./src/app/opcionales/opcionales.page.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_ionic_native_camera_ngx__WEBPACK_IMPORTED_MODULE_3__["Camera"],
            _my_sql_service__WEBPACK_IMPORTED_MODULE_2__["MySqlService"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormBuilder"],
            _angular_router__WEBPACK_IMPORTED_MODULE_5__["Router"],
            _angular_router__WEBPACK_IMPORTED_MODULE_5__["ActivatedRoute"],
            _ionic_native_ionic_webview_ngx__WEBPACK_IMPORTED_MODULE_6__["WebView"]])
    ], OpcionalesPage);
    return OpcionalesPage;
}());



/***/ })

}]);
//# sourceMappingURL=opcionales-opcionales-module.js.map
webpackJsonp([6],{

/***/ 103:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Sqlite; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ionic_angular__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_native_sqlite_porter__ = __webpack_require__(190);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_storage__ = __webpack_require__(194);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_http__ = __webpack_require__(102);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_sqlite__ = __webpack_require__(105);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_Rx__ = __webpack_require__(297);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_rxjs_Rx__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var Sqlite = (function () {
    function Sqlite(http, sqlitePorter, storage, sqlite, platform) {
        var _this = this;
        this.http = http;
        this.sqlitePorter = sqlitePorter;
        this.storage = storage;
        this.sqlite = sqlite;
        this.platform = platform;
        this.dbLista = new __WEBPACK_IMPORTED_MODULE_6_rxjs_Rx__["BehaviorSubject"](false);
        this.platform.ready().then(function () {
            _this.sqlite.create({
                name: 'datos.db',
                location: 'default'
            })
                .then(function (db) {
                _this.database = db;
                _this.storage.get('database_filled').then(function (val) {
                    if (val) {
                        _this.dbLista.next(true);
                    }
                    else {
                        _this.fillDataBase();
                    }
                });
            });
        });
    }
    Sqlite.prototype.fillDataBase = function () {
        var _this = this;
        this.http.get('assets/localstoragesqlite.sql')
            .map(function (res) { return res.text(); })
            .subscribe(function (sql) {
            _this.sqlitePorter.importSqlToDb(_this.database, sql)
                .then(function (data) {
                _this.dbLista.next(true);
                _this.storage.set('database_filled', true);
            })
                .catch(function (e) { return console.log(e); });
        });
    };
    Sqlite.prototype.getEstadoDB = function () {
        return this.dbLista.asObservable();
    };
    /*
      cargarDatos(idservicio: number, nombreservicio: string, iconoservicio: number, nombrevaloracion: string){
        return new Promise ((resolve, reject) => {
          let sql = "INSERT INTO datoslocales (idservicio, nombreservicio, iconoservicio, nombrevaloracion) VALUES (?,?,?,?)";
          this.db.executeSql(sql, [idservicio, nombreservicio, iconoservicio, nombrevaloracion]).then((data) => {
            resolve(data);
          }, (error) => {
            reject(error);
          });
        });
      }
    
      getServicios(){
        return new Promise ((resolve, reject) => {
          let sql = "SELECT iconoservicio FROM  datoslocales";
          this.db.executeSql(sql, []).then((data) => {
            let arrayServicios = [];
            if(data.rows.length>0){
              for(var i = 0; i<data.rows.length; i++){
                arrayServicios.push({
                  iconoservicio: data.rows.item(i).iconoservicio
                });
              }
            }
            resolve(arrayServicios);
          }, (error) => {
            reject(error);
          });
        });
      }
      setDatabase(db: SQLiteObject){
        if(this.db === null){
          this.db = db;
        }
      }
    
      createTable(){
        return this.db.executeSql("CREATE TABLE datoslocales(id INTEGER PRIMARY KEY AUTOINCREMENT, idservicio TEXT, nombreservicio TEXT, iconoservicio TEXT, nombrevaloracion TEXT)",[]);
        
      }*/
    Sqlite.prototype.getAll = function () {
        var sql = 'SELECT * FROM datos';
        return this.database.executeSql(sql, [])
            .then(function (response) {
            var datos = [];
            for (var index = 0; index < response.rows.length; index++) {
                datos.push(response.rows.item(index));
            }
            return Promise.resolve(datos);
        })
            .catch(function (error) { return Promise.reject(error); });
    };
    Sqlite.prototype.getIconosServicios = function () {
        var sql = 'SELECT iconoservicio FROM datos';
        return this.database.executeSql(sql, [])
            .then(function (response) {
            var datos = [];
            if (response.rows.length > 0) {
                for (var index = 0; index < response.rows.length; index++) {
                    datos.push({ iconoservicio: response.rows.item(index).iconoservicio });
                }
            }
            return datos;
        })
            .catch(function (error) { return Promise.reject(error); });
    };
    Sqlite.prototype.agregarDatosLocales = function (dat) {
        console.log(dat.idservicio);
        console.log(dat.nombreservicio);
        console.log(dat.iconoservicio);
        console.log(dat.nombrevaloracion);
        var sql = 'INSERT INTO datos(idservicio, nombreservicio, iconoservicio, nombrevaloracion) VALUES(?,?,?,?)';
        return this.database.executeSql(sql, [dat.idservicio, dat.nombreservicio, dat.iconoservicio, dat.nombrevaloracion]).then(function (res) {
            return res;
        });
    };
    return Sqlite;
}());
Sqlite = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_3__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4__angular_http__["b" /* Http */],
        __WEBPACK_IMPORTED_MODULE_1__ionic_native_sqlite_porter__["a" /* SQLitePorter */],
        __WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */],
        __WEBPACK_IMPORTED_MODULE_5__ionic_native_sqlite__["a" /* SQLite */],
        __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["i" /* Platform */]])
], Sqlite);

//# sourceMappingURL=sqlite.js.map

/***/ }),

/***/ 132:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ValoracionesPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_service_service__ = __webpack_require__(51);
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
 * Generated class for the ValoracionesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var ValoracionesPage = (function () {
    function ValoracionesPage(navCtrl, navParams, service) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.service = service;
        this.getValoraciones(this.navParams.get('servicio'));
    }
    ValoracionesPage.prototype.getValoraciones = function (servicio) {
        /*this.service.getValoraciones(servicio).subscribe(
          data=> this.valoraciones = data,
          err=> console.log(err)
        );*/
    };
    ValoracionesPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ValoracionesPage');
    };
    return ValoracionesPage;
}());
ValoracionesPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* IonicPage */])(),
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-valoraciones',template:/*ion-inline-start:"C:\Users\mailo\Desktop\Appcheck\lectoQR2\src\pages\valoraciones\valoraciones.html"*/'<!--\n  Generated template for the ValoracionesPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n        <ion-navbar color="verde">\n                <ion-title >\n                        <img src="assets/img/logo.png" width="30" height="40" />\n                    </ion-title>\n                    <button ion-button menuToggle end>\n                        <ion-icon name="menu"></ion-icon>\n                    </button>\n        </ion-navbar>\n</ion-header>\n\n\n<ion-content padding>\n  <ion-list>\n      <ion-item *ngFor="let valoracion of valoraciones">\n        <h1>{{valoracion.nombre}}</h1>\n      </ion-item>\n  </ion-list>\n  <ion-footer >\n    <ion-toolbar color="amarillo" >\n        <ion-title>Valoraciones</ion-title>\n    </ion-toolbar>\n  </ion-footer>\n</ion-content>\n'/*ion-inline-end:"C:\Users\mailo\Desktop\Appcheck\lectoQR2\src\pages\valoraciones\valoraciones.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_2__providers_service_service__["a" /* ServiceProvider */]])
], ValoracionesPage);

//# sourceMappingURL=valoraciones.js.map

/***/ }),

/***/ 133:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ServiciosPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__valoraciones_valoraciones__ = __webpack_require__(132);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_service_service__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_sqlite_sqlite__ = __webpack_require__(103);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var ServiciosPage = (function () {
    function ServiciosPage(navCtrl, navParams, service, Sqlite) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.service = service;
        this.Sqlite = Sqlite;
        this.cargarIconosServicios();
    }
    ServiciosPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ServiciosPage');
    };
    ServiciosPage.prototype.cargarIconosServicios = function () {
        var _this = this;
        this.Sqlite.getIconosServicios().then(function (data) { return _this.iconos = data; }, function (err) { return console.log(err); });
    };
    /*cargarIconosServicios(){
        this.service.getDatos().subscribe(
          data => this.iconos = data,
          err => console.log(err)
        );
  }*/
    ServiciosPage.prototype.valoraciones = function (servicio) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__valoraciones_valoraciones__["a" /* ValoracionesPage */], {
            servicio: servicio
        });
    };
    return ServiciosPage;
}());
ServiciosPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* IonicPage */])(),
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-servicios',template:/*ion-inline-start:"C:\Users\mailo\Desktop\Appcheck\lectoQR2\src\pages\servicios\servicios.html"*/'<ion-header>\n    <ion-navbar color="verde">\n        <ion-title>\n            <img src="assets/img/logo.png" width="30" height="40" />\n        </ion-title>\n        <button ion-button menuToggle end>\n                        <ion-icon name="menu"></ion-icon>\n                    </button>\n    </ion-navbar>\n</ion-header>\n\n<ion-content>\n    <ion-grid>\n        <ion-row text-center>\n            <ion-col col-3 col-md-3 col-xl-3 *ngFor="let icono of iconos">\n                <div class="image-container" \n                [style.background-image]="\'url(assets/servicios/\'+icono.iconoservicios+\'.png)\'"  \n                (click)="valoraciones(user.iconoservicios)"></div>\n            </ion-col>\n        </ion-row>\n    </ion-grid>\n    <ion-footer>\n        <ion-toolbar color="amarillo">\n            <ion-title>Servicios</ion-title>\n        </ion-toolbar>\n    </ion-footer>\n</ion-content>'/*ion-inline-end:"C:\Users\mailo\Desktop\Appcheck\lectoQR2\src\pages\servicios\servicios.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_3__providers_service_service__["a" /* ServiceProvider */],
        __WEBPACK_IMPORTED_MODULE_4__providers_sqlite_sqlite__["a" /* Sqlite */]])
], ServiciosPage);

//# sourceMappingURL=servicios.js.map

/***/ }),

/***/ 134:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AcercaPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(24);
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
 * Generated class for the AcercaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var AcercaPage = (function () {
    function AcercaPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    AcercaPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad AcercaPage');
    };
    return AcercaPage;
}());
AcercaPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* IonicPage */])(),
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-acerca',template:/*ion-inline-start:"C:\Users\mailo\Desktop\Appcheck\lectoQR2\src\pages\acerca\acerca.html"*/'<!--\n  Generated template for the AcercaPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n        <ion-navbar color="verde">\n                <ion-title >\n                        <img src="assets/img/logo.png" width="30" height="40" />\n                    </ion-title>\n                    <button ion-button menuToggle end>\n                        <ion-icon name="menu"></ion-icon>\n                    </button>\n        </ion-navbar>\n  </ion-header>\n  \n  <ion-content padding>\n      <br/><b><i>Version: </i></b>1.0.0 beta\n      <br/><b><i>Desarrolladores: </i></b>GVR Soluciones Informaticas\n      <br/><p align="justify">Esta aplicación Fue desarrollada en el marco de la cursada de la materia Laboratorio de Desarrollo de Software de la carrera Analista de SIstemas </p>\n      <br/><b><i>Alumnos: </i></b><br/>\n      -Rojas Juan<br/>\n      -Guanuco Gustavo<br/>\n      -Valentin Victor<br/>\n      <br/><b><i>Docentes: </i></b><br/>\n      -Sofia Osiris<br/> \n      -Gestos Esteban<br/>\n      -Hallar Karim \n     \n    \n      <!--<div *ngIf="scanData">\n          <p>Scanned Text : </p>\n          <p>Scanned Format : </p>\n      </div>-->\n       \n      <ion-footer >\n        <ion-toolbar color="amarillo" >\n            <ion-title>Acerca</ion-title>\n        </ion-toolbar>\n      </ion-footer>\n  </ion-content>\n'/*ion-inline-end:"C:\Users\mailo\Desktop\Appcheck\lectoQR2\src\pages\acerca\acerca.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */]])
], AcercaPage);

//# sourceMappingURL=acerca.js.map

/***/ }),

/***/ 145:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 145;

/***/ }),

/***/ 188:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/acerca/acerca.module": [
		582,
		5
	],
	"../pages/confirmacion/confirmacion.module": [
		584,
		1
	],
	"../pages/opcionales/opcionales.module": [
		583,
		4
	],
	"../pages/servicios/servicios.module": [
		581,
		3
	],
	"../pages/ub-manual/ub-manual.module": [
		585,
		0
	],
	"../pages/valoraciones/valoraciones.module": [
		580,
		2
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return __webpack_require__.e(ids[1]).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = 188;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 260:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_barcode_scanner__ = __webpack_require__(259);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__servicios_servicios__ = __webpack_require__(133);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_service_service__ = __webpack_require__(51);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





//import {OpcionalesPage} from '../opcionales/opcionales';

var HomePage = (function () {
    function HomePage(navCtrl, navParams, barcodeScanner, service) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.barcodeScanner = barcodeScanner;
        this.service = service;
    }
    HomePage.prototype.scan = function () {
        var _this = this;
        this.options = {
            prompt: "Escanee su codigoQR"
        };
        this.barcodeScanner.scan(this.options).then(function (barcodeData) {
            console.log(barcodeData);
            _this.scanData = barcodeData;
        }, function (err) {
            console.log("Error occured : " + err);
        });
    };
    HomePage.prototype.servicios = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__servicios_servicios__["a" /* ServiciosPage */]);
    };
    /*
    servicios(){
        this.navCtrl.push(OpcionalesPage);
    }*/
    HomePage.prototype.encodeText = function () {
        var _this = this;
        this.barcodeScanner.encode(this.barcodeScanner.Encode.TEXT_TYPE, this.encodeData).then(function (encodedData) {
            console.log(encodedData);
            _this.encodedData = encodedData;
            _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__servicios_servicios__["a" /* ServiciosPage */]);
        }, function (err) {
            console.log("Error occured : " + err);
        });
    };
    return HomePage;
}());
HomePage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-home',template:/*ion-inline-start:"C:\Users\mailo\Desktop\Appcheck\lectoQR2\src\pages\home\home.html"*/'<ion-header>\n    <ion-navbar color="verde">\n            <ion-title>\n                    <img src="assets/img/logo.png" width="30" height="40" />\n            </ion-title>\n            <button ion-button menuToggle end>\n                    <ion-icon name="menu"></ion-icon>\n            </button>              \n    </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n    \n    \n    <ion-grid>\n        <ion-row align="center"> \n                <br/><b><i>Bienvenido</i></b><br/>  \n        </ion-row>\n        <ion-row>\n                <p align="justify">Esta aplicación le permitira valorar los servicios brindados por la Unidad Academica Rio Gallegos de Universidad Nacional de la Patagonia Austral\n                    </p><br/>\n        </ion-row>\n        <ion-row>\n                <br/>  \n        </ion-row>\n        <ion-row>\n                <br/>  \n        </ion-row>\n        <ion-row>\n                <br/>  \n        </ion-row>\n        <ion-row>\n                <br/>  \n        </ion-row>\n        <ion-row>\n                <br/>  \n        </ion-row>\n        <ion-row>\n                <br/>  \n        </ion-row>\n        <ion-row>\n                <br/>  \n        </ion-row>\n        <ion-row>\n                <br/>  \n        </ion-row>\n        <ion-row>\n                <ion-col col-12 col-sm>\n                        <button color="verdea" ion-button icon-only full large (click)="servicios()"> \n                                Acceso Manual\n                                <ion-icon name="hand"></ion-icon> \n                        </button>\n                </ion-col>\n        </ion-row>\n        <ion-row>\n                <ion-col col-12 col-sm>\n                <button color="verdea" ion-button icon-only full large (click)="scan()"> \n                        Codigo QR     \n                        <ion-icon name="expand"></ion-icon>\n                </button>\n                </ion-col>\n        </ion-row>\n    </ion-grid>\n    \n    <!--<button color="verdea" ion-button icon-only full large (click)="servicios()">\n     Acceso Manual\n      <ion-icon name="hand"></ion-icon>\n    </button>\n    <br/>\n    <button color="verdea" ion-button icon-only full  large (click)="scan()">\n        Codigo QR     \n        <ion-icon name="expand"></ion-icon>\n    </button>-->\n\n    <!--<div *ngIf="scanData">\n        <p>Scanned Text : </p>\n        <p>Scanned Format : </p>\n    </div>-->\n\n    <ion-footer>\n        <ion-toolbar color="amarillo">\n            <ion-title><img src="assets/img/logoinf.png" width="110" height="20" /></ion-title>\n        </ion-toolbar>\n    </ion-footer>\n</ion-content>'/*ion-inline-end:"C:\Users\mailo\Desktop\Appcheck\lectoQR2\src\pages\home\home.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_2__ionic_native_barcode_scanner__["a" /* BarcodeScanner */],
        __WEBPACK_IMPORTED_MODULE_4__providers_service_service__["a" /* ServiceProvider */]])
], HomePage);

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 261:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MisvaloracionesPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(24);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var MisvaloracionesPage = MisvaloracionesPage_1 = (function () {
    function MisvaloracionesPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        // If we navigated to this page, we will have an item available as a nav param
        this.selectedItem = navParams.get('item');
        // Let's populate this page with some filler content for funzies
        this.icons = ['done-all', 'clock'];
        this.items = [];
        for (var i = 1; i < 11; i++) {
            this.items.push({
                title: 'Valoración ' + i,
                note: 'Fecha ' + i,
                icon: this.icons[Math.floor(Math.random() * this.icons.length)]
            });
        }
    }
    MisvaloracionesPage.prototype.itemTapped = function (event, item) {
        // That's right, we're pushing to ourselves!
        this.navCtrl.push(MisvaloracionesPage_1, {
            item: item
        });
    };
    return MisvaloracionesPage;
}());
MisvaloracionesPage = MisvaloracionesPage_1 = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-list',template:/*ion-inline-start:"C:\Users\mailo\Desktop\Appcheck\lectoQR2\src\pages\misvaloraciones\misvaloraciones.html"*/'<ion-header>\n    <ion-navbar color="verde">\n        <ion-title >\n                <img src="assets/img/logo.png" width="30" height="40" />\n        </ion-title>\n        <button ion-button menuToggle end>\n                <ion-icon name="menu"></ion-icon>\n        </button>\n    </ion-navbar>\n</ion-header>\n\n<ion-content>\n  <ion-list show-delete="showDeleteItem">\n\n    <button ion-item *ngFor="let item of items" (click)="itemTapped($event, item)">\n      <ion-icon [name]="item.icon" item-left></ion-icon>\n      {{item.title}}\n      <div class="item-note" item-right>\n        {{item.note}}\n      </div>\n    </button>\n  </ion-list>\n  <div *ngIf="selectedItem" padding>\n    You navigated here from <b>{{selectedItem.title}}</b>\n  </div>\n  <ion-footer >\n    <ion-toolbar color="amarillo" >\n        <ion-title>Mis valoraciones</ion-title>\n    </ion-toolbar>\n  </ion-footer>\n</ion-content>'/*ion-inline-end:"C:\Users\mailo\Desktop\Appcheck\lectoQR2\src\pages\misvaloraciones\misvaloraciones.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */]])
], MisvaloracionesPage);

var MisvaloracionesPage_1;
//# sourceMappingURL=misvaloraciones.js.map

/***/ }),

/***/ 262:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OpcionalesPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_camera__ = __webpack_require__(217);
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
 * Generated class for the OpcionalesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var OpcionalesPage = (function () {
    function OpcionalesPage(navCtrl, navParams, camara) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.camara = camara;
    }
    OpcionalesPage.prototype.tomarFoto = function () {
        var _this = this;
        var options = {
            quality: 25,
            destinationType: this.camara.DestinationType.DATA_URL,
            encodingType: this.camara.EncodingType.JPEG,
            mediaType: this.camara.MediaType.PICTURE
        };
        this.camara.getPicture(options).then(function (imageData) {
            // imageData is either a base64 encoded string or a file URI
            // If it's base64:
            _this.base64Image = 'data:image/jpeg;base64,' + imageData;
        }, function (err) {
            // Handle error
        });
    };
    OpcionalesPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad OpcionalesPage');
    };
    return OpcionalesPage;
}());
OpcionalesPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* IonicPage */])(),
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-opcionales',template:/*ion-inline-start:"C:\Users\mailo\Desktop\Appcheck\lectoQR2\src\pages\opcionales\opcionales.html"*/'<!--\n  Generated template for the OpcionalesPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>opcionales</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n<ion-card>\n  <ion-card-content>\n    <button ion-button color="verdea" icon-right block (click)="tomarFoto()">\n      Tomar Foto\n      <ion-icon name="camera">\n      </ion-icon>\n    </button>\n    <img [src]="base64Image"/>\n   </ion-card-content>\n</ion-card>\n</ion-content>\n'/*ion-inline-end:"C:\Users\mailo\Desktop\Appcheck\lectoQR2\src\pages\opcionales\opcionales.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_2__ionic_native_camera__["a" /* Camera */]])
], OpcionalesPage);

//# sourceMappingURL=opcionales.js.map

/***/ }),

/***/ 263:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(264);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(268);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 268:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(257);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__ = __webpack_require__(258);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_barcode_scanner__ = __webpack_require__(259);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__app_component__ = __webpack_require__(579);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_home_home__ = __webpack_require__(260);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_misvaloraciones_misvaloraciones__ = __webpack_require__(261);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_servicios_servicios__ = __webpack_require__(133);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_valoraciones_valoraciones__ = __webpack_require__(132);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_acerca_acerca__ = __webpack_require__(134);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__providers_service_service__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__angular_http__ = __webpack_require__(102);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__providers_sqlite_sqlite__ = __webpack_require__(103);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__ionic_native_camera__ = __webpack_require__(217);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__pages_opcionales_opcionales__ = __webpack_require__(262);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__ionic_storage__ = __webpack_require__(194);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__ionic_native_sqlite_porter__ = __webpack_require__(190);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__ionic_native_sqlite__ = __webpack_require__(105);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




















var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["L" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* MyApp */],
            __WEBPACK_IMPORTED_MODULE_7__pages_home_home__["a" /* HomePage */],
            __WEBPACK_IMPORTED_MODULE_8__pages_misvaloraciones_misvaloraciones__["a" /* MisvaloracionesPage */],
            __WEBPACK_IMPORTED_MODULE_10__pages_valoraciones_valoraciones__["a" /* ValoracionesPage */],
            __WEBPACK_IMPORTED_MODULE_9__pages_servicios_servicios__["a" /* ServiciosPage */],
            __WEBPACK_IMPORTED_MODULE_16__pages_opcionales_opcionales__["a" /* OpcionalesPage */],
            __WEBPACK_IMPORTED_MODULE_11__pages_acerca_acerca__["a" /* AcercaPage */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_13__angular_http__["c" /* HttpModule */],
            __WEBPACK_IMPORTED_MODULE_17__ionic_storage__["a" /* IonicStorageModule */].forRoot(),
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* MyApp */], {}, {
                links: [
                    { loadChildren: '../pages/valoraciones/valoraciones.module#ValoracionesPageModule', name: 'ValoracionesPage', segment: 'valoraciones', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/servicios/servicios.module#ServiciosPageModule', name: 'ServiciosPage', segment: 'servicios', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/acerca/acerca.module#AcercaPageModule', name: 'AcercaPage', segment: 'acerca', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/opcionales/opcionales.module#OpcionalesPageModule', name: 'OpcionalesPage', segment: 'opcionales', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/confirmacion/confirmacion.module#ConfirmacionPageModule', name: 'ConfirmacionPage', segment: 'confirmacion', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/ub-manual/ub-manual.module#UbManualPageModule', name: 'UbManualPage', segment: 'ub-manual', priority: 'low', defaultHistory: [] }
                ]
            }),
        ],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["a" /* IonicApp */]],
        entryComponents: [
            __WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* MyApp */],
            __WEBPACK_IMPORTED_MODULE_7__pages_home_home__["a" /* HomePage */],
            __WEBPACK_IMPORTED_MODULE_8__pages_misvaloraciones_misvaloraciones__["a" /* MisvaloracionesPage */],
            __WEBPACK_IMPORTED_MODULE_9__pages_servicios_servicios__["a" /* ServiciosPage */],
            __WEBPACK_IMPORTED_MODULE_10__pages_valoraciones_valoraciones__["a" /* ValoracionesPage */],
            __WEBPACK_IMPORTED_MODULE_16__pages_opcionales_opcionales__["a" /* OpcionalesPage */],
            __WEBPACK_IMPORTED_MODULE_11__pages_acerca_acerca__["a" /* AcercaPage */]
        ],
        providers: [
            __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__["a" /* StatusBar */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
            __WEBPACK_IMPORTED_MODULE_5__ionic_native_barcode_scanner__["a" /* BarcodeScanner */],
            __WEBPACK_IMPORTED_MODULE_12__providers_service_service__["a" /* ServiceProvider */],
            __WEBPACK_IMPORTED_MODULE_14__providers_sqlite_sqlite__["a" /* Sqlite */],
            __WEBPACK_IMPORTED_MODULE_19__ionic_native_sqlite__["a" /* SQLite */],
            __WEBPACK_IMPORTED_MODULE_15__ionic_native_camera__["a" /* Camera */],
            __WEBPACK_IMPORTED_MODULE_18__ionic_native_sqlite_porter__["a" /* SQLitePorter */],
            { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["v" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* IonicErrorHandler */] },
        ]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 51:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ServiceProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(102);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(189);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/*
  Generated class for the ServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var ServiceProvider = (function () {
    function ServiceProvider(http) {
        this.http = http;
        this.api = 'http://192.168.0.136/checkpointA/';
    }
    ServiceProvider.prototype.getDatos = function () {
        return this.http.get(this.api + 'listserv.php').map(function (res) { return res.json(); });
    };
    ServiceProvider.prototype.insertarValoracion = function (parans) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]({ 'Content-Type': 'application/x-www-form-urlencoded' });
        return this.http.post(this.api + 'insertval.php', parans, {
            headers: headers,
            method: "POST"
        }).map(function (res) { return res.json(); });
    };
    return ServiceProvider;
}());
ServiceProvider = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */]])
], ServiceProvider);

//# sourceMappingURL=service.js.map

/***/ }),

/***/ 579:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(258);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(257);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_home_home__ = __webpack_require__(260);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_misvaloraciones_misvaloraciones__ = __webpack_require__(261);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_acerca_acerca__ = __webpack_require__(134);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_sqlite_sqlite__ = __webpack_require__(103);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_sqlite__ = __webpack_require__(105);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__providers_service_service__ = __webpack_require__(51);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










//import { OnInit } from '@angular/core';
var MyApp = (function () {
    function MyApp(platform, statusBar, splashScreen, sqliteInterna, SQLite, service) {
        this.platform = platform;
        this.statusBar = statusBar;
        this.splashScreen = splashScreen;
        this.sqliteInterna = sqliteInterna;
        this.SQLite = SQLite;
        this.service = service;
        this.rootPage = __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */];
        this.initializeApp();
        this.pages = [
            { title: 'Inicio', component: __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */] },
            { title: 'Mis Valoraciones', component: __WEBPACK_IMPORTED_MODULE_5__pages_misvaloraciones_misvaloraciones__["a" /* MisvaloracionesPage */] },
            { title: 'Acerca', component: __WEBPACK_IMPORTED_MODULE_6__pages_acerca_acerca__["a" /* AcercaPage */] },
        ];
    }
    MyApp.prototype.initializeApp = function () {
        var _this = this;
        this.platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            _this.statusBar.styleDefault();
            _this.splashScreen.hide();
            //this.createDatabase();
            //this.ngOnInit();
            //this.obtenerDatosExternos();
            //this.cargarAlmacenamientoInterno(this.datos);
        });
    };
    /*private createDatabase(){
      this.SQLite.create({
        name: 'data.db',
        location: 'default' // the location field is required
      })
      .then((db) => {
        this.sqliteInterna.setDatabase(db);
        return this.sqliteInterna.createTable();
      })
      .then(() =>{
        this.splashScreen.hide();
        this.rootPage = 'HomePage';
      })
      .catch(error =>{
        console.error(error);
      });
    }
  
    private obtenerDatosExternos(){
      this.service.getDatos().subscribe(
        data => this.datos = data,
        err => console.log(err)
      );
    }*/
    MyApp.prototype.ngOnInit = function () {
        var _this = this;
        this.service.getDatos().subscribe(function (res) { return _this.datos = res; }, function (err) { return console.error('Ha ocurrido un error al tratar de obtener los proyectos.'); });
    };
    /*
      private cargarAlmacenamientoInterno(datos: any[]){
        //var dat: any;
        var sqlita: Sqlite;
        sqlita=this.sqliteInterna;
          datos.forEach(function(currentValue, index, arr){
            var dat: any =
            {
              idservicio: datos[index].idservicios,
              nombreservicio: datos[index].nombreservicios,
              iconoservicio: datos[index].iconoservicios,
              nombrevaloracion: datos[index].nombrevaloracion
            }
            console.log(dat.nombreservicio);
            sqlita.agregar(dat);
          })
        }
        //for(var i = 0; i < 5; i++){
          var dat: dat =
            {
              idservicio: 1,
              nombreservicio: 'limpieza',
              iconoservicio: 3,
              nombrevaloracion: 'sdfsdf'
            }
            
           */
    //}
    //}
    MyApp.prototype.openPage = function (page) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        this.nav.setRoot(page.component);
    };
    return MyApp;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_13" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* Nav */]),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* Nav */])
], MyApp.prototype, "nav", void 0);
MyApp = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({template:/*ion-inline-start:"C:\Users\mailo\Desktop\Appcheck\lectoQR2\src\app\app.html"*/'<ion-menu id="rightMenu" [content]="content" side="right" color="verde" type="reveal">\n  <ion-header>\n    <ion-toolbar color="verde">\n      <ion-title>Menu</ion-title>\n    </ion-toolbar>\n  </ion-header>\n\n  <ion-content >\n    <ion-list >\n      <button  menuClose ion-item *ngFor="let p of pages" (click)="openPage(p)">\n        {{p.title}}\n      </button>\n    </ion-list>\n  </ion-content>\n\n</ion-menu>\n\n<!-- Disable swipe-to-go-back because it\'s poor UX to combine STGB with side menus -->\n<ion-nav [root]="rootPage" #content swipeBackEnabled="false"></ion-nav>\n'/*ion-inline-end:"C:\Users\mailo\Desktop\Appcheck\lectoQR2\src\app\app.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* Platform */],
        __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */],
        __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
        __WEBPACK_IMPORTED_MODULE_7__providers_sqlite_sqlite__["a" /* Sqlite */],
        __WEBPACK_IMPORTED_MODULE_8__ionic_native_sqlite__["a" /* SQLite */],
        __WEBPACK_IMPORTED_MODULE_9__providers_service_service__["a" /* ServiceProvider */]])
], MyApp);

//# sourceMappingURL=app.component.js.map

/***/ })

},[263]);
//# sourceMappingURL=main.js.map
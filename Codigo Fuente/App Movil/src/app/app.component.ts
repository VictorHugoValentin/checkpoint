import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { MisvaloracionesPage } from '../pages/misvaloraciones/misvaloraciones';
import { AcercaPage } from '../pages/acerca/acerca';
import { DatabaseProvider } from '../providers/database/database';
import { SQLite } from '@ionic-native/sqlite';
import { DatabaseMySqlProvider } from '../providers/database-my-sql/database-my-sql';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{ title: string, component: any }>;

  //Declaracion arrays que guardan los datos de MySQL
  servicios: Array<any>;
  valoraciones: Array<any>;
  ubicaciones: Array<any>;
  ubicacionesValoraciones: Array<any>;
  logExterno: number;
  logInterno: number;

  constructor(public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public databaseProvider: DatabaseProvider,
    public SQLite: SQLite,
    public databaseMySqlProvider: DatabaseMySqlProvider) {
    this.initializeApp();
    this.pages = [
      { title: 'Inicio', component: HomePage },
      { title: 'Mis Valoraciones', component: MisvaloracionesPage },
      { title: 'Acerca', component: AcercaPage },
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.cargaBaseInterna();
    });
  }

  cargaBaseInterna() {
    this.databaseMySqlProvider.getLogs().subscribe(
      data => {
        this.logExterno = data[0].idlog
        this.databaseProvider.getLogs().then(
          data => {
            this.logInterno = data;
            if (this.logInterno == null) {
              this.logInterno = 0;
            }
            if (this.logExterno > this.logInterno) {
              this.databaseProvider.setLog(this.logExterno);
              this.getServiciosMysql();
              this.getValoracionesMysql();
              this.getUbicacionesMysql();
              this.getUbicacionesValoracionesMysql();
            }
          });
      });
  }

  //GET's datos MySQL
  getServiciosMysql() {
    this.databaseMySqlProvider.getServicios().subscribe(
      data => {
        this.servicios = data;
        this.databaseProvider.setServicios(this.servicios);
      },
      err => {
        console.log(err);
      }
    );
  }

  getValoracionesMysql() {
    this.databaseMySqlProvider.getValoraciones().subscribe(
      data => {
        this.valoraciones = data;
        this.databaseProvider.setValoraciones(this.valoraciones);
      },
      err => {
        console.log(err);
      }
    );
  }

  getUbicacionesMysql() {
    this.databaseMySqlProvider.getUbicaciones().subscribe(
      data => {
        this.ubicaciones = data;
        this.databaseProvider.setUbicaciones(this.ubicaciones);
      },
      err => {
        console.log(err);
      }
    );
  }

  getUbicacionesValoracionesMysql() {
    this.databaseMySqlProvider.getUbicacionesValoraciones().subscribe(
      data => {
        this.ubicacionesValoraciones = data;
        this.databaseProvider.setUbicacionValoracion(this.ubicacionesValoraciones);
      },
      err => {
        console.log(err);
      }
    );
  }

  openPage(page) {
    this.nav.setRoot(page.component);
  }
}


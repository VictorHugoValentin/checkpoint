import { Component } from '@angular/core';
import { MySqlService } from './my-sql.service';
import { SQliteService } from './s-qlite.service';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  
  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'List',
      url: '/list',
      icon: 'list'
    }
  ];

   //Declaracion arrays que guardan los datos de MySQL
   servicios: any={};
   valoraciones: any={};
   ubicaciones: any={};
   ubicacionesValoraciones: any={};
   logExterno: number;
   logInterno: number;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private MySql: MySqlService,
    private sQlite: SQliteService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.cargaBaseInterna();
    });
  }

  cargaBaseInterna() {
    this.MySql.getLogs().subscribe(
      data => {
        this.logExterno = data[0].idlog;
        this.sQlite.getLogs().then(
          data => {
            this.logInterno = data; 
            if (this.logInterno == null) {
              this.logInterno = 0;
              console.log("LOG INTERNO APP COMPONENT: "+this.logInterno);
            }
            console.log("LOG INTERNO APP COMPONENT NO NULL: "+this.logInterno);
            if (this.logExterno > this.logInterno) {
              this.sQlite.BorrarActuales();
              this.sQlite.setLog(this.logExterno);
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
    this.MySql.getServicios().subscribe(
      data => {
        this.servicios = data;
       this.sQlite.setServicios(this.servicios);
      },
      err => {
        console.log(err);
      }
    );
  }

  getValoracionesMysql() {
    this.MySql.getValoraciones().subscribe(
      data => {
        this.valoraciones = data;
        this.sQlite.setValoraciones(this.valoraciones);
      },
      err => {
        console.log(err);
      }
    );
  }

  getUbicacionesMysql() {
    this.MySql.getUbicaciones().subscribe(
      data => {
        this.ubicaciones = data;
        this.sQlite.setUbicaciones(this.ubicaciones);
      },
      err => {
        console.log(err);
      }
    );
  }

  getUbicacionesValoracionesMysql() {
    this.MySql.getUbicacionesValoraciones().subscribe(
      data => {
        this.ubicacionesValoraciones = data;
        this.sQlite.setUbicacionValoracion(this.ubicacionesValoraciones);
      },
      err => {
        console.log(err);
      }
    );
  }

}

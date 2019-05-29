import { Component } from '@angular/core';
import { SQliteService } from './s-qlite.service';
import { Platform, IonicModule } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Network } from '@ionic-native/network/ngx';
import { NetworkInterface } from '@ionic-native/network-interface/ngx';
import { AlertController } from '@ionic/angular';


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
      title: 'Mis Valoraciones',
      url: '/list',
      icon: 'list'
    },
    {
      title: 'Acerca',
      url: '/acerca',
      icon: 'information-circle'
    },
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private sQlite: SQliteService,
    private alertController: AlertController,
    private network: Network,
    private networkInterface: NetworkInterface
  ) {
    if (this.network.type === 'wifi') {
          this.initializeApp();
  }else{
    this.alerta("Error de conexión","Por favor encienda el wifi");
  }
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
        this.sQlite.crearBaseDatos();
    });
  }

  async alerta (header: string, mensaje: string){
    let alert = await this.alertController.create({
      header: header,
      message: mensaje,
      buttons: [
        {
          text: 'OK',
          handler: () => {
            navigator['app'].exitApp();
            }
          }
        ]
    })
    await alert.present();
  }

}

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DatabaseMySqlProvider } from '../../providers/database-my-sql/database-my-sql';
import { HomePage } from '../../pages/home/home';


@IonicPage()
@Component({
  selector: 'page-confirmacion',
  templateUrl: 'confirmacion.html',
})
export class ConfirmacionPage {

  valoracion_actual: string;
  servicio: string;
  foto: string;
  email: string;
  descripcion: string;
  valoracion: string;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public mysql: DatabaseMySqlProvider) 
              {
              this.valoracion_actual = this.navParams.get('valoracion_actual');
              this.servicio = this.navParams.get('servicio');
              this.valoracion = this.navParams.get('valoracion');
              this.foto = this.navParams.get('foto');
              this.email = this.navParams.get('email');
              this.descripcion = this.navParams.get('descripcion');
              console.log("CONSTRUCTOR CONFIRMACION");
              console.log("------------------------");
              console.log("SERVICIO: "+this.servicio);
              console.log("VALORACION: "+this.valoracion);
              console.log("FOTO: "+this.foto);
              console.log("EMAIL: "+this.email);
              console.log("DESCRIPCION: "+this.descripcion);
              console.log("VALORACION_ACTUAL: "+this.valoracion_actual);
              console.log("------------------------");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConfirmacionPage');
  }

 confirmar(){
    console.log("VALORACION_ACTUAL CONFIRMAR: "+this.valoracion_actual);
    this.mysql.insertarValoracion(this.valoracion_actual);
    this.navCtrl.push(HomePage);
  }
  
  cancelar(){
    this.navCtrl.push(HomePage);
  }
}

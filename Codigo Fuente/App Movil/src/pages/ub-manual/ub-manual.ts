import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DatabaseProvider } from './../../providers/database/database';
import { ValoracionesPage } from '../valoraciones/valoraciones';

@IonicPage()
@Component({
  selector: 'page-ub-manual',
  templateUrl: 'ub-manual.html',
})
export class UbManualPage {
  ubicaciones: Array<any>;
  idservicio: number;
  descripcionservicio: string;
  nombreservicio: string;
  iconoservicio: number;
  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              public databaseProvider: DatabaseProvider) {
    this.descripcionservicio = this.navParams.get('descripcion');
    this.nombreservicio = this.navParams.get('nombreservicio');
    this.iconoservicio = this.navParams.get('iconoservicio');
    this.idservicio = this.navParams.get('idservicio');
this.getUbicaciones(this.idservicio);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UbManualPage');
  }

  getUbicaciones(servicio: number){
    this.databaseProvider.getUbicaciones(servicio).then(data =>{ 
    this.ubicaciones =  JSON.parse(data);
    });
  }

  valoraciones(servicio: number, descripcion: string, nombre: string, icono: number, ubicacion: number) {
      this.navCtrl.push(ValoracionesPage, {
        idservicio: servicio,
        iconoservicio: icono,
        nombreservicio: nombre,
        descripcion: descripcion,
        ubicacion: ubicacion
      });
  }

}

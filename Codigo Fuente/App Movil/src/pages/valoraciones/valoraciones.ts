import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DatabaseProvider } from './../../providers/database/database';
import {OpcionalesPage} from '../../pages/opcionales/opcionales';

@IonicPage()
@Component({
  selector: 'page-valoraciones',
  templateUrl: 'valoraciones.html',
})
export class ValoracionesPage {
  valoraciones: Array<any>;
  valoracion_actual: string;
  ubicacion: string;
  ubicacionValoracion: Array<any>;
  descripcionservicio: string;
  nombreservicio: string;
  iconoservicio: number;
  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              public databaseProvider: DatabaseProvider) {
              this.ubicacion = this.navParams.get('ubicacion');
              this.descripcionservicio = this.navParams.get('descripcion');
              this.nombreservicio = this.navParams.get('nombreservicio');
              this.iconoservicio = this.navParams.get('iconoservicio');
    this.getValoraciones(this.navParams.get('idservicio'));
  }
  
  //CONTROLAR LOS CASOS EN LOS QUE EL SERVICIO NO TIENE VALORAICONES 
  //(no tendria q estar habilitado desde WEB APP)
  getValoraciones(servicio: number){
    this.databaseProvider.getValoraciones(servicio).then(data =>{ 
    this.valoraciones =  JSON.parse(data);
    });
  }

  generarValoracionActual(idvaloracion: number){
    this.databaseProvider.getIdUbicacionValoracion(this.ubicacion, idvaloracion).then(res => {
      this.ubicacionValoracion = JSON.parse(res),
      this.valoracion_actual = '[{"ubicacionValoracion":"'+this.ubicacionValoracion[0].ubicacion_valoracion+'",'
    });  
  }

  opcionales(descripcion: number, foto: number,email: number, idvaloracion:number){
    this.databaseProvider.getIdUbicacionValoracion(this.ubicacion, idvaloracion).then(res => {
      this.ubicacionValoracion = JSON.parse(res),
      this.valoracion_actual = '[{"ubicacionValoracion":"'+this.ubicacionValoracion[0].ubicacion_valoracion+'",',
      this.navCtrl.push(OpcionalesPage, {
        descripcion: descripcion,
        foto: foto,
        email: email,
        valoracion_actual: this.valoracion_actual
      });
    }); 
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ValoracionesPage');
  }

}

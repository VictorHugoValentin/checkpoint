import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ValoracionesPage } from '../valoraciones/valoraciones';
import {UbmanualPage} from '../ubmanual/ubmanual';
import { DatabaseProvider } from './../../providers/database/database';

@IonicPage()
@Component({
  selector: 'page-servicios',
  templateUrl: 'servicios.html',
})
export class ServiciosPage {
  iconos: Array<any>;
  ubicacion: string;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public databaseProvider: DatabaseProvider) {
    this.databaseProvider.getDatabaseState().subscribe(rdy => {
      if (rdy) {
        this.ubicacion = this.navParams.get('ubicacion');
        this.cargarIconos(this.ubicacion);
      }
    })
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad ServiciosPage');
  }

  cargarIconos(ubicacion: string) {
      this.databaseProvider.getServicios(ubicacion)
        .then(data =>
          this.iconos = JSON.parse(data)
        );
  }

  valoraciones(servicio: number, descripcion: string, nombre: string, icono: number) {
    if (this.ubicacion != null) {
      this.navCtrl.push(ValoracionesPage, {
        idservicio: servicio,
        iconoservicio: icono,
        nombreservicio: nombre,
        descripcion: descripcion,
        ubicacion: this.ubicacion
      });
    } else {
      console.log("LA UBICACION ES NULA POR ENTRAR MANUALMENTE ");
      console.log("PARAMETROS ACA: ");
      console.log("IDSERVICIO: "+servicio);
      console.log("ICONOSERVICIO: "+icono);
      console.log("NOMBRESERVICIO: "+nombre);
      console.log("DESCRIPCION: "+descripcion);
      this.navCtrl.push(UbmanualPage, {
        idservicio: servicio,
        iconoservicio: icono,
        nombreservicio: nombre,
        descripcion: descripcion
      });
    }
  }

}

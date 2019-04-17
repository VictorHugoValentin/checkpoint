import { Component, OnInit } from '@angular/core';
import { MySqlService } from '../my-sql.service';
import { SQliteService } from '../s-qlite.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class ListPage implements OnInit {
  
  public valoraciones: Array<any> = null;

  constructor(private sqlite: SQliteService,
              private mysql: MySqlService,
              private alertController: AlertController) {
    this.getEstadoValoraciones();
  }

  ngOnInit(){
  }

  getEstadoValoraciones(){
    this.sqlite.getIdEstados()
    .then(data => {
      this.mysql.getEstadoValoraciones(data).subscribe(respuesta =>{
        this.sqlite.cambiarEstado(respuesta);
          this.getMisValoraciones();
      });
    }
    );
  }

  getMisValoraciones(){
    this.sqlite.getMisValoraciones()
    .then(data => 
      this.valoraciones = JSON.parse(data)
    );
  }

  async eliminar(id: number){
    if(id != -1){
    let alert = await this.alertController.create({
      header: 'Eliminar',
      message: '¿Estás seguro de que deseas eliminar esta valoracion?',
      buttons: [
        {
          text: 'No',
          role: 'cancelar',
          handler: () => {
          }
        },
        {
          text: 'Si',
          handler: () => {
            this.sqlite.eliminarMisValoraciones(id).then(data => {
              this.getMisValoraciones();
              console.log(data)
            });
          }
        }]
    })
    await alert.present();
    }else{
      let alert = await this.alertController.create({
        header: 'Eliminar',
        message: '¿Estás seguro de que deseas eliminar todas sus valoraciones?',
        buttons: [
          {
            text: 'No',
            role: 'cancelar',
            handler: () => {
            }
          },
          {
            text: 'Si',
            handler: () => {
              this.sqlite.eliminarMisValoraciones(id).then(data => {
                this.getMisValoraciones();
                console.log(data)
              });
            }
          }]
      })
      await alert.present();
    }
  }
}

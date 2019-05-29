import { Component } from '@angular/core';
import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner/ngx';
import { Router } from '@angular/router'; 
import { SQliteService } from '../s-qlite.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

    options: BarcodeScannerOptions;

    constructor(private barcodeScanner: BarcodeScanner,
                private sQlite: SQliteService,
                private alertController: AlertController,
                private router: Router) { }

    
    scanCode() {
        //Options
        this.options = {
            showTorchButton: true,
            showFlipCameraButton: true,
            formats : "QR_CODE",
            resultDisplayDuration: 100,
            prompt: "Escanee el codigoQR"
        }
        this.barcodeScanner.scan(this.options).then((barcodeData) => {
           if(barcodeData.text != ''){
               this.sQlite.existeUbicacion(barcodeData.text).then((data) => {
                if (data == -1){
                    this.servicios(barcodeData.text);
                }else{
                this.alerta("Error de código","Código QR no encontrado");
               }
            
           });}
        }, (err) => {
            console.log(err);
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
                }
              }
            ]
        })
        await alert.present();
      }

    servicios(ubicacion: string) {
        if(ubicacion==null){
            ubicacion="ninguno";
        }
       this.router.navigate(['servicios',ubicacion]);
    }

}

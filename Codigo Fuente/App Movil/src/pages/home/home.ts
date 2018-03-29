import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NavParams } from 'ionic-angular';
import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner';
import { ServiciosPage } from '../servicios/servicios';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html',

})
export class HomePage {

    scanData: {};
    options: BarcodeScannerOptions;

    constructor(public navCtrl: NavController,
        public navParams: NavParams,
        private barcodeScanner: BarcodeScanner) { }

    scan() {
        this.options = {
            formats : "QR_CODE",
            resultDisplayDuration: 100,
            showTorchButton : true,
            prompt: "Escanee el codigoQR"
        }
        this.barcodeScanner.scan(this.options).then((barcodeData) => {
            console.log(barcodeData.text);
            this.servicios(barcodeData.text);
        }, (err) => {
            console.log("Error occured : " + err);
        });
    }

    servicios(ubicacion: string) {
        this.navCtrl.push(ServiciosPage, {
            ubicacion: ubicacion
        });
    }

}

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import 'rxjs/add/operator/debounceTime';
import { DatabaseMySqlProvider } from '../../providers/database-my-sql/database-my-sql';
import {ConfirmacionPage} from '../../pages/confirmacion/confirmacion';
import { DatabaseProvider } from '../../providers/database/database';

@IonicPage()
@Component({
  selector: 'page-opcionales',
  templateUrl: 'opcionales.html',
})
export class OpcionalesPage {

  sampleForm: FormGroup;
  termsAgree: boolean;
  private base64Image: string;
  permite_descripcion: number;
  permite_foto: number;
  permite_email: number;
  valoracion_actual: string;

  email: string;
  descripcion: string;

  idservicio: number;
  idvaloracion: number;

  nombreServicio: string;
  nombreValoracion: string;


  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private camara: Camera,
              private mysql: DatabaseMySqlProvider,
              private sqlite: DatabaseProvider) {
              this.base64Image="null";
              this.email=null;
              this.descripcion=null;
              this.valoracion_actual = this.navParams.get('valoracion_actual');
              this.idservicio = this.navParams.get('idservicio');
              this.idvaloracion = this.navParams.get('idvaloracion');
              console.log("ID SERVICIO EN CONSTRUCTOR OPCIONALES: "+this.idservicio);
              this.devolverNombreServicio(this.idservicio);
              this.devolverNombreValoracion(this.idvaloracion);
    this.permiteDescripcion(this.navParams.get('descripcion'));
    this.permiteFoto(this.navParams.get('foto'));
    this.permiteEmail(this.navParams.get('email'));
  }

  permiteDescripcion(descripcion: number) {
    this.permite_descripcion = descripcion;
  }

  permiteFoto(foto: number) {
    this.permite_foto = foto;
  }

  permiteEmail(email: number) {
    this.permite_email = email;
  }

  tomarFoto() {
    const options: CameraOptions = {
      quality: 20,
      destinationType: this.camara.DestinationType.DATA_URL,
      //encodingType: this.camara.EncodingType.JPEG,
      //mediaType: this.camara.MediaType.PICTURE
      targetWidth: 1000,
      targetHeight: 1000,
    }

    this.camara.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      this.base64Image = `data:base64Image/jpeg;base64,${imageData}`;
    }, (err) => {
      // Handle error
    });
  }
  validarValoracion(servicio: number, valoracion: number){
    var existe: number;
    this.mysql.validarValoracion(servicio,valoracion).subscribe(res =>
      existe = res
    );
    return existe;
  }

  devolverNombreServicio(idservicio: number){
    this.sqlite.getNombreServicio(idservicio).then(res =>{
      this.nombreServicio = res,
      console.log("NOMBRE SERVICIO EN METODO: "+this.nombreServicio)
    }
    );
  }

  devolverNombreValoracion(idvaloracion: number){
    this.sqlite.getNombreValoracion(idvaloracion).then(res =>{
      this.nombreValoracion =  res,
      console.log("NOMBRE VALORACION EN METODO: "+this.nombreValoracion)
    }
    );
  }

  concatenarValoracionActual(){
    //var existe: number=0;
    if(this.base64Image!="null"){
      this.valoracion_actual = this.valoracion_actual+'"foto":"'+this.base64Image+'",';
    } else{
      this.valoracion_actual = this.valoracion_actual+'"foto":"null",';
    }
    if(this.descripcion!=null){
      this.valoracion_actual = this.valoracion_actual+'"descripcion":"'+this.descripcion+'",';
    } else{
      this.valoracion_actual = this.valoracion_actual+'"descripcion":"null",';
    }
    if(this.email!=null){
      this.valoracion_actual = this.valoracion_actual+'"email":"'+this.email+'"}]';
    } else{
      this.valoracion_actual = this.valoracion_actual+'"email":"null"}]';
    }
     
   // existe=this.validarValoracion(this.idservicio, this.idvaloracion);
    //if(existe!=0){
      this.navCtrl.push(ConfirmacionPage, {
        servicio: this.nombreServicio,
        valoracion: this.nombreValoracion,
        foto: this.base64Image,
        email: this.email,
        descripcion: this.descripcion,
        valoracion_actual: this.valoracion_actual
      });
   // }else{
     // console.log("NO EXISTE VALORACION O SERVICIO");
   // }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OpcionalesPage');
  }

  //Metodso para validar FORMULARIO (email)

  ionViewWillLoad() {
    this.termsAgree = true;

    this.sampleForm = new FormGroup({
      email: new FormControl('', Validators.compose([
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ]))
    });

    this.sampleForm.valueChanges
      .debounceTime(400)
      .subscribe(data => this.onValueChanged(data));
  }

  onValueChanged(data?: any) {
    if (!this.sampleForm) { return; }
    const form = this.sampleForm;
    for (const field in this.formErrors) {
      // Limpiamos los mensajes anteriores
      this.formErrors[field] = [];
      this.sampleForm[field] = '';
      const control = form.get(field);
      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field].push(messages[key]);
        }
      }
    }
  }

  formErrors = {
    'email': []
  };

  validationMessages = {
    'email': {
      'pattern': 'Formato invalido'
    },
  };
}

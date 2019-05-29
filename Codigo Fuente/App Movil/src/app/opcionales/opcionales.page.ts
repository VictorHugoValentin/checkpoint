import { Component, OnInit } from '@angular/core';
import { MySqlService } from '../my-sql.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import {WebView} from '@ionic-native/ionic-webview/ngx';


@Component({
  selector: 'app-opcionales',
  templateUrl: './opcionales.page.html',
  styleUrls: ['./opcionales.page.scss'],
})
export class OpcionalesPage implements OnInit {

  private todo: FormGroup;

  private base64Image: any = null;
  private foto: any = null;
  permite_descripcion: number;
  permite_foto: number;
  permite_email: number;
  valoracion_actual: string;

  email: string;
  descripcion: string;
  nombre_ubicacion: string;
  tipo: string;
  tipo_rango: string;

  idservicio: number;
  valor: number;
  idubicacion_valoracion: number;

  nombreServicio: string;
  nombreValoracion: string;
  mensajesValidacion = {
    'descripcion': [
        { tipo: 'maxlength', mensaje: 'Maximo 200 caracteres' },
      ],
      'email': [
        { tipo: 'maxlength', mensaje: 'Maximo 75 caracteres' },
        { tipo: 'pattern', mensaje: 'Formato invalido' },
      ]
    };

  constructor(private camara: Camera,
              private mysql: MySqlService,
              private formBuilder: FormBuilder,
              private router: Router,
              private route: ActivatedRoute,
              private webview: WebView) { 

                this.todo=this.formBuilder.group({
                  descripcion: ['', Validators.maxLength(200)],
                  email: ['',Validators.compose([
                    Validators.maxLength(75),
                    Validators.pattern(/^[a-zA-Z0-9\._-]+@[a-zA-Z0-9-]{2,}[.]+(?:[A-Z]{2}|com|org|net|gov|ar|biz|info|mobi|name|aero|jobs|museum)\b/)])],
                });
                    
                this.email=null;
                this.descripcion=null;
                this.nombreValoracion = this.route.snapshot.paramMap.get('valoracion');
                this.valor = parseInt(this.route.snapshot.paramMap.get('valor'));
                this.nombreServicio = this.route.snapshot.paramMap.get('nombreservicio');
                this.idubicacion_valoracion = parseInt(this.route.snapshot.paramMap.get('idubicacion_valoracion'));
                this.nombre_ubicacion = this.route.snapshot.paramMap.get('nombre_ubicacion');
                this.tipo = this.route.snapshot.paramMap.get('tipo');
                this.tipo_rango = this.route.snapshot.paramMap.get('tipo_rango');
                
                this.permite_descripcion = parseInt(this.route.snapshot.paramMap.get('permite_descripcion'));
                this.permite_foto = parseInt(this.route.snapshot.paramMap.get('permite_foto'));
                this.permite_email = parseInt(this.route.snapshot.paramMap.get('permite_email'));
              }

              tomarFoto() {
                const options: CameraOptions = {
                  quality: 30,
                  correctOrientation: true,
                  targetWidth: 600,
                  targetHeight: 600,
                  destinationType: this.camara.DestinationType.FILE_URI,
                  encodingType: this.camara.EncodingType.JPEG,
                  mediaType: this.camara.MediaType.PICTURE
                }
                
                this.camara.getPicture(options).then((imageData) => {
                  this.foto = this.webview.convertFileSrc(imageData); 
                  this.base64Image = imageData;                 
              });
            }
                     
              Valorar(){
                if(this.tipo == 'rango'){
                  if(this.descripcion == null){
                        this.descripcion = '';
                  }
                        this.router.navigate(['confirmacion', 
                                      this.nombreValoracion,
                                      this.valor,
                                      this.tipo,
                                      this.idubicacion_valoracion,
                                      this.nombreServicio,
                                      this.tipo_rango,
                                      this.nombre_ubicacion,
                                      '',
                                      '',
                                      '',
                                      this.descripcion]);
                }else{
                  if(this.foto == null){
                      this.foto = '';
                  }
                  if(this.base64Image == null){
                    this.base64Image = '';
                  }
                  if(this.email == null){
                    this.email = '';
                  }
                  if(this.descripcion == null){
                    this.descripcion = '';
                  }
                        this.router.navigate(['confirmacion', 
                                      this.nombreValoracion,
                                      'null',
                                      this.tipo,
                                      this.idubicacion_valoracion,
                                      this.nombreServicio,
                                      'null',
                                      this.nombre_ubicacion, 
                                      this.foto,
                                      this.base64Image,
                                      this.email,
                                      this.descripcion]);
                }
                  
              }

  ngOnInit() {
  }

}




  
import { Component, OnInit } from '@angular/core';
import { MySqlService } from '../my-sql.service';
import { Router, ActivatedRoute } from '@angular/router';
import { toBase64String } from '@angular/compiler/src/output/source_map';
import { File } from '@ionic-native/file/ngx';



@Component({
  selector: 'app-confirmacion',
  templateUrl: './confirmacion.page.html',
  styleUrls: ['./confirmacion.page.scss'],
})
export class ConfirmacionPage implements OnInit {

  valoracion_actual: {};
  idubicacion_valoracion: number;
  servicio: string;
  foto: string;
  base64Image: string
  email: string;
  descripcion: string;
  valoracion: string;
  tipo_rango: string;
  nombre_ubicacion: string;
  tipo: string;

  constructor(public mysql: MySqlService,
              private router: Router,
              private route: ActivatedRoute,
              private file: File) { 
            this.idubicacion_valoracion = parseInt(this.route.snapshot.paramMap.get('idubicacion_valoracion'));
            this.nombre_ubicacion = this.route.snapshot.paramMap.get('nombre_ubicacion');
            this.servicio = this.route.snapshot.paramMap.get('nombreservicio');
            this.valoracion = this.route.snapshot.paramMap.get('valoracion');
            this.foto = this.route.snapshot.paramMap.get('foto');
            this.base64Image = this.route.snapshot.paramMap.get('base64Image');
            this.email = this.route.snapshot.paramMap.get('email');
            this.descripcion = this.route.snapshot.paramMap.get('descripcion');
            this.tipo_rango = this.route.snapshot.paramMap.get('tipo_rango');
            this.tipo = this.route.snapshot.paramMap.get('tipo');
            console.log("BASE64 CONSTRUCTOR: "+this.base64Image);
            /*console.log("CONSTRUCTOR CONFIRMACION");
            console.log("------------------------");
            console.log("SERVICIO: "+this.servicio);
            console.log("VALORACION: "+this.valoracion);
            console.log("TIPO: "+this.tipo);
            console.log("TIPO_RANGO: "+this.tipo_rango);
            console.log("FOTO: "+this.foto);
            console.log("EMAIL: "+this.email);
            console.log("DESCRIPCION: "+this.descripcion);
            console.log("IDUBICACION VALORACION: "+this.idubicacion_valoracion);
            console.log("NOMBRE UBICACION: "+this.nombre_ubicacion);
            console.log("------------------------");*/
  }

  confirmar(){
   
   
    
    /*this.base64.encodeFile(this.foto).then((base64File: string) => {
      console.log(base64File);
    });*/
    var ruta = this.base64Image.substr(0,this.base64Image.lastIndexOf('/')+1);
    var nombre = this.base64Image.substr(this.base64Image.lastIndexOf('/') + 1);
        console.log('RUTA: ' + ruta);
        console.log('NOMBRE: ' + nombre);                 
                  this.file.readAsDataURL(ruta, nombre)
                  .then(base64File => {
                    this.valoracion_actual = {ubicacionValoracion: this.idubicacion_valoracion,
                                              descripcion: this.descripcion,
                                              tipo: this.tipo,
                                              valoracion: this.valoracion,
                                              foto: base64File,
                                              email: this.email};
                    //console.log("VALORACION_ACTUAL CONFIRMAR: "+this.valoracion_actual);
                    //console.log("BASE: "+base64File);
                    this.mysql.insertarValoracion(this.valoracion_actual);
                   });
                                      
    this.router.navigate(['home']);
  }

  
  
  cancelar(){
    this.router.navigate(['home']);
  }

  ngOnInit() {
  }

}







              


 


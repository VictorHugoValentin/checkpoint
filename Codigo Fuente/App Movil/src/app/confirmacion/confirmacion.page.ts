import { Component, OnInit } from '@angular/core';
import { MySqlService } from '../my-sql.service';
import { SQliteService } from '../s-qlite.service';
import { Router, ActivatedRoute } from '@angular/router';
import { File } from '@ionic-native/file/ngx';



@Component({
  selector: 'app-confirmacion',
  templateUrl: './confirmacion.page.html',
  styleUrls: ['./confirmacion.page.scss'],
})
export class ConfirmacionPage implements OnInit {

  valoracion_mySql: {};
  valoracion_sQlite: {};
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
  valor: string;

  constructor(public mysql: MySqlService,
              private sqlite: SQliteService,
              private router: Router,
              private route: ActivatedRoute,
              private file: File) { 
            this.idubicacion_valoracion = parseInt(this.route.snapshot.paramMap.get('idubicacion_valoracion'));
            this.nombre_ubicacion = this.route.snapshot.paramMap.get('nombre_ubicacion');
            this.servicio = this.route.snapshot.paramMap.get('nombreservicio');
            this.valoracion = this.route.snapshot.paramMap.get('valoracion');
            this.valor = this.route.snapshot.paramMap.get('valor');
            this.foto = this.route.snapshot.paramMap.get('foto');
            this.base64Image = this.route.snapshot.paramMap.get('base64Image');
            this.email = this.route.snapshot.paramMap.get('email');
            this.descripcion = this.route.snapshot.paramMap.get('descripcion');
            this.tipo_rango = this.route.snapshot.paramMap.get('tipo_rango');
            this.tipo = this.route.snapshot.paramMap.get('tipo');
            console.log("CONSTRUCTOR CONFIRMACION");
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
            console.log("------------------------");
  }

  confirmar(){
    if(this.tipo=='rango'){

      if(this.tipo_rango == 'emoticon' || this.tipo_rango == 'numerico'){
        this.valoracion_mySql = {ubicacionValoracion: this.idubicacion_valoracion,
          descripcion: this.descripcion,
          tipo: this.tipo,
          valoracion: this.valor,
          foto: this.foto,
          email: this.email};
        this.mysql.insertarValoracion(this.valoracion_mySql).subscribe((data) => {
          console.log("CONFIRMACION INSERTADA :"+data[0].idValoracionHecha);
  
          this.valoracion_sQlite = {idvaloracion_hecha: data[0].idValoracionHecha,
            valoracion: this.valoracion,
            tipo: this.tipo,
            tipo_rango: this.tipo_rango,
            foto: this.foto,
            descripcion: this.descripcion,
            email:this.email,
            servicio: this.servicio};
          this.sqlite.insertarValoracion(this.valoracion_sQlite);      
          
          this.router.navigate(['home']);
        });
      }else{

      this.valoracion_mySql = {ubicacionValoracion: this.idubicacion_valoracion,
        descripcion: this.descripcion,
        tipo: this.tipo,
        valoracion: this.valor,
        foto: this.foto,
        email: this.email};
        this.mysql.insertarValoracion(this.valoracion_mySql).subscribe((data) => {
          console.log("CONFIRMACION INSERTADA :"+data[0].idValoracionHecha);

        this.valoracion_sQlite = {idvaloracion_hecha: data[0].idValoracionHecha,
          valoracion: this.valor,
          tipo: this.tipo,
          tipo_rango: this.tipo_rango,
          foto: this.foto,
          descripcion: this.descripcion,
          email:this.email,
          servicio: this.servicio};
        this.sqlite.insertarValoracion(this.valoracion_sQlite);      
        
        this.router.navigate(['home']);
        });
      }
    }else{
      if(this.foto == ''){
        console.log("ENTRO SIN FOTO");
        this.valoracion_mySql = {ubicacionValoracion: this.idubicacion_valoracion,
                                descripcion: this.descripcion,
                                tipo: this.tipo,
                                valoracion: this.valoracion,
                                foto: this.foto,
                                email: this.email};
        this.mysql.insertarValoracion(this.valoracion_mySql).subscribe((data) => {
          console.log("CONFIRMACION INSERTADA :"+data[0].idValoracionHecha);
          console.log("CONFIRMACION INSERTADA :"+JSON.stringify(data));
          this.valoracion_sQlite = {idvaloracion_hecha: data[0].idValoracionHecha,
                                  valoracion: this.valoracion,
                                  tipo: this.tipo,
                                  tipo_rango: null,
                                  foto: this.foto,
                                  descripcion: this.descripcion,
                                  email:this.email,
                                  servicio: this.servicio};
          this.sqlite.insertarValoracion(this.valoracion_sQlite);
          this.router.navigate(['home']); 
        });
    }else{
    var ruta = this.base64Image.substr(0,this.base64Image.lastIndexOf('/')+1);
    var nombre = this.base64Image.substr(this.base64Image.lastIndexOf('/') + 1);               
                  this.file.readAsDataURL(ruta, nombre)
                  .then(base64File => {
                    this.valoracion_mySql = {ubicacionValoracion: this.idubicacion_valoracion,
                                              descripcion: this.descripcion,
                                              tipo: this.tipo,
                                              valoracion: this.valoracion,
                                              foto: base64File,
                                              email: this.email};
                    this.mysql.insertarValoracion(this.valoracion_mySql).subscribe((data) => {
                      console.log("CONFIRMACION INSERTADA :"+data[0].idValoracionHecha);
                    this.valoracion_sQlite = {idvaloracion_hecha: data[0].idValoracionHecha,
                      valoracion: this.valoracion,
                      tipo: this.tipo,
                      tipo_rango: null,
                      foto: this.foto,
                      descripcion: this.descripcion,
                      email:this.email,
                      servicio: this.servicio};
                    this.sqlite.insertarValoracion(this.valoracion_sQlite); 
                   });
                                      
    this.router.navigate(['home']);
                  });
    }
  }
}

  cancelar(){
    this.router.navigate(['home']);
  }

  ngOnInit() {
  }

}







              


 


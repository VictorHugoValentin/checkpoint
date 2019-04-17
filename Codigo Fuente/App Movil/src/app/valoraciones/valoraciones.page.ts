import { Component, OnInit } from '@angular/core';
import { SQliteService } from '../s-qlite.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-valoraciones',
  templateUrl: './valoraciones.page.html',
  styleUrls: ['./valoraciones.page.scss'],
})
export class ValoracionesPage implements OnInit {

  valoraciones: Array<any>;
  mostrarRango = null;
  valoracion_actual: string;
  ubicacion: string;
  idubicacion_valoracion: number;
  ubicacionValoracion: Array<any>;
  descripcionservicio: string;
  nombreservicio: string;
  iconoservicio: number;
  nombre_ubicacion: string;

  constructor(private sqlite: SQliteService,
              private router: Router,
              private route: ActivatedRoute) {

        this.ubicacion = this.route.snapshot.paramMap.get('ubicacion');
        this.descripcionservicio = this.route.snapshot.paramMap.get('descripcion');
        this.nombreservicio = this.route.snapshot.paramMap.get('nombre');
        this.iconoservicio = parseInt(this.route.snapshot.paramMap.get('icono'));
        this.getValoraciones(parseInt(this.route.snapshot.paramMap.get('servicio')), this.ubicacion);
   }

   desplegarNivel(idx) {
    if (this.rangoVisible(idx)) {
      this.mostrarRango = null;
    } else {
      this.mostrarRango = idx;
    }
    };
    
    rangoVisible(idx) {
      return this.mostrarRango === idx;
    };
  
    
    getValoraciones(servicio: number, ubicacion: string){
      this.sqlite.getValoraciones(servicio, ubicacion).then(data =>{ 
      this.valoraciones =  JSON.parse(data);
      });
    }
  
    reclamo(idvaloracion: number, valor: string, permite_descripcion: number, permite_foto: number, permite_email: number){
      this.sqlite.getIdUbicacionValoracion(this.ubicacion,idvaloracion).then(data =>{
        this.idubicacion_valoracion = data;
        
        this.sqlite.getNombreUbicacion(this.ubicacion).then(data =>{
          this.nombre_ubicacion = data;
  
          if(permite_descripcion == 1 || permite_foto == 1 || permite_email == 1 ){
            this.router.navigate(['opcionales', 
                                valor,
                                'null',
                                'reclamo',
                                permite_descripcion,
                                permite_foto,
                                permite_email,
                                this.idubicacion_valoracion,
                                'null',
                                this.nombre_ubicacion,
                                this.nombreservicio]);
          }else{
            this.router.navigate(['confirmacion',
                                valor,
                                'null',
                                'reclamo',
                                this.idubicacion_valoracion,
                                this.nombreservicio,
                                'null',
                                this.nombre_ubicacion,
                                '',
                                '',
                                '',
                                '']);
          }
        });
         
        });
      
    }
  
    valorar(idvaloracion: number, valoracion: string, permite_descripcion: number, tipo_rango: string){
      let valor: number;
      switch(valoracion) {
        case "MALO":
        case "e1":
        case "1":
        valor = 1;
          break;
        case "REGULAR":
        case "e2":
        case "2":
        valor = 2;
          break;
        case "BUENO":
        case "e3":
        case "3":
        valor = 3;
          break;
        case "MUY BUENO":
        case "e4":
        case "4":
        valor = 4;
          break;
        case "EXCELENTE":
        case "e5":
        case "5":
        valor = 5;
          break;
      }
      this.sqlite.getIdUbicacionValoracion(this.ubicacion,idvaloracion).then(data =>{
        this.idubicacion_valoracion = data;
  
        this.sqlite.getNombreUbicacion(this.ubicacion).then(data =>{
          this.nombre_ubicacion = data;
  console.log("PERMITE DESCRIPCION: "+permite_descripcion);
      if(permite_descripcion == 1){
        this.router.navigate(['opcionales',
                              valoracion,
                              valor,
                              'rango',
                              1,
                              0,
                              0,
                              this.idubicacion_valoracion,
                              tipo_rango,
                              this.nombre_ubicacion,
                              this.nombreservicio]);
      }else{
        this.router.navigate(['confirmacion',
                                valoracion,
                                valor,
                                'rango',
                                this.idubicacion_valoracion,
                                this.nombreservicio,
                                tipo_rango,
                                this.nombre_ubicacion,
                                '',
                                '',
                                '',
                                '']);
      }
      });
    });
  }

  ngOnInit() {
  }

}






  


             


  


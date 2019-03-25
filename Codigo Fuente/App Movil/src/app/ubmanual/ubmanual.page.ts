import { Component, OnInit } from '@angular/core';
import { SQliteService } from '../s-qlite.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ubmanual',
  templateUrl: './ubmanual.page.html',
  styleUrls: ['./ubmanual.page.scss'],
})
export class UbmanualPage implements OnInit {

  ubicaciones: Array<any>;
  idservicio: number;
  descripcionservicio: string;
  nombreservicio: string;
  iconoservicio: number;

  constructor(public sQlite: SQliteService,
              public router: Router,
              public route: ActivatedRoute) { 
            this.descripcionservicio = this.route.snapshot.paramMap.get('descripcion');
            this.nombreservicio = this.route.snapshot.paramMap.get('nombre');
            this.iconoservicio = parseInt(this.route.snapshot.paramMap.get('icono'));
            this.idservicio = parseInt(this.route.snapshot.paramMap.get('servicio'));
            this.getUbicaciones(this.idservicio);
  }

  getUbicaciones(servicio: number) {
    if (servicio) {
      this.sQlite.getUbicaciones(servicio)
        .then((data) =>
          this.ubicaciones = JSON.parse(data)
        );
    }
  }

  valoraciones(servicio: number, descripcion: string, nombre: string, icono: number, ubicacion: string, idubicacion: number) {
    this.router.navigate(['valoraciones',
                                servicio, 
                                descripcion, 
                                nombre,
                                icono,
                                ubicacion,
                                idubicacion]);
                                        
  }

  ngOnInit() {
  }

}




  
 

  


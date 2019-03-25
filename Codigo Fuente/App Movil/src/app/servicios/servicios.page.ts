import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SQliteService } from '../s-qlite.service';

@Component({
  selector: 'app-servicios',
  templateUrl: './servicios.page.html',
  styleUrls: ['./servicios.page.scss'],
})
export class ServiciosPage implements OnInit {

  iconos: Array<any>;
  ubicacion: string;
  idubicacion: number;

  constructor(private route: ActivatedRoute,
              public sQlite: SQliteService,
              private router: Router) { 
                this.sQlite.getDatabaseState().subscribe(rdy => {
                  if (rdy) {
                    this.ubicacion = this.route.snapshot.paramMap.get('ubicacion');
                    if(this.ubicacion=="ninguno"){
                      this.cargarIconos(null);
                    }else{
                      this.cargarIconos(this.ubicacion);
                    }
                    
                  }
                })
  }

  cargarIconos(ubicacion: string) {
                  this.sQlite.getServicios(ubicacion)
                    .then(data =>
                      this.iconos = JSON.parse(data)
                    );
                }
              
  valoraciones(servicio: number, descripcion: string, nombre: string, icono: number) {
                  if (this.ubicacion != "ninguno") {
                     this.sQlite.getIdUbicacion(this.ubicacion).then(data => {
                    
                      this.router.navigate(['valoraciones', 
                                             servicio, 
                                             descripcion, 
                                             nombre,
                                             icono,
                                             this.ubicacion,
                                             data]);
                                          });
                     }else {
                      this.router.navigate(['ubmanual',
                                             servicio,
                                             descripcion,
                                             nombre,
                                             icono]);
                    
                    }
  }
  

  ngOnInit() {
  }

}

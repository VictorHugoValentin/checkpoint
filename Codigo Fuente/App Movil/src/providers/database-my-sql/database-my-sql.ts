import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class DatabaseMySqlProvider {
//api: string = "http://10.0.1.140/checkpointA/";
  api: string = "http://192.168.0.136/checkpoint/appMovil/";
  //api: string = "http://192.168.1.121/checkpointA/";
  
  
  constructor(public http: Http) { }

  getServicios(){
    return this.http.get(this.api+"listarServicios.php").map(res => res.json());
  }

  getValoraciones(){
    return this.http.get(this.api+"listarValoraciones.php").map(res => res.json());
  }

  getUbicaciones(){
    return this.http.get(this.api+"listarUbicaciones.php").map(res => res.json());
  }

  getUbicacionesValoraciones(){
    return this.http.get(this.api+"listarUbicacionesValoraciones.php").map(res => res.json());
  }
  
  getLogs(){
    return this.http.get(this.api+'listarLogs.php').map(res => res.json());
  }

  validarValoracion(idservicio: number, idvaloracion: number){
    let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
    return this.http.post(this.api+'validarValoracion.php',{idservicio: idservicio, idvaloracion:idvaloracion},{
      headers: headers,
      method: "POST"
    }).map(res =>res.json());
  }

  insertarValoracion(valoracion: string){
    console.log("VALROACION_ACTUAL EN INSERTAR MYSQL: " + valoracion);
    var valoracionHecha: Array<any>;
    valoracionHecha = JSON.parse(valoracion);
    var ubicacionValoracion: number = valoracionHecha[0].ubicacionValoracion;
    var foto: string = valoracionHecha[0].foto;
    var descripcion: string = valoracionHecha[0].descripcion;
    var email: string = valoracionHecha[0].email;
    console.log("DATOS SUELTOS----------- " );
    console.log(ubicacionValoracion);
    console.log(foto);
    console.log(descripcion);
    console.log(email);


    let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
	  return this.http.post(this.api+'insertarvaloracion.php',{idUbicacionValoracion: ubicacionValoracion,
                                                    foto: foto,
                                                    descripcion: descripcion,
                                                    email: email},
                                                    {
                                                      headers: headers,
                                                      method: "POST"
                        }).map(res=> {return res.json();}
                        )}

}

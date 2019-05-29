import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';
import { Platform } from '@ionic/angular';
import { MySqlService } from './my-sql.service';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
import { BehaviorSubject } from 'rxjs';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class SQliteService {

  database: SQLiteObject;
  private databaseReady: BehaviorSubject<boolean>;
  
  serviciosMySql: any={};
  valoracionesMySql: any={};
  ubicacionesMySql: any={};
  ubicacionesValoracionesMySql: any={};

  constructor(public sqlitePorter: SQLitePorter,
              public databaseMySqlProvider: MySqlService,
              public storage: Storage,
              private sqlite: SQLite,
              public platform: Platform,
              private MySql: MySqlService,
              public http: HttpClient,
              private alertController: AlertController
              ) {
  }

  existeUbicacion(ubicacion: string ){
    console.log("NOMBRE RECIBIDO: "+ubicacion);
    return this.database.executeSql('SELECT * FROM ubicaciones '
    + ' WHERE  codigoqr = "' + ubicacion+'"', []).then((data) => {
      let nombreubicacion = 0;
      if (data.rows.length > 0) {
      
        nombreubicacion =  -1;
      }
      return nombreubicacion;
    });
  }

  borrarBaseDatos(){
      console.log("BORRANDOOOOOLAAA");
      this.database.executeSql("DELETE FROM ubicacion_valoracion; VACUUM",[]);
      this.database.executeSql("DELETE FROM ubicaciones; VACUUM",[]);
      this.database.executeSql("DELETE FROM valoraciones; VACUUM",[]);
      this.database.executeSql("DELETE FROM servicios; VACUUM",[]);
  }

  crearBaseDatos(){
    this.databaseReady = new BehaviorSubject(false);
    this.platform.ready().then(() => {
     this.sqlite = new SQLite();
       this.sqlite.create({
         name: 'SQLiteData.db',
         location: 'default'
       })
         .then((db: SQLiteObject) => {
           this.database = db;
           this.http.get('assets/SQLiteDatos.sql', {responseType: 'text'})
      .subscribe(sql => {
        this.sqlitePorter.importSqlToDb(this.database, sql)
          .then(data => {
            this.borrarBaseDatos();
            this.getServiciosMysql();
            this.getValoracionesMysql();
            this.getUbicacionesMysql();
            this.getUbicacionesValoracionesMysql();
            this.databaseReady.next(true);
          })
          .catch(e => console.error(e));
      });
         });
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

  //CARGA BASE SQLITE

   getServiciosMysql() {
    this.MySql.getServicios().subscribe(
      data => {
        this.serviciosMySql = data;
        if(data[0].error=="No se puede conectar a la base de datos"){
          this.alerta("Error de conexion", "No se puede conectar a la base de datos" );
        return;
        }else{
          this.setServicios(this.serviciosMySql);
        }
      },
      err => {
        console.log(err);
      }
    );
  }

  getValoracionesMysql() {
    this.MySql.getValoraciones().subscribe(
      data => {
        this.valoracionesMySql = data;
        if (this.valoracionesMySql == "No se puede conectar a la base de datos") {
          this.alerta("Error de conexion", "No se puede conectar a la base de datos");
          return;
        } else {
          this.setValoraciones(this.valoracionesMySql);
        }
      },
      err => {
        console.log(err);
      }
    );
  }

  getUbicacionesMysql() {
    this.MySql.getUbicaciones().subscribe(
      data => {
        this.ubicacionesMySql = data;
        if (this.ubicacionesMySql == "No se puede conectar a la base de datos") {
          this.alerta("Error de conexion", "No se puede conectar a la base de datos");
          return;
        } else {
          this.setUbicaciones(this.ubicacionesMySql);
        }
      },
      err => {
        console.log(err);
      }
    );
  }

  getUbicacionesValoracionesMysql() {
    this.MySql.getUbicacionesValoraciones().subscribe(
      data => {
        this.ubicacionesValoracionesMySql = data;
        if (this.ubicacionesValoracionesMySql == "No se puede conectar a la base de datos") {
          this.alerta("Error de conexion", "No se puede conectar a la base de datos");
          return;
        } else {
          this.setUbicacionValoracion(this.ubicacionesValoracionesMySql);
        }
      },
      err => {
        console.log(err);
      }
    );
  }

  setServicios(servicios: Array<any>) {
    var data
    for (var i = 0; i < servicios.length; i++) {
      data = this.database.executeSql("INSERT INTO servicios (idservicio, nombreservicio, iconoservicio, descripcionservicio)"
        + " VALUES (?, ?, ?, ?)", [servicios[i].idservicio,
        servicios[i].nombreservicio,
        servicios[i].iconoservicio,
        servicios[i].descripcionservicio]);
    }
    return data;
  }

  setValoraciones(valoraciones: Array<any>) {
    var data;
    for (var i = 0; i < valoraciones.length; i++) {     
        data = this.database.executeSql("INSERT INTO valoraciones ( idvaloracion, nombrevaloracion,"
        + " tipovaloracion,  tipo_valores, descripcion, foto,   email, servicio, descripcionvaloracion )"
        + " VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ? )", [valoraciones[i].idvaloracion,
        valoraciones[i].nombrevaloracion,
        valoraciones[i].tipovaloracion,
        valoraciones[i].tipo_valores,
        valoraciones[i].permite_descripcion,
        valoraciones[i].permite_foto,
        valoraciones[i].permite_email,
        valoraciones[i].servicio,
        valoraciones[i].descripcion]);
    }
    return data;
  }

  setUbicaciones(ubicaciones: Array<any>) {
    var data;
    for (var i = 0; i < ubicaciones.length; i++) {
      data = this.database.executeSql("INSERT INTO ubicaciones (idubicacion, codigoqr,"
        + " nombreubicacion, ubicacion)"
        + " VALUES (?, ?, ?, ?)", [ubicaciones[i].idubicacion,
        ubicaciones[i].codigoqr,
        ubicaciones[i].nombreubicacion,
        ubicaciones[i].ubicacion]);
    }
    return data;
  }

  setUbicacionValoracion(ubicacionesValoraciones: Array<any>) {
    var data;
    for (var i = 0; i < ubicacionesValoraciones.length; i++) {
      data = this.database.executeSql("INSERT INTO ubicacion_valoracion (idubicacion_valoracion, "
        + "ubicacion, valoracion)"
        + " VALUES (?, ?, ?)", [ubicacionesValoraciones[i].idubicacion_valoracion,
        ubicacionesValoraciones[i].ubicacion,
        ubicacionesValoraciones[i].valoracion]);
    }
    return data;
  }

  getServicios(ubicacion: string) {
    if (ubicacion != null) {
      return this.database.executeSql('SELECT * FROM servicios'
      + ' INNER JOIN valoraciones'
      + ' ON servicios.idservicio = valoraciones.servicio'
      + ' INNER JOIN ubicacion_valoracion'
      + ' ON valoraciones.idvaloracion = ubicacion_valoracion.valoracion'
      + ' INNER JOIN ubicaciones'
      + ' ON ubicacion_valoracion.ubicacion = ubicaciones.idubicacion'
      + ' WHERE ubicaciones.codigoqr = "' + ubicacion + '"'
      + ' GROUP BY servicios.idservicio', [])
      .then((data) => {
        let servicios: string;
        if (data.rows.length > 0) {
          servicios = "[";
          for (let i = 0; i < data.rows.length; i++) {
            if (servicios.charAt(servicios.length - 1) != "[") {
              servicios = servicios.concat(",");
            }
            servicios = servicios.concat('{"idservicio": "' + data.rows.item(i).idservicio + '",');
            servicios = servicios.concat('"nombreservicio": "' + data.rows.item(i).nombreservicio + '",');
            servicios = servicios.concat('"descripcionservicio": "' + data.rows.item(i).descripcionservicio + '",');
            servicios = servicios.concat('"iconoservicio": "' + data.rows.item(i).iconoservicio + '"}');
          }
          servicios = servicios.concat("]");
        }
        return servicios;
      });
    } else {
      return this.database.executeSql("SELECT * FROM servicios"
      +" INNER JOIN valoraciones"
      +" ON servicios.idservicio = valoraciones.servicio"
      +" WHERE 1"
      +" GROUP BY servicios.idservicio", [])
        .then((data) => {
          let servicios: string;
          if (data.rows.length > 0) {
            servicios = "[";
            for (let i = 0; i < data.rows.length; i++) {
              if (servicios.charAt(servicios.length - 1) != "[") {
                servicios = servicios.concat(",");
              }
              servicios = servicios.concat('{"idservicio": "' + data.rows.item(i).idservicio + '",');
            servicios = servicios.concat('"nombreservicio": "' + data.rows.item(i).nombreservicio + '",');
            servicios = servicios.concat('"descripcionservicio": "' + data.rows.item(i).descripcionservicio + '",');
            servicios = servicios.concat('"iconoservicio": "' + data.rows.item(i).iconoservicio + '"}');
          }
          servicios = servicios.concat("]");
        }
        return servicios;
      });
    }
  }

  getIdUbicacionValoracion(codigoqr: string, idvaloracion: number) {
    return this.database.executeSql('SELECT idubicacion_valoracion FROM ubicacion_valoracion '
      + ' INNER JOIN ubicaciones' 
      +' ON ubicacion_valoracion.ubicacion = ubicaciones.idubicacion '
      + ' WHERE  ubicaciones.codigoqr = "' + codigoqr + '" AND ubicacion_valoracion.valoracion = ' + idvaloracion, []).then((data) => {
        let idubicacion_valoracion: number;
        if (data.rows.length > 0) {
        
            idubicacion_valoracion =  data.rows.item(0).idubicacion_valoracion;
        }
        return idubicacion_valoracion;
      });
  }

  getNombreUbicacion(codigoQr: string){
    return this.database.executeSql('SELECT nombreubicacion FROM ubicaciones '
    + ' WHERE  codigoqr = "' + codigoQr+'"', []).then((data) => {
      let nombreubicacion: string;
      if (data.rows.length > 0) {
      
        nombreubicacion =  data.rows.item(0).nombreubicacion;
      }
      return nombreubicacion;
    });
  }

  getUbicaciones(idservicio: number) {
    return this.database.executeSql(
        'SELECT idubicacion, codigoqr, nombreubicacion FROM ubicaciones' 
        +' INNER JOIN ubicacion_valoracion' 
        +' ON ubicaciones.idubicacion = 	ubicacion_valoracion.ubicacion' 
        +' INNER JOIN valoraciones' 
        +' ON ubicacion_valoracion.valoracion = valoraciones.idvaloracion' 
        +' INNER JOIN servicios' 
        +' ON valoraciones.servicio = servicios.idservicio' 
        +' WHERE servicios.idservicio = '+idservicio
        +' GROUP BY ubicaciones.idubicacion'
        ,[]).then((data) => {
          let ubicaciones: string;
          if (data.rows.length > 0) {
            ubicaciones = "[";
           
            for (let i = 0; i < data.rows.length; i++) {
              if (ubicaciones.charAt(ubicaciones.length - 1) != "[") {
                ubicaciones = ubicaciones.concat(",");
              }
              ubicaciones = ubicaciones.concat('{"idubicacion": "' + data.rows.item(i).idubicacion + '",');
              ubicaciones = ubicaciones.concat('"codigoqr": "' + data.rows.item(i).codigoqr + '",');
              ubicaciones = ubicaciones.concat('"nombreubicacion": "' + data.rows.item(i).nombreubicacion + '"}');
            }
            ubicaciones = ubicaciones.concat("]");
          }
         return ubicaciones;
        });
}

getIdUbicacion(codigoQr: string){
  return this.database.executeSql("SELECT idubicacion FROM ubicaciones "
  + "WHERE codigoqr = " + codigoQr, []).then((data) => {
let idubicacion: number;
if (data.rows.length > 0) {
  idubicacion = data.rows.item(0).idubicacion;
}
return idubicacion;
});
}

  getNombreServicio(idservicio: number) {
    return this.database.executeSql("SELECT nombreservicio FROM servicios "
                                  + "WHERE idservicio = " + idservicio, []).then((data) => {
        let servicio: string;
        if (data.rows.length > 0) {
          servicio = '[{"nombreServicio":"'+data.rows.item(0).nombreservicio+'"}]';
          }
        return servicio;
      });
  }

  getNombreValoracion(idvaloracion: number) {
    return this.database.executeSql("SELECT nombrevaloracion FROM servicios "
                                  + "WHERE idvaloracion = " + idvaloracion, []).then((data) => {
        let valoracion: string;
        if (data.rows.length > 0) {
          valoracion = '[{"nombreValoracion":"'+data.rows.item(0).nombrevaloracion+'"}]';
          }
        return valoracion;
      });
  }

   getValoraciones(servicio: number, ubicacion: string) {
    return this.database.executeSql("SELECT * FROM valoraciones v" 
    +" JOIN servicios s ON v.servicio = s.idservicio"
    +" JOIN ubicacion_valoracion uv ON uv.valoracion = v.idvaloracion"
    +" JOIN ubicaciones u ON uv.ubicacion = u.idubicacion"
    +" WHERE s.idservicio = "+servicio+" AND u.codigoqr = '"+ubicacion+"'"
    +" GROUP BY v.idvaloracion", []).then((data) => {
        let valoraciones: string;
        if (data.rows.length > 0) {
          valoraciones = "[";
          for (var i = 0; i < data.rows.length; i++) {
            if (valoraciones.charAt(valoraciones.length - 1) != "[") {
              valoraciones = valoraciones.concat(",");
            }
            if(data.rows.item(i).tipo_valores == "texto"){
            valoraciones = valoraciones.concat('{"idvaloracion": "' + data.rows.item(i).idvaloracion + '",');
            valoraciones = valoraciones.concat('"nombrevaloracion": "' + data.rows.item(i).nombrevaloracion + '",');
            valoraciones = valoraciones.concat('"tipovaloracion": "' + data.rows.item(i).tipovaloracion + '",');
            valoraciones = valoraciones.concat('"tipo": "' + data.rows.item(i).tipo_valores + '",');
            valoraciones = valoraciones.concat('"descripcionvaloracion": "' + data.rows.item(i).descripcionvaloracion + '",');
            valoraciones = valoraciones.concat('"descripcion": "' + data.rows.item(i).descripcion + '",');        
            valoraciones = valoraciones.concat('"subs": [{"valor":"Malo"},{"valor":"Regular"},{"valor":"Bueno"},{"valor":"Muy Bueno"},{"valor":"Excelente"}]}');
            }else{
                if(data.rows.item(i).tipo_valores == "numerico"){
                 valoraciones = valoraciones.concat('{"idvaloracion": "' + data.rows.item(i).idvaloracion + '",');
                 valoraciones = valoraciones.concat('"nombrevaloracion": "' + data.rows.item(i).nombrevaloracion + '",');
                 valoraciones = valoraciones.concat('"tipovaloracion": "' + data.rows.item(i).tipovaloracion + '",');
                 valoraciones = valoraciones.concat('"tipo": "' + data.rows.item(i).tipo_valores + '",');
                 valoraciones = valoraciones.concat('"descripcionvaloracion": "' + data.rows.item(i).descripcionvaloracion + '",'); 
                 valoraciones = valoraciones.concat('"descripcion": "' + data.rows.item(i).descripcion + '",'); 
                 valoraciones = valoraciones.concat('"subs": [{"valor":"1"},{"valor":"2"},{"valor":"3"},{"valor":"4"},{"valor":"5"}]}');
                }else{
                  if(data.rows.item(i).tipo_valores == "emoticon"){
                  valoraciones = valoraciones.concat('{"idvaloracion": "' + data.rows.item(i).idvaloracion + '",');
                  valoraciones = valoraciones.concat('"nombrevaloracion": "' + data.rows.item(i).nombrevaloracion + '",');
                  valoraciones = valoraciones.concat('"tipovaloracion": "' + data.rows.item(i).tipovaloracion + '",');
                  valoraciones = valoraciones.concat('"tipo": "' + data.rows.item(i).tipo_valores + '",');
                  valoraciones = valoraciones.concat('"descripcionvaloracion": "' + data.rows.item(i).descripcionvaloracion + '",'); 
                  valoraciones = valoraciones.concat('"descripcion": "' + data.rows.item(i).descripcion + '",'); 
                  valoraciones = valoraciones.concat('"subs": [{"valor":"e1"},{"valor":"e2"},{"valor":"e3"},{"valor":"e4"},{"valor":"e5"}]}');
                }else{
                  valoraciones = valoraciones.concat('{"idvaloracion": "' + data.rows.item(i).idvaloracion + '",');
                  valoraciones = valoraciones.concat('"nombrevaloracion": "' + data.rows.item(i).nombrevaloracion + '",');
                  valoraciones = valoraciones.concat('"tipovaloracion": "' + data.rows.item(i).tipovaloracion + '",');
                  valoraciones = valoraciones.concat('"tipo": "' + data.rows.item(i).tipo_valores + '",');
                  valoraciones = valoraciones.concat('"descripcion": "' + data.rows.item(i).descripcion + '",');
                  valoraciones = valoraciones.concat('"foto": "' + data.rows.item(i).foto + '",');
                  valoraciones = valoraciones.concat('"email": "' + data.rows.item(i).email + '",');
                  valoraciones = valoraciones.concat('"descripcionvaloracion": "' + data.rows.item(i).descripcionvaloracion + '"}');
                }
                }
            }
          }
          valoraciones = valoraciones.concat("]");
        }
        return valoraciones;
      });
  }

  eliminarMisValoraciones(id: number){
    if(id != -1){
      return this.database.executeSql("DELETE FROM valoracion_Hecha WHERE idvaloracion_hecha = "+id, []);
    }else{
      return this.database.executeSql("DELETE FROM valoracion_Hecha WHERE 1", []);
    }
   
  }

  getMisValoraciones(){
    return this.database.executeSql("SELECT idvaloracion_hecha,"+ 
                                            " valoracion, tipo,"+
                                            " tipo_rango,"+
                                            " foto, descripcion,"+
                                            " email,"+
                                            " estado,"+
                                            " servicio,"+
                                            " date(fecha) AS fecha"+
                                            " FROM valoracion_Hecha"  
                                  +" WHERE 1", []).then((data) => {
        let valoraciones: string=null;
        if (data.rows.length > 0) {
          valoraciones = "[";
          for (var i = 0; i < data.rows.length; i++) {
            if (valoraciones.charAt(valoraciones.length - 1) != "[") {
              valoraciones = valoraciones.concat(",");
            }
            
            valoraciones = valoraciones.concat('{"idvaloracion_hecha": "' + data.rows.item(i).idvaloracion_hecha + '",');
            valoraciones = valoraciones.concat('"valoracion": "' + data.rows.item(i).valoracion + '",');
            valoraciones = valoraciones.concat('"tipo": "' + data.rows.item(i).tipo + '",');
            valoraciones = valoraciones.concat('"tipo_rango": "' + data.rows.item(i).tipo_rango + '",');
            valoraciones = valoraciones.concat('"foto": "' + data.rows.item(i).foto + '",');
            valoraciones = valoraciones.concat('"descripcion": "' + data.rows.item(i).descripcion + '",');
            valoraciones = valoraciones.concat('"email": "' + data.rows.item(i).email + '",');
            valoraciones = valoraciones.concat('"estado": "' + data.rows.item(i).estado + '",');
            valoraciones = valoraciones.concat('"servicio": "' + data.rows.item(i).servicio+ '",');
            valoraciones = valoraciones.concat('"fecha": "' + data.rows.item(i).fecha+ '"}');
            }
          valoraciones = valoraciones.concat("]");
        }
        return valoraciones;
      });
  }

  cambiarEstado(estados: any){
    for(var i=0; i < estados.length; i++){
        this.database.executeSql("UPDATE valoracion_Hecha"+ 
                                          " SET estado = '"+ estados[i].estado +"'"+
                                          " WHERE idvaloracion_hecha = "+ estados[i].idvaloracion_hecha);
    }
  }

  getIdEstados(){
    return this.database.executeSql("SELECT idvaloracion_hecha FROM valoracion_Hecha"  
                                  +" WHERE tipo = 'reclamo' AND (estado LIKE 'creado' OR estado LIKE 'espera')", []).then((data) => {
      
        let estados = [];
        if (data.rows.length > 0) {
          for (var i = 0; i < data.rows.length; i++) {
              estados.push({idValoracionHecha : data.rows.item(i).idvaloracion_hecha});
            }
        }
        return estados;
      });
  }
  
  insertarValoracion(valoracion: any) {
      var data;
        data = this.database.executeSql("INSERT INTO valoracion_Hecha (idvaloracion_hecha,"+
                                                                    " valoracion,"+
                                                                    " tipo,"+
                                                                    " tipo_rango,"+
                                                                    " foto,"+
                                                                    " descripcion,"+
                                                                    " email,"+
                                                                    " estado,"+
                                                                    " servicio)"+
                                              " VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ? )", 
                                              [valoracion.idvaloracion_hecha,
                                               valoracion.valoracion,
                                               valoracion.tipo,
                                               valoracion.tipo_rango,
                                               valoracion.foto,
                                               valoracion.descripcion,
                                               valoracion.email,
                                               'creado',
                                               valoracion.servicio]);
    return data;
  }

  getDatabaseState() {
    return this.databaseReady.asObservable();
  }
}

import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class MySqlService {

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };
  api = "http://192.168.0.136/checkpoint/appMovil/";

  constructor(private http: HttpClient) { }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened; please try again later.');
  }
  
  private extractData(res: Response) {
    let body = res;
    return body || { };
  }

  /*getClassroom(): Observable<any> {
    return this.http.get(api, httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }
  
  getClassroomById(id: string): Observable<any> {
    const url = `${api}/${id}`;
    return this.http.get(url, httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }
  
 
  
  updateClassroom(id: string, data): Observable<any> {
    const url = `${api}/${id}`;
    return this.http.put(url, data, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }*/
  
       getServicios(){
        return this.http.get(this.api+"listarServicios.php").pipe(map(this.extractData),
        catchError(this.handleError));
        
      }
    
      getValoraciones(){
        return this.http.get(this.api+"listarValoraciones.php").pipe(map(this.extractData),
        catchError(this.handleError));
      }
    
      getUbicaciones(){
        return this.http.get(this.api+"listarUbicaciones.php").pipe(map(this.extractData),
        catchError(this.handleError));
      }
    
      getUbicacionesValoraciones(){
        return this.http.get(this.api+"listarUbicacionesValoraciones.php").pipe(map(this.extractData),
        catchError(this.handleError));
      }
      
      getLogs(){
        return this.http.get(this.api+'listarLogs.php').pipe(map(this.extractData),
        catchError(this.handleError));
      }

      /*postClassroom(data): Observable<any> {
        const url = `${api}/add_with_students`;
        return this.http.post(url, data, this.httpOptions)
          .pipe(
            catchError(this.handleError)
          );
      }*/

      insertarValoracion(elemento: {}) {
       // return this.http.post(this.api + 'insertarvaloracion.php', JSON.stringify(elemento), 
       // this.httpOptions).pipe(map(res => console.log(JSON.stringify(res))));
      

        console.log("VALORACION HECHA MYSQL: "+JSON.stringify(elemento));
      //return new Promise(resolve => {
        return this.http.post(this.api+'insertarvaloracion.php', JSON.stringify(elemento), this.httpOptions)
          .subscribe((data) => {
            console.log(data);
          });
  
      

    }
        
      /*insertarValoracion(valoracion: any): Observable<any> {
        console.log("VALORACION_ACTUAL MYSQL: "+JSON.stringify(valoracion));

        return this.http.post(this.api + 'insertarvaloracion.php', JSON.stringify(valoracion), this.httpOptions)
        .pipe(
          catchError(this.handleError)
        );
      }*/
}

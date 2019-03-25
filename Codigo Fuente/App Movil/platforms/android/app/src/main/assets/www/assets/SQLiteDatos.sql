CREATE TABLE IF NOT EXISTS servicios(idservicio INTEGER PRIMARY KEY,  
                                     nombreservicio TEXT, 
                                     iconoservicio INTEGER,
                                     descripcionservicio TEXT);

CREATE TABLE IF NOT EXISTS valoraciones(idvaloracion INTEGER PRIMARY KEY,
                                        nombrevaloracion TEXT,
                                        tipovaloracion TEXT,
                                        tipo_valores TEXT,
                                        descripcion INTEGER,
                                        foto INTEGER,
                                        email INTEGER,
                                        servicio INTEGER, 
                                        descripcionvaloracion TEXT,               
                                        FOREIGN KEY(servicio) 
                                        REFERENCES servicios(idservicio));

CREATE TABLE IF NOT EXISTS ubicaciones(idubicacion INTEGER PRIMARY KEY, 
                                       codigoqr TEXT,
                                       nombreubicacion TEXT,
                                       ubicacion INTEGER, 
                                       FOREIGN KEY(ubicacion) 
                                       REFERENCES ubicaciones(idubicacion));

CREATE TABLE IF NOT EXISTS ubicacion_valoracion(idubicacion_valoracion INTEGER PRIMARY KEY, 
                                                ubicacion INTEGER,
                                                valoracion INTEGER, 
                                                FOREIGN KEY(ubicacion) 
                                                REFERENCES ubicaciones(idubicacion),
                                                FOREIGN KEY(valoracion) 
                                                REFERENCES valoraciones(idvaloracion)); 

CREATE TABLE IF NOT EXISTS log(log INTEGER PRIMARY KEY,
                                idlog INTEGER);
                                
CREATE TABLE IF NOT EXISTS valoracion_Hecha(idvaloracion_hecha INTEGER PRIMARY KEY,
                                        ubicacion_valoracion INTEGER,
                                        foto TEXT,
                                        descripcion TEXT,
                                        email TEXT,            
                                        FOREIGN KEY(ubicacion_valoracion) 
                                        REFERENCES ubicacion_valoracion(idubicacion_valoracion));




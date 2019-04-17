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
                                
CREATE TABLE IF NOT EXISTS valoracion_Hecha(idvaloracion_hecha INTEGER PRIMARY KEY,
                                        valoracion TEXT,
                                        tipo TEXT,
                                        tipo_rango TEXT,
                                        foto TEXT,
                                        descripcion TEXT,
                                        email TEXT,
                                        estado TEXT,
                                        servicio TEXT,
                                        fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP);




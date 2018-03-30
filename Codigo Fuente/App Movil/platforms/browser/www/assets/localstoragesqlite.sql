CREATE TABLE IF NOT EXISTS datos(id INTEGER PRIMARY KEY AUTOINCREMENT, idservicio INTEGER, nombreservicio TEXT, iconoservicio INTEGER, nombrevaloracion TEXT);
INSERT INTO datos(idservicio, nombreservicio, iconoservicio, nombrevaloracion) VALUES (1,"cocina", 2,"falta algo");
INSERT INTO datos(idservicio, nombreservicio, iconoservicio, nombrevaloracion) VALUES (1,"cocina", 2,"sobra algo");
INSERT INTO datos(idservicio, nombreservicio, iconoservicio, nombrevaloracion) VALUES (1,"cocina", 2,"seguro algo esta mal");
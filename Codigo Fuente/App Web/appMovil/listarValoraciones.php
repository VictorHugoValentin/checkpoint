<?php
header("Access-Control-Allow-Origin: *");
header('Content-Type: application/json; charset=utf-8');
require ('../lib/ConfiguracionBD.php');    
    
	//PARAMETROS DE LA BASE DE DATOS 
	$dns = "mysql:host=$bd_host;dbname=$bd_schema;charset=utf8";
	$user = $bd_usuario;
	$pass = $bd_clave;

try {
	$con = new PDO($dns, $user, $pass);

	if(!$con){
		echo "No se puede conectar a la base de datos";
	}
	$query = $con->prepare('SELECT valoraciones.idvaloraciones idvaloraciones, 
								   valoraciones.nombre nombre, 
								   valoraciones.tipo tipo, 
								   valoraciones.permite_descripcion permite_descripcion,
								   valoracion_reclamo.permite_foto permite_foto,
								   valoracion_rango.tipo_valores tipo_valores,
								   valoracion_reclamo.permite_email permite_email,
								   valoraciones.descripcion descripcion,
								   valoraciones.fk_servicios_idservicios idservicios				      
						    FROM valoraciones 
								LEFT JOIN valoracion_rango 
									ON valoracion_rango.valoraciones_idvaloraciones = valoraciones.idvaloraciones  
								LEFT JOIN valoracion_reclamo 
									ON valoracion_reclamo.valoraciones_idvaloraciones = valoraciones.idvaloraciones  
							WHERE habilitado = 1');

		$query->execute();

		$registros = "[";

		while($result = $query->fetch()){
			if ($registros != "[") {
				$registros .= ",";
			}
			$registros .= '{"idvaloracion": "'.$result["idvaloraciones"].'",';
			$registros .= '"nombrevaloracion": "'.$result["nombre"].'",';
			$registros .= '"tipovaloracion": "'.$result["tipo"].'",';
			$registros .= '"permite_descripcion": "'.$result["permite_descripcion"].'",';
			$registros .= '"permite_foto": "'.$result["permite_foto"].'",';
			$registros .= '"tipo_valores": "'.$result["tipo_valores"].'",';
			$registros .= '"permite_email": "'.$result["permite_email"].'",';
			$registros .= '"descripcion": "'.$result["descripcion"].'",';
			$registros .= '"servicio": "'.$result["idservicios"].'"}';
		}
		$registros .= "]";
		echo $registros;

} catch (Exception $e) {
	echo "Erro: ". $e->getMessage();
};

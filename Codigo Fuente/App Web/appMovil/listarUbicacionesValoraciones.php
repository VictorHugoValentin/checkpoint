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
	$query = $con->prepare('SELECT idubicacion_valoracion, fk_ubicacion_idubicacion, 
								   fk_valoraciones_idvaloraciones  
							FROM ubicacion_valoracion');

		$query->execute();

		$registros = "[";

		while($result = $query->fetch()){
			if ($registros != "[") {
				$registros .= ",";
			}
			$registros .= '{"idubicacion_valoracion": "'.$result["idubicacion_valoracion"].'",';
			$registros .= '"ubicacion": "'.$result["fk_ubicacion_idubicacion"].'",';
			$registros .= '"valoracion": "'.$result["fk_valoraciones_idvaloraciones"].'"}';
		}
		$registros .= "]";
		echo $registros;



} catch (Exception $e) {
	echo "Erro: ". $e->getMessage();
};

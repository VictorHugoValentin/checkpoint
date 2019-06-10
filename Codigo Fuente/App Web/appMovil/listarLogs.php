<?php
header("Access-Control-Allow-Origin: *");
header('Content-Type: text/html; charset=utf-8');
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
	
	$query = $con->prepare('SELECT  MAX(idlog) idlog  FROM log');

		$query->execute();

		$registros = "[";

		while($result = $query->fetch()){
			if ($registros != "[") {
				$registros .= ",";
			}
			$registros .= '{"idlog": "'.$result["idlog"].'"}';
		}
		$registros .= "]";
		echo $registros;



} catch (Exception $e) {
	echo "Erro: ". $e->getMessage();
};

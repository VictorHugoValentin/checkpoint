<?php
header("Access-Control-Allow-Origin:http://localhost:8100");
header("Content-Type: application/x-www-form-urlencoded");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
require ('../lib/ConfiguracionBD.php');      
    
	//PARAMETROS DE LA BASE DE DATOS 
	$dns = "mysql:host=$bd_host;dbname=$bd_schema";
	$user = $bd_usuario;
	$pass = $bd_clave;

    //RECUPERAR DATOS DEL FORMULARIO
    $data = file_get_contents("php://input");
    $objData = json_decode($data);
    
    // ASIGNAR LOS VALORES A LA VARIABLE
	$idservicio = $objData->idservicio;
	$idvaloracion = $objData->idvaloracion;
   
    
    // lIMPIAR LOS DATOS 
    $idservicio = stripslashes($idservicio);
    $idvaloracion = stripslashes($idvaloracion);
    $idservicio = trim($idservicio);
    $idvaloracion = trim($idvaloracion);
	
	try {
		$con = new PDO($dns, $user, $pass);
		
		//Existe BD
		if($con){
			$query = $con->prepare('SELECT  habilitado  FROM servicios WHERE idservicios = '.$idservicio); // <---- Cambiar Tabla de "Servicios" a "Servicio"
			$query->execute();
			if($result["habilitado"] == 1) {
				$query = $con->prepare('SELECT  habilitado  FROM valoraciones WHERE nombre LIKE "'.$idvaloracion).'"'; // <---- Cambiar Tabla de "Valoraciones" a "Valoracion"
				$query->execute();
				if($result["habilitado"] == 1) {
					$registros = '[{"resultado": "1"}]';
					echo $registros;
				}else{
					$registros = '[{"resultado": "0"}]';
					echo $registros;
				}
			}else{
				$registros = '[{"resultado": "0"}]';
				echo $registros;
			}
		}else{
			$datos = array('mensaje' => "Error, no se puede conectar a la base de datos");
			echo json_encode($datos);
		};
	}catch (Exception $e) {
		echo "Error: ". $e->getMessage();
	};
	
    ?>
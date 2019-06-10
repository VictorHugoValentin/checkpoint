<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
require ('../lib/ConfiguracionBD.php');    
    
    
	//PARAMETROS DE LA BASE DE DATOS 
	$dns = "mysql:host=$bd_host;dbname=$bd_schema;charset=utf8";
	$user = $bd_usuario;
	$pass = $bd_clave;

	
	//RECUPERAR DATOS DEL FORMULARIO
	$data = file_get_contents('php://input');

    if (isset($data)) {

        $objData = json_decode($data);

        $ubicacionValoracion = $objData->ubicacionValoracion;
		$descripcion = $objData->descripcion;
		$tipo = $objData->tipo;
		$valoracion = $objData->valoracion; 
		$foto = $objData->foto;
		$email = $objData->email;
                }

	// lIMPIAR LOS DATOS 
	$ubicacionValoracion = stripslashes($ubicacionValoracion);
    $descripcion = stripslashes($descripcion);
    $tipo = stripslashes($tipo);
	$valoracion = stripslashes($valoracion);
	$foto = stripslashes($foto);
	$email = stripslashes($email);
	
	if ($foto != null) {
	//ARMAR IMAGEN Y GUARDARLA
	$fecha = new DateTime();
	$nombre_val = $fecha->getTimestamp().".jpg";
	$base64_string = str_replace('data:image/jpeg;base64,', '', $foto);
	$base64_string = str_replace(' ', '+', $base64_string);
	$decoded = base64_decode($base64_string);
	//$decoded = base64_decode($foto);
	$path_imagen = "../img_valoracion/".$nombre_val;
	file_put_contents($path_imagen, $decoded); // Carpeta donde se guarda
	}
	//INSERTAR VALORACION
  
    $con = new PDO($dns, $user, $pass);
   
    if($con){
		$query = $con->prepare('SELECT MAX(idvaloracion_hecha) idvaloracion_hecha FROM valoracion_hecha 
								WHERE 1 
								ORDER BY idvaloracion_hecha DESC 
								LIMIT 1');
		$query->execute();

		if($result = $query->fetch()){
			$idValoracionHecha = $result["idvaloracion_hecha"];
			$idValoracionHecha = $idValoracionHecha + 1;
		}
		
		if($descripcion == ''){
			$sql = "INSERT INTO valoracion_hecha (idvaloracion_hecha, ubicacion_valoracion_idubicacion_valoracion, tipo, fecha) 
				VALUES('".$idValoracionHecha."', '".$ubicacionValoracion."', '".$tipo."', CURRENT_TIMESTAMP)";
    	$query = $con->prepare($sql);
		$query ->execute();
		
		if($tipo == 'rango'){
			$sql = "INSERT INTO valoracion_hecha_rango (valor, idvaloracion_hecha) 
					VALUES('".$valoracion."', '".$idValoracionHecha."')";
			$query = $con->prepare($sql);
			$query ->execute();
		}else{
			if ($foto != '') {
				if($email == ''){
					$sql = "INSERT INTO valoracion_hecha_reclamo (url_imagen, idvaloracion_hecha) 
							VALUES( '".$path_imagen."' , '".$idValoracionHecha."' )";
					$query = $con->prepare($sql);
					$query ->execute();

				}else{
					$sql = "INSERT INTO valoracion_hecha_reclamo (url_imagen, email_devolucion, idvaloracion_hecha) 
							VALUES( '".$path_imagen."' , '".$email."' , '".$idValoracionHecha."' )";
					$query = $con->prepare($sql);
					$query ->execute();
				}
			}else{
				if($email == ''){
					$sql = "INSERT INTO valoracion_hecha_reclamo (idvaloracion_hecha) 
						VALUES('".$idValoracionHecha."' )";
					$query = $con->prepare($sql);
					$query ->execute();
				}else{
					$sql = "INSERT INTO valoracion_hecha_reclamo (email_devolucion, idvaloracion_hecha) 
						VALUES('".$email."' , '".$idValoracionHecha."' )";
					$query = $con->prepare($sql);
					$query ->execute();
				}
			}
		}
		
		}else{
		$sql = "INSERT INTO valoracion_hecha (idvaloracion_hecha, ubicacion_valoracion_idubicacion_valoracion, descripcion, tipo, fecha) 
				VALUES('".$idValoracionHecha."', '".$ubicacionValoracion."', '".$descripcion."', '".$tipo."', CURRENT_TIMESTAMP)";
    	$query = $con->prepare($sql);
		$query ->execute();
		
		if($tipo == 'rango'){
			$sql = "INSERT INTO valoracion_hecha_rango (valor, idvaloracion_hecha) 
					VALUES('".$valoracion."', '".$idValoracionHecha."')";
			$query = $con->prepare($sql);
			$query ->execute();
		}else{
			if ($foto != '') {
				if($email == ''){
					$sql = "INSERT INTO valoracion_hecha_reclamo (url_imagen, idvaloracion_hecha) 
							VALUES( '".$path_imagen."' , '".$idValoracionHecha."' )";
					$query = $con->prepare($sql);
					$query ->execute();
				}else{
					$sql = "INSERT INTO valoracion_hecha_reclamo (url_imagen, email_devolucion, idvaloracion_hecha) 
							VALUES( '".$path_imagen."' , '".$email."' , '".$idValoracionHecha."' )";
					$query = $con->prepare($sql);
					$query ->execute();
				}
			}else{
				if($email == ''){
					$sql = "INSERT INTO valoracion_hecha_reclamo ( idvaloracion_hecha) 
						VALUES('".$idValoracionHecha."' )";
					$query = $con->prepare($sql);
					$query ->execute();
				}else{
					$sql = "INSERT INTO valoracion_hecha_reclamo (email_devolucion, idvaloracion_hecha) 
						VALUES('".$email."' , '".$idValoracionHecha."' )";
					$query = $con->prepare($sql);
					$query ->execute();
				}
			}
		}
		}
			
		if(!$query){
			$registros = '[{"idValoracionHecha":"-1"}]';
			echo $registros;
		}else{
			$registros = '[{"idValoracionHecha":"'.$idValoracionHecha.'"}]';
			echo $registros;
		};
	}
    ?>
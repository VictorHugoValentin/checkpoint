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
//$data = '[{"idValoracionHecha":"1"},{"idValoracionHecha":"6"}]';
if (!empty($data)) {
try{
    $objData = json_decode($data);

    $con = new PDO($dns, $user, $pass);

    if ($con) {
        $array = array();
        for ($i = 0; $i < count($objData); $i++) {
            $valor = $objData[$i];
            $idValoracionHecha = $valor->idValoracionHecha;
            $idValoracionHecha = stripslashes($idValoracionHecha);
            $query = $con->prepare('SELECT vh.idvaloracion_hecha,IF(cev.estado is null, "creado", cev.estado) as estado,cev.fecha as ultimocambio  '
                    . 'FROM checkpoint.valoracion_hecha vh '
                    . 'left join (select idcambio_estado_valoracion,estado,fecha,fk_valoracion_hecha_idvaloracion_hecha from checkpoint.cambio_estado_valoracion order by fecha desc) cev on cev.fk_valoracion_hecha_idvaloracion_hecha=vh.idvaloracion_hecha '
                    . 'WHERE vh.idvaloracion_hecha = ' . $idValoracionHecha);
            if($query->execute()){
                $result = $query->fetchObject();
                array_push($array, $result);
            }else{
                throw new Exception("error consulta");
            }
        }
        $respuesta = array("error" => 0, "respuesta" => $array);
    }else{
        $respuesta = array("error" => 1, "respuesta" => "No se pudo conectar");
    }
} catch (Exception $ex){
    $respuesta = array("error" => 1, "respuesta" => "No se pudo obtener datos");
}
}else{
    $respuesta = array("error" => 1, "respuesta" => "No se proporcionaron datos para consultar");
}
echo json_encode($respuesta);
?>
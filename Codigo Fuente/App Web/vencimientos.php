<?php

//header("Access-Control-Allow-Origin:http://localhost:8100");
//header("Content-Type: application/x-www-form-urlencoded");
//header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
//PARAMETROS DE LA BASE DE DATOS 
$dns = "mysql:host=localhost;dbname=checkpoint;charset=utf8";
$user = 'root';
$pass = '';

//INSERTAR VALORACION

$con = new PDO($dns, $user, $pass);

if ($con) {
    $query = $con->prepare("SELECT vh.idvaloracion_hecha, vh.fecha as 'Fecha 1', uv.fk_valoraciones_idvaloraciones, vr.vencimiento, cev.idcambio_estado_valoracion, cev.fecha as 'Fecha 2'
        FROM valoracion_hecha vh
        INNER JOIN ubicacion_valoracion uv
        ON (vh.ubicacion_valoracion_idubicacion_valoracion = uv.idubicacion_valoracion)
        INNER JOIN valoracion_reclamo vr
        ON (uv.fk_valoraciones_idvaloraciones = vr.valoraciones_idvaloraciones)
        INNER JOIN cambio_estado_valoracion cev
        ON (vh.idvaloracion_hecha = cev.fk_valoracion_hecha_idvaloracion_hecha)
        WHERE tipo LIKE 'reclamo'
        AND cev.idcambio_estado_valoracion IN
        (
        SELECT a.idcambio_estado_valoracion
        FROM (
        SELECT idcambio_estado_valoracion, fecha, estado, fk_valoracion_hecha_idvaloracion_hecha
        FROM cambio_estado_valoracion
        WHERE fecha IN (
        SELECT max(fecha)
        FROM cambio_estado_valoracion
        GROUP BY fk_valoracion_hecha_idvaloracion_hecha
        )
        ) a
        )");
    $query->execute();

    while ($result = $query->fetch()) {

        $idVal = $result["idvaloracion_hecha"];
        $fechaVal = $result["Fecha 1"];
        $vencVal = $result["vencimiento"];

        $time = strtotime($fechaVal);
        $newformat = date('Y-m-d', $time);

        $sumado = date('Y-m-d', strtotime($newformat . "+" . $vencVal . " days"));
        $actual = date("Y-m-d", time());

        //echo '<br>'.$idVal.' - '.$newformat.' - '.$sumado.' - '.$vencVal.' - '.$actual.'<br>';
        if ($sumado < $actual) {
            //echo 'Esta Vencido<br>';
            // Cambiar Estado a Vencido
            $sql = "INSERT INTO cambio_estado_valoracion (idcambio_estado_valoracion, estado, fecha, fk_valoracion_hecha_idvaloracion_hecha) 
				VALUES(NULL, 'vencido', CURRENT_TIMESTAMP, '" . $idVal . "')";

            $query = $con->prepare($sql);
            $query->execute();

            if (!$query) {
                $datos = array('mensaje' => "No se ha registrado! ");
                echo json_encode($datos);
            } else {
                $datos = array('mensaje' => "Los datos se ingrearon correctamente");
                echo json_encode($datos);
            };
        }
    }
} else {
    $datos = array('mensaje' => "Error, intente nuevamente");
    echo json_encode($datos);
}

echo '<br>';
//echo var_dump($query);
echo '<br>';
?>
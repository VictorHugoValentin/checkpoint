<?php
require_once '../lib/ObjetoDatos.class.php';
require_once '../lib/Constantes.class.php';
$idservicio = $_POST['idservicio'];
$resultados = ObjetoDatos::getInstancia()->ejecutarQuery(""
        . "select idvaloraciones, nombre, descripcion "
        . "FROM " . Constantes::BD_SCHEMA . ".valoraciones "
        . "where fk_servicios_idservicios={$idservicio} and tipo='rango' "
        . " ORDER BY nombre ASC ");
if (!$resultados) {
    
} else {
    $rows = array();
    while ($r = $resultados->fetch_assoc()) {
        $rows[] = $r;
    }
}
header("Content-type:application/json");
print json_encode($rows);

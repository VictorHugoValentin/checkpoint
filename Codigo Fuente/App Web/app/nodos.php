<?php
/*include_once '../lib/ControlAcceso.class.php';
ControlAcceso::requierePermiso(PermisosSistema::PERMISO_UBICACION);*/
require_once 'gestorUbicacion.class.php';
$respuesta = 1;
try{
    $ubicacion = new gestorUbicacion();
    $ubicacion->obtenerArbol();
}catch(Exception $ex){
    $respuesta = 0;
}
?>
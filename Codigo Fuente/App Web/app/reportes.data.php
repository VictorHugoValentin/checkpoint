<?php

header('Content-Type: application/json');
include_once '../lib/ControlAcceso.class.php';
ControlAcceso::requierePermiso(PermisosSistema::PERMISO_REPORTES);

try {
    /* numero total de valoraciones hechas para un servicio determinado */
    $resultados = ObjetoDatos::getInstancia()->ejecutarQuery(""
            . "SELECT count(*) as total 
            FROM " . Constantes::BD_SCHEMA . ".valoracion_hecha vh
            JOIN " . Constantes::BD_SCHEMA . ".ubicacion_valoracion uv ON vh.ubicacion_valoracion_idubicacion_valoracion=uv.idubicacion_valoracion
            JOIN " . Constantes::BD_SCHEMA . ".valoraciones v ON v.idvaloraciones=uv.fk_valoraciones_idvaloraciones
            WHERE v.fk_servicios_idservicios = " . $_POST['idservicio']);
    if($resultados){
        $total_vh = $resultados->fetch_assoc();
        $numtotal_vh = $total_vh['total'];
    }
    
    /* numero de valoraciones puestas a disposicion para un servicio determinado */
    $valoracionesexistentes = "select count(*) as cantidadvaloracionesdisponibles from valoraciones where fk_servicios_idservicios=".$_POST['idservicio'];
    $resultados = ObjetoDatos::getInstancia()->ejecutarQuery($valoracionesexistentes);
    if($resultados){
        $total_ve = $resultados->fetch_assoc();
        $numtotal_ve = $total_ve['cantidadvaloracionesdisponibles'];
    }
    $arraytotal = array();
    /* todas las valoraciones de tipo reclamo puestas a disposicion para un servicio determinado */
    $valoracionesexistentes = "select idvaloraciones, nombre, tipo, descripcion from valoraciones where fk_servicios_idservicios=".$_POST['idservicio'];
    $resultados = ObjetoDatos::getInstancia()->ejecutarQuery($valoracionesexistentes);
    if($resultados){
        while( $una_ve = $resultados->fetch_assoc()){
            /* por cada valoracion, obtengo el numeto total de valoraciones hechas */
            $idvaloracion = $una_ve['idvaloraciones'];
            
            /* todas las valoraciones puestas a disposicion para un servicio determinado */
            $queryvaloracionesxidvaloracion = "SELECT count(*) as totalhechas ".
                "FROM checkpoint.valoracion_hecha vh ".
                "JOIN ubicacion_valoracion uv ON vh.ubicacion_valoracion_idubicacion_valoracion=uv.idubicacion_valoracion ".
                "JOIN valoraciones v ON v.idvaloraciones=uv.fk_valoraciones_idvaloraciones ".
                "WHERE v.fk_servicios_idservicios=".$_POST['idservicio']." and v.idvaloraciones=$idvaloracion;";
            $resultadosxvaloracion = ObjetoDatos::getInstancia()->ejecutarQuery($queryvaloracionesxidvaloracion);
            $res = $resultadosxvaloracion->fetch_assoc();
            $resxvaloracion = $res['totalhechas'];
            $acumulado = array("idvaloraciones" => $idvaloracion, 
                "nombre"  => $una_ve['nombre'], 
                "descripcion"  => $una_ve['descripcion'], 
                "tipo"   => $una_ve['tipo'],
                "cantidad" => $resxvaloracion);
            array_push($arraytotal, $acumulado);
        }
    }

} catch (Exception $e) {
    $error = $e->getMessage();
    //var_dump($e);
}
if (!$resultados) {
    throw new Exception($error);
}

echo json_encode($arraytotal);
?>
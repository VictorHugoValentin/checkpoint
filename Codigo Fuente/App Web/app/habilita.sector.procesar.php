<?php
include_once '../lib/ControlAcceso.class.php';
ControlAcceso::requierePermiso(PermisosSistema::PERMISO_HABILITA_EN_SECTOR);

$mensaje = "Se ha asociado la ubicacon y la valoracion con exito.";

$ubicacionesPOST = json_decode($_POST['seleccionados']);
//var_dump($ubicacionesPOST);
//$array_ubicaciones = json_decode($///)
//$array_ubicaciones =$_POST['ubicacion'];
$array_ubicaciones = $ubicacionesPOST;
var_dump($array_ubicaciones);
    if (isset($_POST['idvaloracion'])){
        ObjetoDatos::getInstancia()->autocommit(false);
        ObjetoDatos::getInstancia()->begin_transaction();
        
        //en este punto para que no haya problema de que ya esta asociado la valoracion, elimino las asociaciones y establezco las nuevas
        try {
            //eliminacion de las asociaciones previas, para que queden las nuevas.
            ObjetoDatos::getInstancia()->ejecutarQuery(""
                        . "DELETE FROM " . Constantes::BD_USERS . ".ubicacion_valoracion "
                        . "WHERE fk_valoraciones_idvaloraciones = {$_POST['idvaloracion']}");
                        
            foreach ($array_ubicaciones as $key => $value) {
                echo "query".ObjetoDatos::getInstancia()->ejecutarQuery(""
                        . "INSERT INTO " . Constantes::BD_USERS . ".ubicacion_valoracion "
                        . "(idubicacion_valoracion, fk_ubicacion_idubicacion, fk_valoraciones_idvaloraciones)"
                        . "VALUES (NULL, {$value}, {$_POST['idvaloracion']})"
                );
                        echo ""
                        . "INSERT INTO " . Constantes::BD_USERS . ".ubicacion_valoracion "
                        . "(idubicacion_valoracion, fk_ubicacion_idubicacion, fk_valoraciones_idvaloraciones)"
                        . "VALUES (NULL, {$value}, {$_POST['idvaloracion']})";
            }
            echo "comit:".ObjetoDatos::getInstancia()->commit();
        }catch (Exception $exc) {
            $mensaje = "Ha ocurrido un error. "
                . "Codigo de error MYSQL: " . $exc->getCode() . ". ";
            echo $mensaje;
            ObjetoDatos::getInstancia()->rollback();
        }
        ObjetoDatos::getInstancia()->autocommit(TRUE);
    }else{
        //no hay valoracion seleccionada sobre la cual trabajar
        $mensaje = "No se ha asociado la ubicacon y la valoracion con exito. No hay valoracion seleccionada sobre la cual trabajar";
    }
    echo $mensaje;
?>
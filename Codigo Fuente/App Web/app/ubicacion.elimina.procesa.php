<?php
include_once '../lib/ControlAcceso.class.php';
ControlAcceso::requierePermiso(PermisosSistema::PERMISO_UBICACION);
require_once 'gestorUbicacion.class.php';

//obtengo los valores POST
// -------------------------------------------------------------------
$idUbicacion_ = $_POST['idubicacioneliminar'];
// -------------------------------------------------------------------
$respuesta = FALSE;
$mensaje = "<b>¡Bien Hecho!</b> La Ubicaci&oacute;n ha sido eliminada con exito.";
try {
    $ubicacion = new gestorUbicacion();
    if(! $ubicacion->tieneDependencia($idUbicacion_)){
        if(! $ubicacion->esRaiz($idUbicacion_)){
            $respuesta = $ubicacion->eliminarUbicacion($idUbicacion_);
        }else{
            $mensaje = "No se pude eliminar esta ubicaci&oacute;n por ser la última.";
        }
        
    }else{
        $respuesta = FALSE;
        $mensaje = "No se pude eliminar la ubicaci&oacute;n porque tiene ubicaciones dependientes";
    }
} catch (Exception $ex) {
    $respuesta = FALSE;
    $mensaje = $ex->getMessage();
}
?>
<html>
    <head>
        <title><?php echo Constantes::NOMBRE_SISTEMA; ?></title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
        <link href="../gui/estilo.css" type="text/css" rel="stylesheet" />
    </head>
    <body>
        <?php include_once '../gui/GUI.class.php';include_once '../gui/GUImenu.php'; ?>
        <section id="main-content">
            <article>
                <div class="content">
                    <h3>Elimnaci&oacute;n de Ubicaci&oacute;n</h3>

                    <?php
                    if($respuesta){
                        ?><div class="alert alert-success"><?php echo $mensaje; ?></div>
                    <?php
                    }else{ ?>
                        <div class="alert alert-danger"><?php echo $mensaje; ?></div>
                    <?php
                    }
                    ?>
                    
                    <a href="ubicacion.ver.php">
                        <input type="button" class="btn btn-primary" value="Ver Ubicaciones" />
                    </a>

                </div>
            </article>
        </section>
        <?php include_once '../gui/GUIfooter.php'; ?>
    </body>
</html>

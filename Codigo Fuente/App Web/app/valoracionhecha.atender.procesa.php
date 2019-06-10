<?php
include_once '../lib/ControlAcceso.class.php';
ControlAcceso::requierePermiso(PermisosSistema::PERMISO_OPCIONES_VALORACION);
require_once '../lib/ObjetoDatos.class.php';

$mensaje = "La Valoracion realizada ha sido atendida con éxito.";

//obtengo los valores POST
// -------------------------------------------------------------------
$idvaloracionhecha = $_POST['idvaloracionhecha'];
$nuevoestado = isset($_POST['cambioestado'])?'terminado':'terminado';//tiene que pasar a terminado
$nombrevaloracion = $_POST['nombrevaloracion'];
// -------------------------------------------------------------------
//  guardo en la base de datos
try {
    $resultados = ObjetoDatos::getInstancia()->ejecutarQuery(""
            . "INSERT INTO " . Constantes::BD_SCHEMA . ".cambio_estado_valoracion(idcambio_estado_valoracion,estado,fecha,fk_valoracion_hecha_idvaloracion_hecha) "
            . "VALUES (null, '{$nuevoestado}',CURRENT_TIMESTAMP,{$idvaloracionhecha})");
    if ($resultados) {
        //todo ok
        $respuesta = true;
    } else {
        //hubo error
        $error = ObjetoDatos::getInstancia()->error;
        $errorestado = ObjetoDatos::getInstancia()->sqlstate;
        $respuesta = false;
        $mensaje = "No se registró con éxito la atención del reclamo. $error :: $errorestado";
    }
} catch (Exception $exc) {
    $respuesta = false;
    $mensaje = "No se registró con éxito la atención del reclamo debido a inconvenientes.";
}
//-------------------------------------------------------------------
?>
<html>
    <head>
        <title><?php echo Constantes::NOMBRE_SISTEMA; ?></title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
        <link href="../gui/estilo.css" type="text/css" rel="stylesheet" />
    </head>
    <body>
        <?php include_once '../gui/GUI.class.php';
        include_once '../gui/GUImenu.php'; ?>
        <section id="main-content">
            <article>
                <div class="content">
                    <h3>La atencion del reclamo <strong><?php echo $nombrevaloracion;?></strong></h3>
                    <?php if ($respuesta) { $estilomensaje = "success";} else{$estilomensaje="danger";} ?>
                        <div class="alert alert-<?php echo $estilomensaje; ?>"><?php echo $mensaje; ?></div>
                    <div class="row">
                        <p>Opciones</p>
                        <form action="valoracionhecha.php" method="POST">
                            <input type="submit" class="btn btn-primary" value="Ver Valoraciones Hechas" />
                        </form>
                    </div>
                </div>
            </article>
        </section>
        <?php include_once '../gui/GUIfooter.php'; ?>
    </body>
</html>
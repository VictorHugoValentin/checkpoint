<?php
include_once '../lib/ControlAcceso.class.php';
ControlAcceso::requierePermiso(PermisosSistema::PERMISO_OPCIONES_VALORACION);
require_once './gestorValoracionRango.php';
require_once './gestorValoracionReclamo.php';

$respuesta = FALSE;
//$mensaje = "<b>¡Bien Hecho!</b> La Valoración ha sido habilitada/deshabilitada con éxito.";
$atencion = false;
if (isset($_GET['habilitado']) && isset($_GET['id']) && isset($_GET['tipo'])) {
    $idValoracion = $_GET['id'];
    $habilitado = $_GET['habilitado'];
    if ($habilitado == 1) {
        $tipo = "Deshabilitaci&oacute;n";
    }else{
        $tipo = "Habilitaci&oacute;n";
    }
    $tipoValoracion = $_GET['tipo'];

    try {
        if ($tipoValoracion == "Reclamo") {
            $miValoracion = new gestorValoracionReclamo();
            if ($habilitado == "1") {
                $mensaje = "<b>¡Bien Hecho!</b>La valoraci&oacute;n se deshabilit&oacute; con &eacute;xito.";
                $respuesta = $miValoracion->deshabilitarReclamo($idValoracion);
            } else {
                /* ----------------  HABILITACION  ------------------- */
                $mensaje = "<b>¡Bien Hecho!</b>La valoraci&oacute;n ha sido habilitada con &eacute;xito.";
                $respuesta = $miValoracion->habilitarReclamo($idValoracion);
            }
        } else {
             $miValoracion = new gestorValoracionRango();
            if ($habilitado == "1") {
                $mensaje = "<b>¡Bien Hecho!</b>La valoraci&oacute;n se deshabilit&oacute; con &eacute;xito.";
                $respuesta = $miValoracion->deshabilitarRango($idValoracion);
            } else {
                /* ----------------  HABILITACION  ------------------- */
                $mensaje = "<b>¡Bien Hecho!</b>La valoraci&oacute;n ha sido habilitada con &eacute;xito.";
                $respuesta = $miValoracion->habilitarRango($idValoracion);
            }
        }
    } catch (Exception $ex) {
        if($ex->getCode() == 1){
            $respuesta = true;
            $atencion = true;
            $mensajeatencion = $ex->getMessage();
        }else{
            $respuesta = FALSE;
            $mensaje = "No se pude deshabilitar la valoraci&oacute;n por problemas.";
        }
    }
} else {
    //faltan parametros
    $respuesta = FALSE;
    $mensaje = "No se pude deshabilitar la valoraci&oacute;n por falta de parametros.";
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
                    <h3><?php echo $tipo; ?> de Valoración</h3>

                    <?php
                    if ($respuesta) {
                        ?><div class="alert alert-success"><?php echo $mensaje; ?></div>
                    <?php if($atencion){
                    ?><div class="alert alert-warning"><?php echo $mensajeatencion; ?></div>
                    <?php }                    
                    } else {
                        ?>
                        <div class="alert alert-danger"><?php echo $mensaje; ?></div>
                        <?php
                    }
                    ?>
                    <form action="valoracion.ver.php" method="POST">
                        <input type="submit" class="btn btn-primary" value="Ver Valoraciones" />
                        <input type="hidden" name="idservicio" value="<?php echo $_GET['idservicio'];?>" />
                            <!-- agregar esto en los otros abms para que redireccione con el mismo servicio -->
                    </form>
                </div>
            </article>
        </section>
        <?php include_once '../gui/GUIfooter.php'; ?>
    </body>
</html>
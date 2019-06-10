<?php
include_once '../lib/ControlAcceso.class.php';
ControlAcceso::requierePermiso(PermisosSistema::PERMISO_SERVICIOS);
require_once 'gestorServicio.class.php';

$respuesta = FALSE;
$mensaje = "<b>¡Bien Hecho!</b> La Ubicaci&oacute;n ha sido eliminada con exito.";
if (isset($_GET['habilitado']) && isset($_GET['id'])) {
    $idServicio = $_GET['id'];
    $habilitado = $_GET['habilitado'];

    try {
        $miServicio = new gestorServicio();
        if ($habilitado == 1) {
            $respuesta = $miServicio->deshabilitarServicio($idServicio);
            $mensaje = "<b>¡Bien Hecho!</b> El servicio se deshabilit&oacute; con &eacute;xito.";
            $tipo = "Deshabilitaci&oacute;n";
        } else {
            /* ----------------  HABILITACION  ------------------- */
            $tipo = "Habilitaci&oacute;n";
            $respuesta = $miServicio->habilitarServicio($idServicio);
            $mensaje = "<b>¡Bien Hecho!</b> El servicio ha sido habilitado con &eacute;xito.";
        }
    } catch (Exception $ex) {
        $respuesta = FALSE;
        $mensaje = "No se pude deshabilitar el servicio por problemas.";
    }
} else {
    //faltan parametros
    $respuesta = FALSE;
    $mensaje = "No se pude deshabilitar el servicio por falta de parametros.";
}
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
                    <h3><?php echo $tipo; ?> de Servicios</h3>

                    <?php
                    if ($respuesta) {
                        ?><div class="alert alert-success"><?php echo $mensaje; ?></div>
                    <?php } else {
                        ?>
                        <div class="alert alert-danger"><?php echo $mensaje; ?></div>
                        <?php
                    }
                    ?>

                    <a href="servicios.ver.php">
                        <input type="button" class="btn btn-primary" value="Ver Servicios" />
                    </a>

                </div>
            </article>
        </section>
<?php include_once '../gui/GUIfooter.php'; ?>
    </body>
</html>

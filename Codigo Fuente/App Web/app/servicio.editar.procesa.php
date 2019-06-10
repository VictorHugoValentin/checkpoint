<?php
include_once '../lib/ControlAcceso.class.php';
ControlAcceso::requierePermiso(PermisosSistema::PERMISO_SERVICIOS);
include '../lib/funcionauxiliar.php';
$mensaje = "El Servicio ha sido modificado con éxito.";
$exito = FALSE;

//print_r($_POST);
if (isset($_POST['mismo'])) {
    $email = '';
} else {
    //tiene que haber especificado un email
    if (isset($_POST['email'])) {
        $email = $_POST['email'];
    } else {
        $email = '';
    }
}

try {
    //verificar si es que tiene valoraciones cargadas para el caso de habilitacion
    include './gestorServicio.class.php';
    $miGestorServicio = new gestorServicio();

    $miServicio = $miGestorServicio->obtenerServicio($_POST['idservicio']);
    $miServicio->setEmail(mb_strtolower($email, "UTF-8"));
    $miServicio->setNombre(mb_ucfirst(mb_strtolower($_POST['nombre'], "UTF-8")));
    $miServicio->setDescripcion(mb_ucfirst(mb_strtolower($_POST['descripcion'], "UTF-8")));
    $miServicio->setIcono($_POST['selecticon']);
    $miServicio->setEncargado($_POST['idencargado']);
    $resultado = $miGestorServicio->modificarServicio($miServicio);
    if ($resultado) {
        $exito = TRUE;
    } else {
        $mensaje = "No se pudieron registrar los cambios solicitados";
    }
} catch (Exception $exc) {
    $mensaje = $exc->getMessage();
}
?>
<html>
    <head>
        <title><?php echo Constantes::NOMBRE_SISTEMA; ?></title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf8">
        <link href="../gui/estilo.css" type="text/css" rel="stylesheet" />
        <script src="../lib/jQuery/jquery-3.2.1.min.js" type="text/javascript"></script>
    </head>
    <body>
        <?php include_once '../gui/GUI.class.php';
        include_once '../gui/GUImenu.php'; ?>
        <section id="main-content">
            <article>
                <div class="content">
                    <h3>Edici&oacute;n de Servicios</h3>
                    <?php if ($exito) { ?>
                        <div class="alert alert-success"><?php echo $mensaje; ?></div>
                    <?php } else { ?>
                        <div class="alert alert-danger"><?php echo $mensaje; ?></div>
                    <?php } ?>
                    <fieldset>
                        <legend>Opciones</legend>
                        <a href="servicios.ver.php">
                            <input type="button" class="btn btn-primary" value="Ver Servicios" />
                        </a>
                    </fieldset>    

                </div>
            </article>
        </section>
        <?php include_once '../gui/GUIfooter.php'; ?>
    </body>
</html>

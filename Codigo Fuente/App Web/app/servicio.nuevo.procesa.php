<?php
include_once '../lib/ControlAcceso.class.php';
ControlAcceso::requierePermiso(PermisosSistema::PERMISO_SERVICIOS);
include '../lib/funcionauxiliar.php';
$mensaje = "El Servicios ha sido agregado con éxito.";
$exito = false;
$class = "danger";
if (isset($_POST['nombre'])) {
    if (!isset($_POST['valoracion'])) {
        if (isset($_POST['email'])) {
            $email = mb_strtolower($_POST['email'],"UTF-8");
        } else {
            $email = '';
        }
    } else {
        $email = '';
    }

    $estado = 0;       //cuando es nuevo, tiene que estar deshabilitado

    try {
        include './gestorServicio.class.php';
        $miGestorServicio = new gestorServicio();
        $puedeActualizar = TRUE;

        if ($puedeActualizar) {

            $miServicio = new Servicio();
            $miServicio->setEmail($email);
            $miServicio->setNombre(mb_ucfirst(mb_strtolower($_POST['nombre'],"UTF-8")));
            $miServicio->setDescripcion(mb_ucfirst(mb_strtolower($_POST['descripcion'],"UTF-8")));
            $miServicio->setHabilitado($estado);
            $miServicio->setIcono($_POST['selecticon']);
            $miServicio->setEncargado($_POST['idencargado']);
            $resultado = $miGestorServicio->agregarServicio($miServicio);
            if ($resultado) {
                $exito = TRUE;
                $class = "success";
            } else {
                $mensaje = "No se pudo registrar el nuevo Servicio.";
            }
        } else {
            $mensaje = "No es posible agregar el nuevo Servicio.";
        }


    } catch (Exception $exc) {
        $mensaje = $exc->getMessage();
    }
}
?>

<html>
    <head>
        <title><?php echo Constantes::NOMBRE_SISTEMA; ?></title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
        <link href="../gui/estilo.css" type="text/css" rel="stylesheet" />
        <script src="../lib/jQuery/jquery-3.2.1.min.js"></script>
    </head>
    <body onload="alerta();">
<?php include_once '../gui/GUI.class.php';include_once '../gui/GUImenu.php'; ?>
        <section id="main-content">
            <article>
                <div class="content">
                    <h3>Alta de Servicios</h3>
                    <div class="alert alert-<?php echo $class; ?>"><?php echo $mensaje; ?></div>
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

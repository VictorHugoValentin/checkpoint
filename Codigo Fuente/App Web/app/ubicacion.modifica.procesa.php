<?php
include_once '../lib/ControlAcceso.class.php';
ControlAcceso::requierePermiso(PermisosSistema::PERMISO_UBICACION);
require_once 'gestorUbicacion.class.php';
include '../lib/funcionauxiliar.php';

//obtengo los valores POST
// -------------------------------------------------------------------
$nombre_ = mb_ucfirst(mb_strtolower($_POST['nombrenuevo'],"UTF-8"));
$idubicacion_ = $_POST['idubicacion'];
// -------------------------------------------------------------------
$respuesta = false;
$mensaje = "<b>¡Bien Hecho!</b> La Ubicaci&oacute;n ha sido modificada con &eacute;xito.";

try{
    $gubicacion = new gestorUbicacion();
    $ubicacion = $gubicacion->obtenerUbicacion($idubicacion_);
    $ubicacion->setNombre($nombre_);
    $ubicacion->setCodigo_qr($nombre_);
    $respuesta = $gubicacion->modificarUbicacion($ubicacion);


}catch(Exception $ex){
    $respuesta = false;
    $mensaje = "<b>Atención:</b> {$ex->getMessage()}.";
}
if($respuesta){
    $class = "success";
}else{$class = "danger";}
?>
<html>
    <head>
        <title><?php echo Constantes::NOMBRE_SISTEMA; ?></title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
        <script src="../lib/jQuery/jquery-3.2.1.min.js"></script>
        <link href="../gui/estilo.css" type="text/css" rel="stylesheet" />
    </head>
    <body>
        <?php include_once '../gui/GUI.class.php';include_once '../gui/GUImenu.php'; ?>
        <section id="main-content">
            <article>
                <div class="content">
                    <h3>Modificaci&oacute;n de Ubicaci&oacute;n</h3>
                    
                    <div class="row">
                        <div class="col-md-7"><p class="alert alert-<?php echo $class; ?>"><?php echo $mensaje; ?></p>
                                
                                <p>Opciones</p>
                                <a href="ubicacion.ver.php">
                                    <input type="button" class="btn btn-primary" value="Ver Ubicaciones" />
                                </a>
                        </div>
                    </div>
                </div>
            </article>
        </section>
        <?php include_once '../gui/GUIfooter.php'; ?>
    </body>
</html>

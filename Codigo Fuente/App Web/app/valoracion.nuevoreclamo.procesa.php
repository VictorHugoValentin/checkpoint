<?php
include_once '../lib/ControlAcceso.class.php';
ControlAcceso::requierePermiso(PermisosSistema::PERMISO_OPCIONES_VALORACION);
require_once './gestorValoracionReclamo.php';
include '../lib/funcionauxiliar.php';

$mensaje = "La Valoración ha sido agregada con éxito.";

//obtengo los valores POST
// -------------------------------------------------------------------
$nombre = mb_ucfirst(mb_strtolower($_POST['nombre'],"UTF-8"));
$descripcion = mb_ucfirst(mb_strtolower($_POST['descripcion'],"UTF-8"));
if (isset($_POST['sinvencimiento'])) {
    /* coloco un valor indicativo, como negativo */
    $vencimiento = -1;
}else{
    /* el valor esta revisado por la forma en que se carga */
    $vencimiento = $_POST['vencimiento'];
}
$tipo = 'reclamo';  //se trata de un reclamo
$recibir_notificacion = isset($_POST['recibir_notificacion'])?1:0;
$permite_foto = isset($_POST['permite_foto'])?1:0;
$permite_descripcion = isset($_POST['permite_descripcion'])?1:0;
$permite_email = isset($_POST['permite_email'])?1:0;
$habilitado = isset($_POST['habilitado'])?1:0;
$idservicio = $_POST['idservicio'];
// -------------------------------------------------------------------
//  carga de los datos en un objeto
$vReclamo = new ValoracionReclamo();
$vReclamo->setNombre($nombre);
$vReclamo->setTipo($tipo);
$vReclamo->setRecibirNotificacionEmail($recibir_notificacion);
$vReclamo->setPermiteDescripcion($permite_descripcion);
$vReclamo->setHabilitado($habilitado);
$vReclamo->setFkIdservicio($idservicio);
$vReclamo->setDescripcion($descripcion);
$vReclamo->setPermiteFoto($permite_foto);
$vReclamo->setPermiteEmail($permite_email);
$vReclamo->setVencimiento($vencimiento);
//-------------------------------------------------------------------
$respuesta = 0;
try{
    $valoracion = new gestorValoracionReclamo();
    $respuesta = $valoracion->agregarValoracion($vReclamo);
    
}catch(Exception $ex){
    $respuesta = 0;
    $mensaje = $ex->getMessage();
}
?>
<html>
    <head>
        <title><?php echo Constantes::NOMBRE_SISTEMA; ?></title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
        <link href="../gui/estilo.css" type="text/css" rel="stylesheet" />
        <script src="../lib/jQuery/jquery-3.2.1.min.js"></script>
    </head>
    <body>
        <?php include_once '../gui/GUI.class.php';include_once '../gui/GUImenu.php'; ?>
        <section id="main-content">
            <article>
                <div class="content">
                    <h3>Alta de Valoraci&oacute;n de tipo Reclamo</h3>
                    <?php if($respuesta){ ?>
                        <div class="alert alert-success"><?php echo $mensaje; ?></div>
                    <?php }else{ ?>
                        <div class="alert alert-danger"><?php echo $mensaje; ?></div>
                    <?php } ?>
                    <div class="row">
                        <p>Opciones</p>
                        <form action="valoracion.ver.php" method="POST">
                            <input type="submit" class="btn btn-primary" value="Ver Valoraciones" />
                            <input type="hidden" name="idservicio" value="<?php echo $vReclamo->fk_idservicio;?>" />
                        </form>
                    </div>
                </div>
            </article>
        </section>
        <?php include_once '../gui/GUIfooter.php'; ?>
    </body>
</html>
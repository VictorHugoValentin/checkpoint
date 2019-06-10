<?php
include_once '../lib/ControlAcceso.class.php';
ControlAcceso::requierePermiso(PermisosSistema::PERMISO_OPCIONES_VALORACION);
require_once './gestorValoracionRango.php';
include '../lib/funcionauxiliar.php';
$mensaje = "La Valoración ha sido agregada con éxito.";

//obtengo los valores POST
// -------------------------------------------------------------------
$nombre = mb_ucfirst(mb_strtolower($_POST['nombre'],"UTF-8"));
$descripcion = mb_ucfirst(mb_strtolower($_POST['descripcion'],"UTF-8"));
$tipo = 'rango';  //se trata de un rango
$recibir_notificacion = isset($_POST['recibir_notificacion'])?1:0;
$permite_descripcion = isset($_POST['permite_descripcion'])?1:0;
$habilitado = isset($_POST['habilitado'])?1:0;
$idservicio = $_POST['idservicio'];
$tipo_valor = $_POST['tipo'];
// -------------------------------------------------------------------
//  carga de los datos en un objeto
$vRango = new ValoracionRango();
$vRango->setNombre($nombre);
$vRango->setTipo($tipo);
$vRango->setRecibirNotificacionEmail($recibir_notificacion);
$vRango->setPermiteDescripcion($permite_descripcion);
$vRango->setHabilitado($habilitado);
$vRango->setFkIdservicio($idservicio);
$vRango->setDescripcion($descripcion);
$vRango->setTipoValor($tipo_valor);
//-------------------------------------------------------------------
$respuesta = 0;
try{
    $valoracion = new gestorValoracionRango();
    $respuesta = $valoracion->agregarValoracion($vRango);
}catch(Exception $ex){
    $respuesta = 0;
    $mensaje = $ex->getMessage();
}
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
                    <h3>Alta de Valoraci&oacute;n de tipo Evaluativo</h3>
                    <?php if($respuesta){ ?>
                        <div class="alert alert-success"><?php echo $mensaje; ?></div>
                    <?php }else{ ?>
                        <div class="alert alert-danger"><?php echo $mensaje; ?></div>
                    <?php } ?>
                    <div class="row">
                        <p>Opciones</p>
                        <form action="valoracion.ver.php" method="POST">
                            <input type="submit" class="btn btn-primary" value="Ver Valoraciones" />
                            <input type="hidden" name="idservicio" value="<?php echo $vRango->fk_idservicio;?>" />
                        </form>
                    </div>
                </div>
            </article>
        </section>
        <?php include_once '../gui/GUIfooter.php'; ?>
    </body>
</html>
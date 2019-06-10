<?php
include_once '../lib/ControlAcceso.class.php';
ControlAcceso::requierePermiso(PermisosSistema::PERMISO_OPCIONES_VALORACION);
//require_once './gestorValoracionRango.php';
require_once './gestorValoracionHechas.php';
require_once './gestorServicio.class.php';

//paso por GET el id valoracion a atender y otros datos
$idvaloracionhecha = $_GET['id'];
$idservicio = $_GET['idservicio'];
try {
    $gVHechas = new gestorValoracionHechas();
    $vReclamo = $gVHechas->obtenerValoracionHecha($idvaloracionhecha);

    /* en esta parte pregunto sobre el estado. Si es creado, lo paso a espera ahora mismo. si es espera, decide en el formulario. */
    if ($vReclamo->estado === null) {

        $resultados = ObjetoDatos::getInstancia()->ejecutarQuery(""
                . "INSERT INTO " . Constantes::BD_SCHEMA . ".cambio_estado_valoracion(idcambio_estado_valoracion,estado,fecha,fk_valoracion_hecha_idvaloracion_hecha) "
                . "VALUES (null, 'espera',CURRENT_TIMESTAMP,{$idvaloracionhecha})");
        if (!$resultados) {
            //hubo error
            $error = ObjetoDatos::getInstancia()->error;
            $errorestado = ObjetoDatos::getInstancia()->sqlstate;
            $respuesta = false;
            $mensaje = "No se registró con éxito la atención del reclamo. $error :: $errorestado";
            throw new Exception();
        }
        $vReclamo->setEstado("espera");
    }

    $gestorServicio = new gestorServicio();
    $servicio = $gestorServicio->obtenerServicio($idservicio);
    $nombreservicio = $servicio->nombre;
    //formateo de la fecha
    $fech = strtotime($vReclamo->fecha);
    $meses = array('Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
        'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre');
    $nuevafecha = date('d', $fech) . " de " . $meses[((int) date('m', $fech) - 1)] . " de " . date('Y', $fech) . " " . date('H:i', $fech) . " Hs";
} catch (Exception $ex) {
    $error = 1;
}
?>
<html>
    <head>
        <title><?php echo Constantes::NOMBRE_SISTEMA; ?></title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <noscript>
        <meta http-equiv="refresh" content="0; URL=nojs/index.php">
        </noscript>
        <script src="../lib/datatables/jquery.js"></script>
        <script src="../lib/validador.js" type="text/javascript"></script>
        <script src="../lib/bootstrap/js/bootstrap.min.js" type="text/javascript"></script>
        <script src="../lib/bootstrapSwitch/js/bootstrap-switch.min.js"></script>
        <link href="../lib/bootstrapSwitch/css/bootstrap3/bootstrap-switch.min.css" rel="stylesheet">
        <link href="../gui/estilo.css" type="text/css" rel="stylesheet" />
    </head>
    <body>
        <?php
        include_once '../gui/GUI.class.php';
        include_once '../gui/GUImenu.php';
        ?>
        <section id="main-content">
            <article>
                <div class="content">
                    <div class="panel panel-default">
                        <div class="panel-body">
                            <h3>Atencion de Valoraci&oacute;n realizada para el servicio <?php echo mb_strtoupper($nombreservicio); ?></h3>
                            <?php if (!isset($error)) { ?>

                            <?php } else { ?>
                                <p>No se pudieron obtener los datos de la valoraci&oacute;n</p>
                            <?php }
                            ?>
                            <form method="post" action="valoracionhecha.atender.procesa.php" name="formulario" id="formulario" >
                                <div class="form-group row">
                                    <label for="nombre" class="col-sm-3 col-form-label">Nombre Valoraci&oacute;n </label>
                                    <div class="col-xs-3">
                                        <p><?php echo $vReclamo->nombreValoracionRepresentada; ?></p>
                                    </div>
                                </div>

                                <div class="form-group row">
                                    <label for="descripcion" class="col-sm-3 col-form-label">Descripci&oacute;n</label>
                                    <div class="col-xs-3">
                                        <p><?php echo $vReclamo->descripcion; ?></p>
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <label for="imagen" class="col-sm-3 col-form-label">Imagen</label>
                                    <div class="col-xs-3">
                                        <img src="../imagenes/<?php
                                        if (file_exists($vReclamo->urlImagen)) {
                                            echo $vReclamo->urlImagen;
                                        } else {
                                            //una imagen en caso de que no haya ninguna
                                            echo "sinimagen.JPG";
                                        }
                                        ?>" title="Imagen cargada desde movil" />
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <label for="recibirNotificacion" class="col-sm-3 col-form-label">Email de Notificaci&oacute;n</label>
                                    <div class="col-sm-8">
                                        <p><?php echo $vReclamo->emailDevolucion; ?></p>
                                    </div>
                                </div>

                                <div class="form-group row">
                                    <label for="fecha" class="col-sm-3 col-form-label">Fecha</label>
                                    <div class="col-sm-8">
                                        <p><?php echo $nuevafecha; ?></p>
                                    </div>
                                </div>

                                <div class="form-group row">
                                    <label for="vencimiento" class="col-sm-3 col-form-label">Vencimiento</label>
                                    <div class="col-sm-8">
                                        <?php
                                        /* determino si esta vencido o no corresponde */

                                        if ($vReclamo->vencimiento > 0) {
                                            $datetime = date_create()->format('Y-m-d H:i:s'); //fecha de hoy
                                            $date1 = new DateTime(date('Y-m-d', strtotime($datetime)));
                                            $date2 = new DateTime(date('Y-m-d', strtotime($vReclamo->fecha)));
                                            $diaspasados = $date1->diff($date2)->days;
                                            $dias_vencidos = $diaspasados - $vReclamo->vencimiento;
                                            $vencido = ($dias_vencidos > 0) ? true : false;
                                            echo $vReclamo->vencimiento . " dias de vigencia desde su realizacion.<br>";
                                            if ($vencido) {
                                                echo "El reclamo esta vencido por $dias_vencidos dias .";
                                                //en este caso se establece el estado vencido
                                                $resultados = ObjetoDatos::getInstancia()->ejecutarQuery(""
                                                        . "INSERT INTO " . Constantes::BD_SCHEMA . ".cambio_estado_valoracion(idcambio_estado_valoracion,estado,fecha,fk_valoracion_hecha_idvaloracion_hecha) "
                                                        . "VALUES (null, 'vencido',CURRENT_TIMESTAMP,{$idvaloracionhecha})");
                                                if ($resultados) {
                                                    //todo ok
                                                    $respuesta = true;
                                                    $vReclamo->setEstado("vencido");
                                                } else {
                                                    //hubo error
                                                    $error = ObjetoDatos::getInstancia()->error;
                                                    $errorestado = ObjetoDatos::getInstancia()->sqlstate;
                                                    $respuesta = false;
                                                    $mensaje = "No se registró con éxito la atención del reclamo. $error :: $errorestado";
                                                }
                                            } else {
                                                echo "El reclamo esta vigente. ";
                                            }
                                        } else {
                                            $vencido = false;
                                            echo "No tiene vencimiento.<br>";
                                        }
                                        ?>
                                    </div>
                                </div>
                                <?php if ($vReclamo->estado != 'vencido' && $vReclamo->estado != 'terminado') { ?>
                                    <div class="form-group row">
                                        <!-- considerar el estado que tenia anteriormente:
                                        de creado puede pasar a espera o terminado, 
                                        de espera puede pasar solo a terminado -->
                                        <label for="cambioestado" class="col-sm-3 col-form-label">Finalizar</label>
                                        <div class="col-sm">
                                            Si
                                            <input type="checkbox" id="cambioestado" name="cambioestado"> 
                                        </div>
                                    </div>
                                <?php } else { ?>
                                    <div class="form-group row">
                                        <label for="cambioestado" class="col-sm-3 col-form-label">Estado: </label>
                                        <div class="col-sm-1">
                                            <p><?php echo ucfirst($vReclamo->estado); ?></p>
                                        </div>
                                    </div>
                                <?php }
                                ?>
                                <input type="hidden" name="idvaloracionhecha" value="<?php echo $idvaloracionhecha; ?>" />
                                <input type="hidden" name="nombrevaloracion" value="<?php echo $vReclamo->nombreValoracionRepresentada; ?>" />
                                <fieldset>
                                    <legend>Opciones</legend>
                                    <?php if (!$vencido && $vReclamo->estado != 'terminado') { ?>
                                        <input type="submit" class="btn btn-success" value="Guardar" id="guardar" disabled="true" />
                                    <?php } ?>
                                    <input type="button" id="salir" class="btn btn-default" onClick="chgAction();" value="Salir" />
                                </fieldset>
                                <script language="javascript" type="text/javascript">
                                    function chgAction() {
                                        document.getElementById("formulario").action = "valoracionhecha.php";
                                        document.getElementById("formulario").submit();
                                    }
                                </script>
                            </form>
                        </div>
                    </div>
                </div>
            </article>

            <script>
                $(document).ready(function () {
                    $("[name='recibir_notificacion']").bootstrapSwitch();
                    $("[name='permite_descripcion']").bootstrapSwitch();
                    $("[name='habilitado']").bootstrapSwitch();

                    $('input[name="cambioestado"]').on('change', function () {
                        var estadoActual = $('input[name="cambioestado"]:checked').val();
                        //alert("estado actual:" + estadoActual);
                        if (estadoActual == 'on') {
                            $("#guardar").prop('disabled', false);
                        } else {
                            $("#guardar").prop('disabled', true);
                        }
                        ;
                    });
                });
            </script>

            <?php include_once '../gui/GUIfooter.php'; ?>
        </section>
    </body>
</html>
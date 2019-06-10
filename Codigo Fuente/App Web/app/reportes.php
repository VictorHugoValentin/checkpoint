<?php
include_once '../lib/ControlAcceso.class.php';
ControlAcceso::requierePermiso(PermisosSistema::PERMISO_REPORTES);
require_once 'gestorServicio.class.php';
$miGServicio = new gestorServicio();
$error = false;
try {
    $roles = $_SESSION['usuario']->roles;
    $rol = $roles[0]->nombre; // "Usuario Consulta" puede acceder a todos los servicios
    if($rol == "Usuario Consulta"){
        $misServicios = $miGServicio->obtenerServicios();
    }else{
        $misServicios = $miGServicio->obtenerServicioPorUsuario($_SESSION['usuario']->idusuario);
    }
} catch (Exception $e) {
    $error = true;
    $mensaje = $e->getMessage();
}
?>
<html>
    <head>
        <title><?php echo Constantes::NOMBRE_SISTEMA; ?></title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
        <link href="../gui/estilo.css" type="text/css" rel="stylesheet" />
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css">
        <script src="../lib/jQuery/jquery-3.2.1.min.js"></script>
        <script type="text/html" src="https://www.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js"></script>
        <script src="../lib/bootstrap/js/bootstrap.min.js"></script>
        <script type="text/javascript" src="https://cdn.jsdelivr.net/momentjs/latest/moment.min.js"></script>
        <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/daterangepicker/daterangepicker.min.js"></script>
        <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/daterangepicker/daterangepicker.css" />
        <style type="text/css">
            #regiration_form fieldset:not(:first-of-type) {
                display: none;
            }
        </style>

    </head>
    <body>
        <?php include_once '../gui/GUImenu.php'; ?>
        <section id="main-content">
            <!--            <article>-->
            <div class="content">
                <h3>Generaci&oacute;n de Informes <span id="servicioseleccionado"></span></h3>
                <?php
                if (!$error) {
                    if (count($misServicios) > 0) {
                        ?>
                        <form id="regiration_form" method="post" action="reportes.procesa.php" name="formulario" >
                            <!-- -------------------------------   pantalla 1 ------------------------------- -->
                            <fieldset>
                                <h3>Seleccione el Servicio</h3>
                                <div class="form-group" style="max-width: 300px;">
                                    <label for="idservicio" class="col-form-label">Servicio:</label>
                                    <select id="idservicio" name="idservicio" class="form-control" title="Tipo de valoracion">
                                        <?php
                                        $primero = true;
                                        foreach ($misServicios as $unServicio) {
                                            if ($primero) {
                                                $primerServicio = $unServicio;
                                                $primero = false;
                                            }
                                            ?>
                                            <option value="<?php echo $unServicio->id; ?>"><?php echo (($unServicio->nombre)); ?></option>
                                        <?php } ?>
                                    </select>
                                    <input type="hidden" name="s_nombre" value="<?php echo $primerServicio->nombre; ?>" />
                                    <input type="hidden" name="s_emailvaloraciones" value="<?php echo $primerServicio->email; ?>" />
                                    <input type="hidden" name="s_habilitado" value="<?php echo $primerServicio->habilitado; ?>" />
                                    <input type="hidden" name="s_idusuario" value="<?php echo $primerServicio->encargado; ?>" />
                                    <input type="hidden" name="s_icono" value="<?php echo $primerServicio->icono; ?>" />
                                    <input type="hidden" name="s_descripcion" value="<?php echo $primerServicio->descripcion; ?>" />
                                </div>
                                <input type="button" name="data[password]" id="sig1" class="next btn btn-info" value="Siguiente >" />
                            </fieldset>
                            <!-- -------------------------------   pantalla 2 ------------------------------- -->
                            <fieldset>
                                <h3>Seleccione tipo de informe y rango de fechas</h3>
                                <div class="form-group" style="max-width: 300px;">
                                    <label for="tipo" class="col-form-label">Tipo de Informe</label>
                                    <select id="tiporeporte" name="tiporeporte" class="form-control" title="Tipo de valoracion">
                                        <option value="1" selected>Informe de Reclamos</option>
                                        <option value="2">Informe de Valoraciones</option>
                                    </select>
                                    <label for="datarange" class="col-form-label">Rango de fechas</label>
                                    <input type="text" id="daterange" name="daterange" class="form-control" value="" readonly="true" />
                                </div>
                                    <input type="button" name="previous" id="ant1" class="previous btn btn-default" value="< Regresar" />
                                    <input type="button" id="sig2" name="next" class="next btn btn-info" value="Siguiente >" />
                            </fieldset>
                            <!-- -------------------------------   pantalla 3 ------------------------------- -->
                            <fieldset>
                                <h3>Seleccione la valoración</h3>
                                <div class="form-group" style="max-width: 300px;">
                                    <label id="etiqueta" for="listadorangos" class="col-sm-1 col-form-label">Valoración</label>
                                    <select id="listadorangos" name="listadorangos" class="form-control" title="Seleccione por favor">

                                    </select>
                                </div>
                                <input type="hidden" name="nombrevaloracion" />
                                <input type="button" name="previous" class="previous btn btn-default" value="< Regresar" />
                                <input type="button" name="enviar" class="btn btn-success" id="submit_data" value="Generar" />
                            </fieldset>
                        </form>
                    <?php } else { ?>
                        <div class="alert alert-danger">Usted no tiene Servicios asociados.</div>
                        <?php
                    }
                } else {
                    ?>
                    <div class="alert alert-danger">No se pueden obtener datos en estos momentos.
                        <br/>Detalles <?php echo $mensaje; ?>
                    </div>
                <?php } ?>
                <p>&nbsp;</p>
                <!--            </article>-->
            </div>
        </section>
        <script type="text/javascript" charset="utf-8">
            $(document).ready(function () {

                $('#daterange').daterangepicker({
                    "locale": {
                        "format": "YYYY-MM-DD",
                        "separator": " - ",
                        "applyLabel": "Aceptar",
                        "cancelLabel": "Cancelar",
                        "fromLabel": "Desde",
                        "toLabel": "Hasta",
                        "customRangeLabel": "Personalizar",
                        "daysOfWeek": [
                            "Do",
                            "Lu",
                            "Ma",
                            "Mi",
                            "Ju",
                            "Vi",
                            "Sa"
                        ],
                        "monthNames": [
                            "Enero",
                            "Febrero",
                            "Marzo",
                            "Abril",
                            "Mayo",
                            "Junio",
                            "Julio",
                            "Agosto",
                            "Septiembre",
                            "Octubre",
                            "Noviembre",
                            "Diciembre"
                        ],
                        "firstDay": 1
                    },
                    "startDate": "<?php echo date("Y-m-d", mktime(0, 0, 0, date("m") - 1, 1, date("Y"))); ?>",
                    "endDate": "<?php echo date("Y-m-d", mktime(0, 0, 0, date("m"), 1, date("Y"))); ?>",
                    "opens": "center",
                    "maxDate": new Date()
                });


                var myArray = [];
<?php
/* Cargo los datos de los servicios asociados al usuario, para que al seleccionar uno, se guarden las propiedades  */
foreach ($misServicios as $unServicio) {
    echo "\n myArray[" . $unServicio->id . "] = {nombre:'" . $unServicio->nombre . "', email:'" . $unServicio->email . "', habilitado:" . $unServicio->habilitado . ", idusuario:" . $unServicio->encargado . ", icono:" . $unServicio->icono . ", descripcion:'" . $unServicio->descripcion . "'};";
}
?>
                var current = 1, current_step, next_step, steps;
                steps = $("fieldset").length;
                $(".previous").click(function () {
                    current_step = $(this).parent();
                    next_step = $(this).parent().prev();
                    next_step.show();
                    current_step.hide();
                });

                $("#ant1").click(function () {
                    $('#servicioseleccionado').html('');
                });

                /* cuando selecciono un servicio, seteo todos los valores*/
                $('#sig1').click(function () {
                    var indice = $("#idservicio").val();
                    $('input[name=s_nombre]').val(myArray[indice].nombre);
                    $('input[name=s_emailvaloraciones]').val(myArray[indice].email);
                    $('input[name=s_habilitado]').val(myArray[indice].habilitado);
                    $('input[name=s_idusuario]').val(myArray[indice].idusuario);
                    $('input[name=s_icono]').val(myArray[indice].icono);
                    $('input[name=s_descripcion]').val(myArray[indice].descripcion);

                    var selectedservicio = $('#idservicio').children("option:selected").text();
                    $('#servicioseleccionado').html('- Servicio: ' + selectedservicio);

                    current_step = $(this).parent();
                    next_step = $(this).parent().next();
                    next_step.show();
                    current_step.hide();
                });

                $('#sig2').click(function () {
                    //cuando selecciona rango, continua, sino, grafico
                    if ($('#tiporeporte').val() === '2') {
                        //se trata de RANGO, continuar
                        $.ajax({
                            method: "POST",
                            url: "reportes.ajax.php",
                            data: {idservicio: $('#idservicio').val()}
                        }).done(function (msg) {
                            //agregar al select de rangos los nuevos valores
                            $('#listadorangos').val(null); //intento de resetear el select
                            //elimino los existentes
                            $('#listadorangos')
                                    .find('option')
                                    .remove()
                                    .end()
                                    ;

                            var i;
                            //consultar si es que esta vacio para habilitar el boton de generar
                            if (msg.length !== 0) {
                                var etiqueta;
                                for (i = 0; i < msg.length; i++) {
                                    console.log(msg[i].nombre);  // (o el campo que necesites)
                                    etiqueta = msg[i].nombre;
                                    $('#listadorangos').append($('<option>', {
                                        value: msg[i].idvaloraciones,
                                        text: MaysPrimera(etiqueta.toLowerCase())
                                    }));
                                }
                                //habilito en caso de que este deshabilitado
                                $('#submit_data').attr('disabled', false);
                            } else {
                                //deshabilitar boton de envio
                                $('#submit_data').attr('disabled', true);
                                alert("No hay valoraciones de caracter cualitativo para este servicio");
                            }
                            function MaysPrimera(string){
                                return string.charAt(0).toUpperCase() + string.slice(1);
                            }

                            var selectedvaloracion = $('#listadorangos').children("option:selected").text();
                            $('input[name=nombrevaloracion]').val(selectedvaloracion);
                        }).fail(function () {
                            //no hay boton siguiente ni reporte
                            alert("hubo error obteniendo los rangos disponibles");
                        });
                        //paso a la siguiente pantalla
                        //alert("click en next2");
                        current_step = $(this).parent();
                        next_step = $(this).parent().next();
                        next_step.show();
                        current_step.hide();
                    } else {
                        //pasa directo al reporte
                        document.formulario.submit();
                    }
                });
                $('#submit_data').click(function () {
                    //cuando selecciona rango, continua, sino, grafico
                    //pasa directo al reporte
                    document.formulario.submit();

                });
                $('#listadorangos').change(function () {
                    var selectedvaloracion = $(this).children("option:selected").text();
                    $('input[name=nombrevaloracion]').val(selectedvaloracion);
                });
            });
        </script>
        <?php include_once '../gui/GUIfooter.php'; ?>
    </body>
</html>
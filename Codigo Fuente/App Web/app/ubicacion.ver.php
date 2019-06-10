<?php
include_once '../lib/ControlAcceso.class.php';
ControlAcceso::requierePermiso(PermisosSistema::PERMISO_UBICACION);
?>
<!DOCTYPE html>
<html>
    <head>
        <title><?php echo Constantes::NOMBRE_SISTEMA; ?></title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8">

        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.0/css/bootstrap.min.css">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-treeview/1.2.0/bootstrap-treeview.min.css" />
        <script type="text/javascript" src="http://ajax.aspnetcdn.com/ajax/jQuery/jquery-1.9.1.min.js"></script>
        <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-treeview/1.2.0/bootstrap-treeview.min.js"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
    </head>
    <body>
        <?php include_once '../gui/GUI.class.php';
        include_once '../gui/GUImenu.php'; ?>
        <section id="main-content">
            <div class="content">
                <h3>Gesti&oacute;n de Ubicaciones</h3>
                <div class="well clearfix">
                    <div class="col-md-12">
                        <!--panel-->
                        <div class="panel panel-default">
                            <div class="panel-body">
                                <div class="row">
                                    <div class="col-md-6 treeview" id="treeview_json">

                                    </div>
                                    <div class="col-md-6">
                                        <form method="POST" action="../lib/generador_qr/phpqrcode/index.php" id="pdf" onsubmit="return validar();" >
                                            <div class="alert alert-info">Haga Clic sobre la ubicaci&oacute;n para seleccionarla.</div>
                                            <fieldset>
                                                <legend>Opciones</legend>
                                                <div class="form-group row">
                                                    <label class="col-sm-3 col-form-label">Seleccionado</label>
                                                    <div class="col-sm-7">
                                                        <input type="text"  name="seleccionado" size="30" maxlength="20" id="seleccionado" class="form-control" title="Ubicacion Seleccionada" disabled="disabled" />
                                                        <span id="elegido"><i>No seleccionado</i></span>
                                                        <input type="hidden"  name="nombre" id="nombre" />
                                                        <input type="hidden"  name="actualid" id="idactual" />
                                                        <input type="hidden"  name="destino" id="destino" value="<?php echo Constantes::WEBROOT ?>" />
                                                    </div>
                                                </div>

                                                <button id="botonnuevo" type="button" class="btn btn-success" data-toggle="modal" data-target="#myModal" disabled="disabled">Nueva</button>
                                                <button id="botonmodificar" type="button" class="btn btn-success" data-toggle="modal" data-target="#myModalModificar" disabled="disabled">Modificar</button>
                                                <button id="botoneliminar" type="button" class="btn btn-danger" data-toggle="modal" data-target="#myModalEliminar" disabled="disabled">Eliminar Ubicaci&oacute;n</button>
                                                <input id="botonqr" type="submit" id="descargar" value="Descargar C&oacute;digo QR" name="descargar" class="btn btn-primary active" disabled="disabled"/>
                                            </fieldset>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div style="float: right; width: auto; height: auto;" id="opciones">

                </div>

                <!-- Modal de NUEVA ubicacion -->
                <div class="modal fade" id="myModal" role="dialog">
                    <div class="modal-dialog">
                        <!-- Modal content-->
                        <div class="modal-content">
                            <form method="post" action="ubicacion.nuevo.procesa.php" name="formulario" >
                                <div class="modal-header">
                                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                                    <h4 class="modal-title">Nueva Ubicaci&oacute;n</h4>
                                </div>
                                <div class="modal-body">
                                    <div class="form-group">
                                        <label for="nombrenuevo" class="col-sm">Nombre</label>
                                        <div class="input-group col-sm">
                                            <input type="text"  name="nombrenuevo" minlength="3" maxlength="45" id="nombrenuevo" class="form-control" title="Nombre de la Ubicacion" />
                                            <span class="input-group-addon">3 - 45 letras</span>
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <label class="col-sm-3 col-form-label">Dependencia</label>
                                        <div class="col-sm-7">
                                            <input type="text"  name="dependencia" size="22" maxlength="20" id="dependencianuevo" title="Dependencia actual" disabled="disabled" class="form-control" />
                                            <input type="hidden"  name="iddependencia" id="iddependencianuevo" />
                                        </div>
                                    </div>
                                </div>
                                <div class="modal-footer">
                                    <input type="submit" class="btn btn-success"  value="Agregar" id="agregar" />
                                    <button type="button" class="btn btn-default" data-dismiss="modal">Cerrar</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <!-- fin de la parte modal-->

                <!-- Modal de MODIFICAR ubicacion -->
                <div class="modal fade" id="myModalModificar" role="dialog">
                    <div class="modal-dialog">
                        <!-- Modal content-->
                        <div class="modal-content">
                            <form method="post" action="ubicacion.modifica.procesa.php" name="formulario" >
                                <div class="modal-header">
                                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                                    <h4 class="modal-title">Modificar Ubicaci&oacute;n</h4>
                                </div>
                                <div class="modal-body">
                                    <div class="form-group">
                                        <label for="nombremodifica" class="col-sm">Nuevo Nombre</label><br>
                                        <div class="input-group col-sm">
                                            <input type="text" name="nombrenuevo" minlength="3" maxlength="45" id="nombremodifica" class="form-control" title="Nuevo nombre de la Ubicacion" />
                                            <span class="input-group-addon">3 - 45 letras</span>
                                        </div>                                        
                                        <input type="hidden" name="idubicacion" id="idubicacionmodifica"/>
                                    </div>
                                </div>
                                <div class="modal-footer">
                                    <input type="submit" class="btn btn-success"  value="Modificar" id="modificar" />
                                    <button type="button" class="btn btn-default" data-dismiss="modal">Cerrar</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <!-- fin de la parte modal-->

                <!-- Modal ELIMINAR Ubicacion-->
                <div class="modal fade" id="myModalEliminar" role="dialog">
                    <div class="modal-dialog">
                        <!-- Modal content-->
                        <div class="modal-content">
                            <form method="post" action="ubicacion.elimina.procesa.php" name="formulario" >
                                <div class="modal-header">
                                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                                    <h4 class="modal-title">Confirme su decisi&oacute;n de Eliminar</h4>
                                </div>
                                <div class="modal-body">
                                    <div class="form-group row">
                                        <label class="col-sm-10 col-form-label" id="seleccioneliminar"></label>
                                        <input type="hidden" id="idseleccioneliminar" name="idubicacioneliminar"/>
                                    </div>

                                </div>
                                <div class="modal-footer">
                                    <input type="submit" class="btn btn-danger"  value="Eliminar" id="eliminar" />
                                    <button type="button" class="btn btn-default" data-dismiss="modal">Cancelar</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <!-- fin de la parte modal-->

            </div>
        </section>

        <script type="text/javascript">

            $(document).ready(function () {

                //llamada a mysql para los datos del arbol
                var treeData;
                $.ajax({
                    type: "GET",
                    //url: "response.php",
                    url: "nodos.php",
                    dataType: "json",
                    success: function (response)
                    {
                        initTree(response);
                    }
                });
                function initTree(treeData) {
                    $('#treeview_json').treeview({
                        data: treeData,
                        onNodeSelected: function (event, node) {
                            //valores para dialogo OPCIONES
                            $('#seleccionado').val(node.text);
                            $('#nombre').val(node.text);
                            $('#idactual').val(node.id);

                            //valores para dialgo NUEVO
                            $('#dependencianuevo').val(node.text);
                            $('#iddependencianuevo').val(node.id);

                            //valores para dialgo MODIFICA
                            $('#nombremodifica').val(node.text);
                            $('#idubicacionmodifica').val(node.id);
                            $('#dependenciamodifica').val(node.text);

                            //valores para dialgo ELIMINA
                            $('#seleccioneliminar').html('Se va a eliminar la ubicaci&oacute;n <i>\"' + node.text + '\"</i>');
                            $('#idseleccioneliminar').val(node.id);

                            //se habilitan cuando se selecciona un nodo
                            $('#botonnuevo').prop('disabled', false);
                            $('#botoneliminar').prop('disabled', false);
                            $('#botonmodificar').prop('disabled', false);
                            $('#botonqr').prop('disabled', false);
                            $('#elegido').html('');
                        },
                        onNodeUnselected: function (event, node) {
                            //valores para dialogo OPCIONES
                            $('#seleccionado').val('');
                            $('#nombre').val('');
                            $('#idactual').val('');

                            //valores para dialgo NUEVO
                            $('#dependencianuevo').val('');
                            $('#iddependencianuevo').val('');

                            //valores para dialgo MODIFICA
                            $('#nombremodifica').val('');
                            $('#idubicacionmodifica').val('');
                            $('#dependenciamodifica').val('');

                            //valores para dialgo ELIMINA
                            $('#seleccioneliminar').html('');
                            $('#idseleccioneliminar').val('');

                            //se habilitan cuando se selecciona un nodo
                            $('#botonnuevo').prop('disabled', true);
                            $('#botoneliminar').prop('disabled', true);
                            $('#botonmodificar').prop('disabled', true);
                            $('#botonqr').prop('disabled', true);
                            $('#elegido').html('No seleccionado');
                        }
                    });

                    $('#treeview_json').treeview('expandAll', {levels: 2, silent: true});
                }

                var initSelectableTree = function () {
                    return $('#treeview-selectable').treeview({
                        data: defaultData,
                        multiSelect: $('#chk-select-multi').is(':checked'),
                        onNodeSelected: function (event, node) {
                            $('#selectable-output').prepend('<p>' + node.text + ' was selected</p>');
                        },
                        onNodeUnselected: function (event, node) {
                            $('#selectable-output').prepend('<p>' + node.text + ' was unselected</p>');
                        }
                    });
                };

            });
            //funcion de generacion del pdf
            function generarpdf(descargable) {
                var descarga = false;
                var nombrepdf = 0;
                if (descargable == "descargable") {
                    descarga = true;
                }
                console.log('nombre:' + $("#nombre").val() + ' actualid:' + $("#actualid").val() + ' descargable:' + descarga);
                $.ajax({
                    type: "POST",
                    url: '../lib/generador_qr/phpqrcode/index.php',
                    data: {nombre: $("#nombre").val(), actualid: $("#actualid").val(), destino: $("#destino").val(), descargable: descarga},
                    async: false,
                    dataType: 'json',
                    success: function (data) {
                        //alert(data);
                        console.log('exito de llamada de descarga');
                        nombrepdf = data.nombre;
                        //alert("nombrepdf:" + nombrepdf);
                    },
                    fail: function () {
                        alerta('fallo en generador pdf');
                    }
                });
                return nombrepdf;
            }


            function validar() {
                var campo = $('#seleccionado').val();
                if (campo != '') {
                    return true;
                } else {
                    alert('Debe seleccionar una ubicacion');
                    return false;
                }



            }
        </script>
<?php include_once '../gui/GUIfooter.php'; ?>
    </body>
</html>
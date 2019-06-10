<?php
include_once '../lib/ControlAcceso.class.php';
include_once '../modelo/Workflow.class.php';
ControlAcceso::requierePermiso(PermisosSistema::PERMISO_HABILITA_EN_SECTOR);

$continuar = TRUE;    //para saber si hay datos sobre los que se puede trabajar

if (isset($_GET['id'])) {
    $valoracion_actual = $_GET['id'];
    $res = ObjetoDatos::getInstancia()->ejecutarQuery(""
            . "SELECT v.idvaloraciones, v.nombre, v.tipo, v.habilitado, s.nombre as servicio , u.nombre as usuario "
            . "FROM " . Constantes::BD_SCHEMA . ".valoraciones v "
            . "join " . Constantes::BD_SCHEMA . ".servicios  s ON v.fk_servicios_idservicios = s.idservicios "
            . "join " . Constantes::BD_SCHEMA . ".USUARIO u ON u.idusuario = s.usuario_idusuario "
            . "WHERE u.idusuario= {$_SESSION['usuario']->idusuario} and v.idvaloraciones = {$valoracion_actual} "
            . "ORDER BY servicio, v.nombre");
    if ($res->num_rows == 1) {
        $row = $res->fetch_assoc();
    } else {
        //no hay valoracion para el id proporcionado.
        $continuar = FALSE;
    }
} else {
    //no se proporciono una valoracion sobre la que se pueda trabajar
    $continuar = FALSE;
}
?>
<!DOCTYPE html>
<html>
    <head>
        <title><?php echo Constantes::NOMBRE_SISTEMA; ?></title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
        <link rel="stylesheet" href="../lib/bootstrap/3.3/bootstrap.min.css">
        <link rel="stylesheet" href="../lib/bootstrap/css/bootstrap-treeview.min.css" />
        <script type="text/javascript" src="../lib/jQuery/jquery-1.9.1.min.js"></script>
        <script type="text/javascript" src="../lib/bootstrap/js/bootstrap-treeview.min.js"></script>
        <script src="../lib/bootstrap/3.3/bootstrap.min.js"></script>
    </head>
    <body>
        <?php include_once '../gui/GUI.class.php';include_once '../gui/GUImenu.php'; ?>
        <section id="main-content">
            <div class="content">
                <?php if ($continuar) { ?>
                    <h3>Ubicaciones para la Valoracion "<?= $row['nombre']; ?>"</h3>
                    <div class="well clearfix">
                        <div class="col-md-12">
                            <!--panel-->
                            <div class="panel panel-default">
                                <div class="panel-body">
                                    <div class="row">
                                        <div class="col-md-6 treeview" id="treeview_json">

                                        </div>
                                        <div class="col-md-6">
                                            <fieldset>
                                                <legend>Opciones</legend>
                                                <button id="botonguardar" type="button" class="btn btn-success"  >Guardar</button>
                                                <a href="habilita.sector.ver.php">
                                                    <input type="button" value="Cancelar" class="btn btn-danger"/>
                                                </a>
                                            </fieldset>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div style="float: right; width: auto; height: auto;" id="opciones">

                    </div>
                <?php } else { ?>
                    <h3>No se ha especificado o no hay una valoracion para asignar.</h3>
                    <a href="habilita.sector.ver.php">
                        <input type="button" value="Salir" class="btn btn-primary"/>
                    </a>
                <?php } ?>
            </div>
        </section>

        <!-- Modal de Guardado con exito -->
        <div class="modal fade" id="guardadoModal" role="dialog" data-keyboard="false" data-backdrop="static">
            <div class="modal-dialog">
                <!-- Modal content-->
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title">Operaci&oacute;n Exitosa</h4>
                    </div>
                    <div class="modal-body">
                        <p>Se guardaron las asociaciones de las ubicaciones y las valoraciones.</p>
                    </div>
                    <div class="modal-footer">
                        <a href="habilita.sector.ver.php">
                            <input type="button" value="Aceptar" class="btn btn-primary"/>
                        </a>
                    </div>
                </div>
            </div>
        </div>
        <!-- fin de la parte modal-->

        <script type="text/javascript">

            $(document).ready(function () {

                //llamada a mysql para los datos del arbol
                var treeData;
                $.ajax({
                    type: "GET",
                    url: "nodos.php",
                    dataType: "json",
                    success: function (response)
                    {
                        initTree(response);
                        loadcheck();
                    }
                });
                function initTree(treeData) {
                    $('#treeview_json').treeview({

                        data: treeData,
                        showCheckbox: true
                    });
                }

                function loadcheck() {
                    //obtener el listado de las ubicaciones donde tiene que estar checado

<?php
/* Creacion de un arreglo con las ubicaciones asociadas a la valoracion */
$res = ObjetoDatos::getInstancia()->ejecutarQuery(""
        . "SELECT fk_ubicacion_idubicacion as idubicacion, idubicacion_valoracion "
        . "FROM " . Constantes::BD_SCHEMA . ".ubicacion_valoracion uv "
        . "WHERE uv.fk_valoraciones_idvaloraciones={$valoracion_actual} ");
$pila_ubicaciones = array();
echo "var pila_ubicacion = [";
$primero = true;
while ($value = $res->fetch_assoc()) {
    array_push($pila_ubicaciones, $value['idubicacion']);
    if ($primero) {
        echo "'" . $value['idubicacion'] . "'";
        $primero = FALSE;
    } else {
        echo ",'" . $value['idubicacion'] . "'";
    }
}
echo "];";
?>

                    var arreglo = $('#treeview_json').treeview('getEnabled', 1);  //una forma de obtener todas las ubicaciones
                    var arrayLength = arreglo.length;
                    if (pila_ubicacion.length > 0) {
                        for (var i = 0; i < arrayLength; i++) {
                            //alert(arreglo[i]['id']);
                            //console.log(arreglo[i]);
                            if (pila_ubicacion.indexOf(arreglo[i]['id']) !== -1) {
                                $('#treeview_json').treeview('checkNode', [arreglo[i]['nodeId'], {silent: true}]);
                            }
                        }
                    }
                    // al comienzo se muestran dos niveles jerarquicos
                    $('#treeview_json').treeview('expandAll', {levels: 2, silent: true});
                }

                /*------------- Guardado del estado de las ubicaciones ------------*/
                $('#botonguardar').click(function () {
                    var seleccionados = $('#treeview_json').treeview('getChecked', 1);
                    var arreglopost = [];
                    var seleccionadosLength = seleccionados.length;
                    if (seleccionadosLength > 0) {
                        for (var i = 0; i < seleccionadosLength; i++) {
                            arreglopost.push(seleccionados[i]['id']);
                            console.log(seleccionados[i]['id']);
                        }
                    }

                    $.ajax({
                        type: "POST",
                        url: 'habilita.sector.procesar.php',
                        data: {'seleccionados': JSON.stringify(arreglopost), 'idvaloracion':<?php echo $valoracion_actual; ?>}, //capturo array     
                        success: function (data) {
                            $("#guardadoModal").modal('show');
                        }
                    });
                }
                );
                //var arregloseleccionados = [];

            });
            $('#treeview_json').on('nodeChecked', function (event, data) {
                alert("nodo check");
                console.log(data);
                //arregloseleccionados.push(data); 
                // Checked
            });
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
<?php
include_once '../lib/ControlAcceso.class.php';
include_once '../gui/GUI.class.php';
ControlAcceso::requierePermiso(PermisosSistema::PERMISO_REPORTES);
require_once 'gestorServicio.class.php';
include '../lib/funcionauxiliar.php';
/* funcion para fecha en formato castellano */

function fechaCastellano($FechaStamp) {
    $ano = date('Y', strtotime($FechaStamp));
    $mes = date('n', strtotime($FechaStamp));
    $dia = date('d', strtotime($FechaStamp));
    $mesesN = array(1 => "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio",
        "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre");
    return $dia . " de " . $mesesN[$mes] . " de $ano";
}

$miGServicio = new gestorServicio();
$error = false;

try {
    $servicioSeleccionado = new Servicio();
    $servicioSeleccionado->setId($_POST['idservicio']);
    $servicioSeleccionado->setEmail($_POST['s_emailvaloraciones']);
    $servicioSeleccionado->setNombre($_POST['s_nombre']);
    $servicioSeleccionado->setDescripcion($_POST['s_descripcion']);
    $servicioSeleccionado->setHabilitado($_POST['s_habilitado']);
    $servicioSeleccionado->setIcono($_POST['s_icono']);
    $servicioSeleccionado->setEncargado($_POST['s_idusuario']);
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
        <script src="../lib/jQuery/jquery-3.2.1.min.js"></script>
        <script type="text/html" src="https://www.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js"></script>
        <script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
        <script src="../lib/bootstrap/js/bootstrap.min.js"></script>
        <script type="text/javascript">
            google.charts.load('current', {packages: ['corechart']});
            google.charts.setOnLoadCallback(drawChart);

            function drawChart() {
                // Define the chart to be drawn.
                var porTipo = [];
                porTipo[porTipo.length] = ['Reclamo', 'Cantidad'];
<?php
//seteo de las fechsa
$fechas = $_POST['daterange']; // formato "2019-01-01 - 2019-01-07"
$fechadesde = substr($fechas, 0, 10);
$fechahasta = substr($fechas, 13, 10);
$fechahasta .= ' 23:59:59'; 
$esemoticon = false;
$hayvalores = false;

//obtengo el tipo[reclamo, rango]
if ($_POST['tiporeporte'] == 1) {
    /* ------------------------------------------------------------------------------------------------
      parte de los reclamos
      ------------------------------------------------------------------------------------------------ */
    $tipo = "reclamo";
    $descripcionpantalla = $servicioSeleccionado->descripcion;
    $titulo = 'Reclamos para el servicio "' . $servicioSeleccionado->nombre . '"';
    $valoracionesexistentes = "select idvaloraciones, nombre, tipo, descripcion from valoraciones "
            . "where fk_servicios_idservicios=" . $_POST['idservicio'] . " and tipo='reclamo'";
    $resultados = ObjetoDatos::getInstancia()->ejecutarQuery($valoracionesexistentes);
    if ($resultados) {
        $porTipo = array();
        while ($una_ve = $resultados->fetch_assoc()) {
            /* por cada valoracion, obtengo el numeto total de valoraciones hechas */
            $idvaloracion = $una_ve['idvaloraciones'];

            /* todas las valoraciones puestas a disposicion para un servicio determinado */
            $queryvaloracionesxidvaloracion = "SELECT count(*) as totalhechas " .
                    "FROM checkpoint.valoracion_hecha vh " .
                    "JOIN ubicacion_valoracion uv ON vh.ubicacion_valoracion_idubicacion_valoracion=uv.idubicacion_valoracion " .
                    "JOIN valoraciones v ON v.idvaloraciones=uv.fk_valoraciones_idvaloraciones " .
                    "WHERE v.fk_servicios_idservicios=" . $_POST['idservicio'] . " and v.idvaloraciones=$idvaloracion "
                    . " and vh.fecha BETWEEN '$fechadesde' and '$fechahasta'";
            $resultadosxvaloracion = ObjetoDatos::getInstancia()->ejecutarQuery($queryvaloracionesxidvaloracion);
            $res = $resultadosxvaloracion->fetch_assoc();
            $resxvaloracion = $res['totalhechas'];
            $acumulado = array("idvaloraciones" => $idvaloracion,
                "nombre" => $una_ve['nombre'],
                "descripcion" => $una_ve['descripcion'],
                "tipo" => $una_ve['tipo'],
                "cantidad" => $resxvaloracion);
            array_push($porTipo, $acumulado);
            if($resxvaloracion>0){
                $hayvalores=true;
            }
        }
    }
} else {
    /* ------------------------------------------------------------------------------------------------
      parte de los rangos
      ------------------------------------------------------------------------------------------------ */
    //solo tengo que buscar el id de rango
    $tipo = "rango";
    $idvaloracion = $_POST['listadorangos'];
    $nvaloracion = $_POST['nombrevaloracion'];
    $titulo = 'Evaluación para la valoración "' . $nvaloracion . '"';

    //tengo que conocer si se trata de un emoticon, texto o numero
    $tipovalorrango = "SELECT tipo_valores,descripcion
        FROM valoraciones v
        JOIN valoracion_rango vr ON vr.valoraciones_idvaloraciones=v.idvaloraciones
        WHERE v.idvaloraciones = $idvaloracion";
    $resultadotiporango = ObjetoDatos::getInstancia()->ejecutarQuery($tipovalorrango);
    $res = $resultadotiporango->fetch_assoc();
    $restipovalorrango = $res['tipo_valores']; //"emoticon","texto", "numerico"
    $descripcionpantalla = $res['descripcion'];
    switch ($restipovalorrango) {
        case "emoticon":
            $tipos = array(1 => "emo1", "emo2", "emo3", "emo4", "emo5");
            $esemoticon = true;
            break;

        case "texto":
            $tipos = array(1 => "malo", "regular", "bueno", "muy bueno", "excelente");
            break;

        default:
            $tipos = array(1 => "1", "2", "3", "4", "5");
            break;
    }

    $porTipo = array();
    for ($i = 1; $i <= 5; $i++) {
        /* por cada escala del 1 al 5 obtengo la cantidad */
        $queryvaloracionesxescala = "SELECT count(*) as totalhechas 
            FROM checkpoint.valoracion_hecha vh 
            JOIN ubicacion_valoracion uv ON vh.ubicacion_valoracion_idubicacion_valoracion=uv.idubicacion_valoracion 
            JOIN valoraciones v ON v.idvaloraciones=uv.fk_valoraciones_idvaloraciones 
            JOIN valoracion_hecha_rango vhr on vhr.idvaloracion_hecha=vh.idvaloracion_hecha
            WHERE v.fk_servicios_idservicios=" . $_POST['idservicio'] . " and v.idvaloraciones= $idvaloracion and vhr.valor = $i "
                . " and vh.fecha >= '$fechadesde' and vh.fecha <= '$fechahasta'";
        $resultadosxvaloracion = ObjetoDatos::getInstancia()->ejecutarQuery($queryvaloracionesxescala);
        $res = $resultadosxvaloracion->fetch_assoc();
        $resxvaloracion = $res['totalhechas'];
        $acumulado = array("idvaloraciones" => $idvaloracion,
            "nombre" => $tipos[$i],
            "cantidad" => $resxvaloracion);
        array_push($porTipo, $acumulado);
        if($resxvaloracion>0){
                $hayvalores=true;
            }
    }
}
$cantidaddatos = count($porTipo);
foreach ($porTipo as $p) {
    ?>
                    porTipo[porTipo.length] = ['<?php echo $p["nombre"]; ?>',<?php echo $p["cantidad"]; ?>];
    <?php
}
?>
                var data = google.visualization.arrayToDataTable(porTipo);
                var options = {
                    title: '<?php echo $titulo ?>',
                    backgroundColor: '#9BB579',
                    legend: {
                        alignment: 'center',
                        position: 'top'
                    },
                    is3D: true,
                    floating: true
                };

                // Instantiate and draw the chart.
                var hayvalores = <?php if($hayvalores) echo "true"; else echo "false";?>;
                if (porTipo.length > 1) {
                    if(hayvalores){
                        var chart = new google.visualization.PieChart(document.getElementById('piechartPorTipo'));
                        chart.draw(data, options);
                    }else{
                        document.getElementById('piechartPorTipo').innerHTML = "<h4>No hay datos que reportar para las fechas seleccionadas.</h4>";
                    }
                } else {
                    document.getElementById('piechartPorTipo').innerHTML = "<h4>No hay datos que reportar para las fechas seleccionadas.</h4>";
                }
            }
        </script>
    </head>
    <body>
        <?php
        include_once '../gui/GUI.class.php';
        include_once '../gui/GUImenu.php';
        ?>

        <div class="content">
            <h3 style="margin-left: 20px;">Generaci&oacute;n de Informes para el servicio '<?php echo $servicioSeleccionado->nombre; ?>'</h3>
            <div class="panel panel-default">
                <div class="panel-body">
                    <?php if (!$error) {
                        ?>
                        <div id="piechartPorTipo"  style="width: 650px; height: 450px;float:left;margin-right:15px;" ></div>    
                        <div style="float: none;">
                            <p><strong>Fecha comprendida: </strong><?php echo fechaCastellano($fechadesde) . " <strong>hasta</strong> " . fechaCastellano($fechahasta) ?></p>
                        </div>
                        <div class="col-xs">
                            <p><strong>Descripción: </strong><?php echo (($descripcionpantalla)); ?></p>
                        </div>
                        <div class="col-xs">
                            <p><strong>Tipo de Informe: </strong><?php
                    if ($_POST['tiporeporte'] == 1) {
                        echo "Reclamos";
                    } else {
                        echo 'Evaluaciones para "' . $nvaloracion . '"';
                    }
                        ?></p>
                        </div>
                        <?php if ($esemoticon) { ?>
                            <div class="col-xs">
                                <p><strong>Referencia: </strong> 
                                    emo1: <img src="../imagenes/iconos/1.png" style="height:25px;" />
                                    emo2: <img src="../imagenes/iconos/2.png" style="height:25px;" />
                                    emo3: <img src="../imagenes/iconos/3.png" style="height:25px;" />
                                    emo4: <img src="../imagenes/iconos/4.png" style="height:25px;" />
                                    emo5: <img src="../imagenes/iconos/5.png" style="height:25px;" />
                                </p>
                            </div>
                        <?php } ?>

                        <a href="reportes.php">
                            <input type="button" class="btn btn-success" value="Generar otro" />
                        </a>

                    <?php } else {
                        ?>
                        <div class="alert alert-danger">No se pueden obtener datos en estos momentos.
                            <br/>Detalles <?php echo $mensaje; ?>
                        </div>
                    <?php } ?>
                    <p>&nbsp;</p>
                </div>
            </div>
        </div>
        <?php include_once '../gui/GUIfooter.php'; ?>
    </body>
</html>
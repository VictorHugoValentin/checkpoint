<?php
include_once '../lib/ControlAcceso.class.php';
include_once '../modelo/Workflow.class.php';
ControlAcceso::requierePermiso(PermisosSistema::PERMISO_OPCIONES_VALORACION);
$UsuariosWorkflow = new WorkflowUsuarios();
?>
<html>
    <head>
        <title><?php echo Constantes::NOMBRE_SISTEMA; ?></title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
        <link href="../gui/estilo.css" type="text/css" rel="stylesheet" />
    </head>
    <body>
        <?php include_once '../gui/GUI.class.php';
        include_once '../gui/GUImenu.php';
        ?>
        <section id="main-content">

            <div class="content">

                <div class="panel panel-default">
                    <div class="panel-body">
                        <div class="row">
                            <div class="col-md-8">
                                <h3>Valoraciones Hechas de tipo Evaluativas</h3>
                                <p>A continuaci&oacute;n se muestran las valoraciones cualitativas hechas por la comunidad del Campus.</p>
                            </div>
                            <div class="col-md-4">
                                <br>
                                <!-- creacion del boton Reclamos-->
                                <a href="valoracionhecha.php" class="btn btn-primary btn-md">
                                    <span class="glyphicon glyphicon-folder-open" aria-hidden="true"></span>
                                    Reclamos y observaciones
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="panel-body">
                    <div class="row">
                        <table id="tablaservicios" class="display table table-bordered table-stripe" cellspacing="0" width="100%">
                            <thead>
                                <tr>
                                    <th>Servicio</th>
                                    <th>Valoracion</th>
                                    <th>Descripcion</th>
                                    <th>Fecha</th>
                                    <th>Escala</th>
                                    <th>Valor</th>
<!--                                    <th>Acci&oacute;n</th>-->
                                </tr>
                            </thead>
                            <tbody>
                                <?php
                                ObjetoDatos::getInstancia()->ejecutarQuery("SET NAMES utf8");
                                /* servicio, valoracion, descripcion, tipo, fecha, idvaloracion_hecha, idservicios */
                                $res = ObjetoDatos::getInstancia()->ejecutarQuery(""
                                        . "SELECT s.nombre as servicio, v.nombre as valoracion,vh.descripcion,vh.tipo,DATE_FORMAT(vh.fecha, '%d/%m/%Y %H:%i hs') as fechaformato,vh.fecha, vh.idvaloracion_hecha,s.idservicios, "
                                        . "vr.tipo_valores,vhr.valor "
                                        . "FROM " . Constantes::BD_SCHEMA . ".USUARIO u "
                                        . "join " . Constantes::BD_SCHEMA . ".servicios  s ON u.idusuario=s.usuario_idusuario "
                                        . "join " . Constantes::BD_SCHEMA . ".valoraciones v on v.fk_servicios_idservicios=s.idservicios "
                                        . "join " . Constantes::BD_SCHEMA . ".valoracion_rango vr on vr.valoraciones_idvaloraciones=v.idvaloraciones "
                                        . "join " . Constantes::BD_SCHEMA . ".ubicacion_valoracion uv on uv.fk_valoraciones_idvaloraciones=v.idvaloraciones "
                                        . "join " . Constantes::BD_SCHEMA . ".valoracion_hecha vh on vh.ubicacion_valoracion_idubicacion_valoracion=uv.idubicacion_valoracion "
                                        . "left join " . Constantes::BD_SCHEMA . ".valoracion_hecha_rango vhr on vhr.idvaloracion_hecha=vh.idvaloracion_hecha "
                                        . "WHERE u.idusuario = " . $_SESSION['usuario']->idusuario . " "
                                        . "ORDER BY s.nombre ASC, v.nombre ASC");
                                while ($row = $res->fetch_assoc()):
                                    ?>
                                    <tr>
                                        <td><?php echo $row['servicio'] ?></td>
                                        <td><?php echo $row['valoracion'] ?></td>
                                        <td><?php echo $row['descripcion'] ?></td>
                                        <td><?php echo $row['fechaformato'] ?></td>
                                        <td><?php echo $row['valor']. " / 5"; ?></td>
                                        <td><?php //depende del tipo, se muestra el valor correspondiente
                                        if($row['tipo_valores'] == "emoticon"){
                                            //mostrar el icono
                                            echo "<img src='../imagenes/iconos/". $row['valor']. ".png' style='height:25px;' />";
                                        }else{
                                            if($row['tipo_valores'] == "texto"){
                                                //mostrar el texto
                                                $array = array(1 => "Malo",2 => "Regular",3 => "Bueno",4 => "Muy Bueno",5 => "Excelente");
                                                echo $array[$row['valor']];
                                            }else{
                                                //mostrar el numero
                                                echo $row['valor'];
                                            }
                                        }
                                        ?></td>
<!--                                        <td>
                                            <a href="valoracion_hecha.procesar.php?id=<?php echo $row['idvaloracion_hecha'] ?>">
                                                <img src="../imagenes/abm_ver.png" title="Ver/Editar">
                                            </a>&nbsp;&nbsp;&nbsp;&nbsp;
                                            <a href="valoracion_hecha.procesar.php?id=<?php echo $row['idvaloracion_hecha'] ?>">
                                                <img src="../imagenes/<?php echo $row['idservicios'] ? "icons_checked" : "icons_unchecked"; ?>.png" title="Habilitar/Deshabilitar">
                                            </a>
                                        </td>-->
                                    </tr>
                                    <?php
                                endwhile;
// }
                                ?>
                            </tbody>
                        </table> 


                        <p>&nbsp;</p>
                    </div>
                </div>
            </div>

        </section>
        <!--        parte en la que va para que se implemente datatables-->
        <script src="../lib/datatables/jquery.js"></script>
            <!-- Include all compiled plugins (below), or include <span id="IL_AD8" class="IL_AD">individual</span> files as needed -->
        <script src="../lib/bootstrap/js/bootstrap.min.js"></script>
        <script src="../lib/datatables/jquery.dataTables.min.js"></script>
        <script src="../lib/datatables/dataTables.bootstrap.min.js"></script>
        <script src="../lib/datatables/dataTables.responsive.min.js"></script>
        <script src="../lib/datatables/responsive.bootstrap.min.js"></script>
        <script type="text/javascript" charset="utf-8">
            $(document).ready(function () {
                $('#tablaservicios').dataTable({
                    "oLanguage": {
                        "sUrl": "../lib/datatables/Spanish.json"
                    }
                });
            });
        </script>
<?php include_once '../gui/GUIfooter.php'; ?>
    </body>
</html>
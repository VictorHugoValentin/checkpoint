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
        <script src="../lib/jQuery/jquery-3.2.1.min.js"></script>
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
                                <h3>Gesti&oacute;n de Valoraciones Hechas</h3>
                                <p>A continuaci&oacute;n se muestran los reclamos y observaciones hechos por la comunidad del campus.</p>
                            </div>
                            <div class="col-md-4">
                                <br>
                                <!-- creacion del boton Reclamos-->
                                <a href="valoracionhecharango.php" class="btn btn-primary btn-md">
                                    <span class="glyphicon glyphicon-folder-open" aria-hidden="true"></span>
                                    Valoraciones Evaluativas
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
                                    <th>Estado</th>
                                    <th>Ultimo Cambio</th>
                                    <th>imagen</th>
                                    <th>Email devolución</th>
                                    <th>Duración</th>
                                    <th>Acci&oacute;n</th>
                                </tr>
                            </thead>
                            <tbody>
                                <?php
                                ObjetoDatos::getInstancia()->ejecutarQuery("SET NAMES utf8");
                                /* servicio, valoracion, descripcion, tipo, fecha, idvaloracion_hecha, idservicios */
                                //considerar el estado de la valoracion, si esta vencida, etc.
                                $res = ObjetoDatos::getInstancia()->ejecutarQuery(""
                                        . "SELECT s.nombre as servicio, v.nombre as valoracion,vh.descripcion,vh.tipo,DATE_FORMAT(vh.fecha, '%d/%m/%Y %H:%i hs') as fechaformato, 
                                            vh.idvaloracion_hecha,s.idservicios, cev.estado,cev.fecha as ultimocambio,vhr.url_imagen,vhr.email_devolucion,vr.vencimiento "
                                        . "FROM " . Constantes::BD_SCHEMA . ".USUARIO u "
                                        . "join " . Constantes::BD_SCHEMA . ".servicios  s ON u.idusuario=s.usuario_idusuario "
                                        . "join " . Constantes::BD_SCHEMA . ".valoraciones v on v.fk_servicios_idservicios=s.idservicios "
                                        . "join " . Constantes::BD_SCHEMA . ".valoracion_reclamo vr on vr.valoraciones_idvaloraciones=v.idvaloraciones "
                                        . "join " . Constantes::BD_SCHEMA . ".ubicacion_valoracion uv on uv.fk_valoraciones_idvaloraciones=v.idvaloraciones "
                                        . "join " . Constantes::BD_SCHEMA . ".valoracion_hecha vh on vh.ubicacion_valoracion_idubicacion_valoracion=uv.idubicacion_valoracion "
                                        . "left join " . Constantes::BD_SCHEMA . ".valoracion_hecha_reclamo vhr on vhr.idvaloracion_hecha=vh.idvaloracion_hecha "
                                        . "left join (select idcambio_estado_valoracion,estado,fecha,fk_valoracion_hecha_idvaloracion_hecha from ". Constantes::BD_SCHEMA . ".cambio_estado_valoracion WHERE fecha in (SELECT MAX(fecha) from ". Constantes::BD_SCHEMA . ".cambio_estado_valoracion GROUP BY fk_valoracion_hecha_idvaloracion_hecha)) cev on cev.fk_valoracion_hecha_idvaloracion_hecha=vh.idvaloracion_hecha "
                                        . "WHERE u.idusuario = " . $_SESSION['usuario']->idusuario . " 
										"
                                        . "ORDER BY s.nombre ASC, v.nombre ASC;");
                                while ($row = $res->fetch_assoc()):
                                    if($row['vencimiento']=="-1"){
                                        $duracion = "Permanente";
                                    }else{
                                        $duracion = $row['vencimiento']." días";
                                    }
                                    ?>
                                    <tr>
                                        <td><?php echo $row['servicio'] ?></td>
                                        <td><?php echo $row['valoracion'] ?></td>
                                        <td><?php echo $row['descripcion'] ?></td>
                                        <td><?php echo $row['fechaformato'] ?></td>
                                        <?php if($row['estado']==null){echo "<td style='background-color:yellow;'>Creado</td>";}else{echo "<td>".$row['estado']."</td>";}  ?>
                                        <td><?php echo $row['ultimocambio'] ?></td>
                                        <td><?php if(!empty($row['url_imagen'])){echo "Si";}else{echo "No";} ?></td>
                                        <td><?php echo $row['email_devolucion'] ?></td>
                                        <td><?php echo $duracion; ?></td>
                                        <td><?php 
                                        if(true)
                                        {?>
                                            <a href="valoracionhecha.atender.php?id=<?php echo $row['idvaloracion_hecha'] ?>&idservicio=<?php echo $row['idservicios'] ?>">
                                                <img src="../imagenes/abm_ver.png" title="Atender valoracion">
                                            </a>&nbsp;&nbsp;&nbsp;&nbsp;
                                        <?php }else{?>
                                            <img src="../imagenes/abm_deshabilitado.png" title="No se modifica">
                                            <?php }?>
                                        </td>
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

        <script src="../lib/datatables/jquery.js"></script>
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
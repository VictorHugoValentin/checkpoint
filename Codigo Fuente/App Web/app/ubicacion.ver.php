<?php
include_once '../lib/ControlAcceso.class.php';
ControlAcceso::requierePermiso(PermisosSistema::PERMISO_UBICACION);
?>
<html>
    <head>
        <title><?php echo Constantes::NOMBRE_SISTEMA; ?></title>
        <meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1">

        <!--<script src="//ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js"></script>-->
        <link rel="stylesheet" href="../lib/jstree/style.min.css" />
<!--        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.0/css/bootstrap.min.css">-->
        <!--<link rel="stylesheet" href="../lib/bootstrap/css/bootstrap.min.css">-->
<!--        <script type="text/javascript" charset="utf8" src="http://ajax.aspnetcdn.com/ajax/jQuery/jquery-1.8.2.min.js"></script>-->
        <script type="text/javascript" charset="utf8" src="../lib/jQuery/jquery-3.2.1.min.js"></script>
        <script src="../lib/jstree/jstree.js"></script>

        <!--<link href="../gui/estilo.css" type="text/css" rel="stylesheet" />-->
    </head>
    <body>
        <?php include_once '../gui/GUImenu.php'; ?>
        <section id="main-content">
            <article>
                <div class="content">
                    <h3>Gesti&oacute;n de Ubicaciones</h3>
                    <p>A continuaci&oacute;n se muestran las ubicaciones en las que se podra realizar valoraciones.</p>
                    <div id="tree-container"></div>
                    <div id="event_result"></div>
                </div>
            </article>
        </section>

        <!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->


    <!-- Include all compiled plugins (below), or include <span id="IL_AD8" class="IL_AD">individual</span> files as needed -->
        <!--<script src="../lib/bootstrap/js/bootstrap.min.js"></script>-->


        <script type="text/javascript">
            $(document).ready(function () {
                //fill data to tree  with AJAX call
                $('#tree-container').jstree({
                    'core': {
                        'data': {
                            'url': 'ubicacion.ver.response.php?operation=get_node',
                            'data': function (node) {
                                return {'id': node.id};
                            },
                            "dataType": "json"
                        }
                        , 'check_callback': true,
                        'themes': {
                            'responsive': false
                        }
                    },
                    'plugins': ['state', 'contextmenu', 'wholerow']
                }).on('create_node.jstree', function (e, data) {
                    console.log("creando:");
                    $.get('ubicacion.ver.response.php?operation=create_node', {'id': data.node.parent, 'position': data.position, 'text': data.node.text})
                            .done(function (d) {
                                console.log("done al crear:"+d);                
                                d = JSON.parse(d);
                                
                                data.instance.set_id(data.node, d.id);
                                console.log("rama:"+d.id + 'padre:' + data.node.parent);
                            })
                            .fail(function () {console.log("falla al crear:");
                                data.instance.refresh();
                            });
                }).on('rename_node.jstree', function (e, data) {console.log("renombrando:");
                    $.get('ubicacion.ver.response.php?operation=rename_node', {'id': data.node.id, 'text': data.text})
                            .fail(function () {
                                data.instance.refresh();
                            });
                }).on('delete_node.jstree', function (e, data) {
                    $.get('ubicacion.ver.response.php?operation=delete_node', {'id': data.node.id})
                            .done(function (d) {
                                d = JSON.parse(d);
                                console.log('d:' + d + 'd.respuesta:' + d.respuesta);
                                if(d.respuesta=='no'){
                                    switch(d.causa) {
                                        case 1451:
                                            {
                                                //hay dependencias asociadas a la ubicacion
                                                alert('No se puede eliminar porque hay dependencias de esta ubicacion.');
                                            }
                                            break;
                                        case 1:
                                            {
                                                alert('No se puede eliminar');
                                            }
                                            break;
                                        default:
                                            {
                                                alert('No se puede eliminar');
                                            }
                                    } 
                                    data.instance.refresh();
                                }else{
                                    console.log("Eliminado correcto:" + d.respuesta);
                                }
                            })
                            .fail(function () {
                                data.instance.refresh();
                            });
                }).on('changed.jstree', function (e, data) {
    var i, j, r = [];
    for(i = 0, j = data.selected.length; i < j; i++) {
      r.push(data.instance.get_node(data.selected[i]).text);
    }
    $('#event_result').html('Selected: ' + r.join(', '));
  });
            });

        </script>
        <?php include_once '../gui/GUIfooter.php'; ?>
    </body>
</html>
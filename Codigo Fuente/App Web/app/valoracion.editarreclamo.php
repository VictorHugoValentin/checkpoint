<?php
include_once '../lib/ControlAcceso.class.php';
ControlAcceso::requierePermiso(PermisosSistema::PERMISO_OPCIONES_VALORACION);
require_once './gestorValoracionReclamo.php';
require_once './gestorServicio.class.php';

//paso por GET el id valoracion
$id = $_GET['id'];
$gReclamo = new gestorValoracionReclamo();
$vReclamo = $gReclamo->obtenerValoracion($id);
$gestorServicio = new gestorServicio();
$servicio = $gestorServicio->obtenerServicio($vReclamo->fk_idservicio);
$nombreservicio = $servicio->nombre;
?>
<html>
    <head>
        <title><?php echo Constantes::NOMBRE_SISTEMA; ?></title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <noscript>
            <meta http-equiv="refresh" content="0; URL=nojs/index.php">
        </noscript>

        <script src="../lib/datatables/jquery.js"></script>
<!--        <script src="../lib/validador.js" type="text/javascript"></script>-->
        <script src="../lib/validator/jquery.validate.min.js"></script>
        <script type="text/javascript" src="../lib/validadorValoracion.js"></script>
        <script src="../lib/bootstrap/js/bootstrap.min.js" type="text/javascript"></script>
        <script src="../lib/bootstrap/js/bootstrap-slider.min.js" type="text/javascript"></script>
        <script src="../lib/bootstrapSwitch/js/bootstrap-switch.min.js"></script>
        
        <link href="../lib/bootstrap/css/bootstrap-slider.min.css" type="text/css" rel="stylesheet" />
        <link href="../lib/bootstrapSwitch/css/bootstrap3/bootstrap-switch.min.css" rel="stylesheet">
        <link href="../gui/estilo.css" type="text/css" rel="stylesheet" />
        
        
    </head>
    <body>
        <?php include_once '../gui/GUI.class.php';include_once '../gui/GUImenu.php'; ?>
        <section id="main-content">
<!--            <article>-->
                <div class="content">
                    <div class="panel panel-default">
  <div class="panel-body">
                    <h3>Modificar reclamo del servicio <?php echo ($nombreservicio);?></h3>
                    <p>Por favor complete los datos a continuaci&oacute;n. Los campos marcados con (*) son obligatorios.</p>
                    <form method="post" action="valoracion.editarreclamo.procesa.php" name="formulario" id="formulario" >
<!--                        <script type="text/javascript" language="javascript">var validador = new Validator("formulario");</script>-->
                        
                            <div class="form-group row">
                                <label for="nombre" class="col-sm-4 col-form-label">Nombre del Reclamo (*)</label>
                                <div class="col-xs-3">
<!--                                    <input type="text" class="form-control" name="nombre" id="nombre" title="Nombre de la Valoracion" 
                                           value="<?php echo $vReclamo->nombre;?>"/>-->
                                    <input type="text" name="nombre" id="nombre" pattern=".{3,45}" required maxlength="45" class="form-control" title="Nombre de la Valoracion"
                                           value="<?php echo $vReclamo->nombre;?>"/>
<!--                                    <script>validador.addValidation("nombre", "obligatorio");</script>
                                    <script>validador.addValidation("nombre", "solotexto");</script>-->
                                </div>
                                <span>(Entre 3 y 45 letras)</span>
                            </div>
                            
                            <div class="form-group row">
                                <label for="descripcion" class="col-sm-4 col-form-label">Descripci&oacute;n</label>
                                <div class="col-xs-3">
<!--                                    <textarea class="form-control" rows="5" id="comment"></textarea>-->
                                    <textarea class="form-control" name="descripcion" rows="3" minlength="5" maxlength="140" id="descripcion" title="Texto descriptivo"><?php echo $vReclamo->descripcion;?></textarea>
<!--                                    <script>validador.addValidation("descripcion", "obligatorio");</script>
                                    <script>validador.addValidation("descripcion", "solotexto");</script>-->
                                </div>
                                <span>(Entre 5 y 140 letras)</span>
                            </div>

                            <div class="form-group row">
                                <label for="recibirNotificacion" class="col-sm-4 col-form-label">Recibir Notificaci&oacute;n por Email</label>
                                <div class="col-sm-8">
                                    <input id="recibirNotificacion" type="checkbox" name="recibir_notificacion" data-label-width="5"  data-on-text="Si" data-off-text="No" data-size="mini" 
                                           value=<?php if($vReclamo->recibir_notificacion_email){echo "\"1\" checked";}else{echo "\"1\"";}?>/>
                                </div>
                            </div>

                            <div class="form-group row">
                                    <label for="permite_foto" class="col-sm-4 col-form-label">Permite Foto</label>
                                    <div class="col-sm-8">
                                        <input id="permite_foto" type="checkbox" name="permite_foto" data-label-width="5"  data-on-text="Si" data-off-text="No" data-size="mini" value=
                                               <?php if($vReclamo->permite_foto){echo "\"1\" checked";}else{echo "\"1\"";}?>/>
                                    </div>
                            </div>
                            
                            <div class="form-group row">
                                    <label for="permite_descripcion" class="col-sm-4 col-form-label">Permite Descripci&oacute;n</label>
                                    <div class="col-sm-8">
                                        <input id="permite_descripcion" type="checkbox" name="permite_descripcion" data-label-width="5"  data-on-text="Si" data-off-text="No" data-size="mini" value=
                                               <?php if($vReclamo->permite_descripcion){echo "\"1\" checked";}else{echo "\"1\"";}?>/>
                                    </div>
                            </div>
                            
                            <div class="form-group row">
                                    <label for="permite_email" class="col-sm-4 col-form-label">Permite Email</label>
                                    <div class="col-sm-8">
                                        <input id="permite_email" type="checkbox" name="permite_email" data-label-width="5"  data-on-text="Si" data-off-text="No" data-size="mini" value=
                                               <?php if($vReclamo->permite_email){echo "\"1\" checked";}else{echo "\"1\"";}?>/>
                                    </div>
                            </div>
                            
                            <div class="form-group row">
                                    <label for="habilitado" class="col-sm-4 col-form-label">Habilitado</label>
                                    <div class="col-sm-8">
                                        <input id="habilitado" type="checkbox" name="habilitado" data-label-width="5"  data-on-text="Si" data-off-text="No" data-size="mini" value=
                                               <?php if($vReclamo->habilitado){echo "\"1\" checked";}else{echo "\"1\"";}?>/>
                                    </div>
                            </div>
                            
                            <div class="form-group row">
                                <label for="ex7" class="col-sm-4 col-form-label">Vencimiento (d&iacute;as)</label>
                                <div class="col-sm-8">
                                    <b>1</b>&nbsp;&nbsp;<input name="vencimiento" id="ex7" data-slider-id='ex1Slider' type="text" data-slider-min="1" data-slider-max="15" data-slider-step="1" data-slider-value="<?php if($vReclamo->vencimiento>0){echo $vReclamo->vencimiento;$enable="true";}else{echo "1";$enable="false";}?>" data-slider-enabled="<?php echo $enable;?>"/>&nbsp;&nbsp;<b>15</b>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    <label for="ex7-enabled"> Sin Vencimiento&nbsp;&nbsp;&nbsp;<input id="ex7-enabled"  name="sinvencimiento"type="checkbox" <?php if($enable=="false"){echo "checked";}?> /></label>
                                </div>
                            </div>
                            
                            <input type="hidden" name="idservicio" value="<?php echo $vReclamo->fk_idservicio;?>" />
                            <input type="hidden" name="nombreservicio" value="<?php echo $nombreservicio; ?>" />
                            <input type="hidden" name="idvaloracion" value="<?php echo $id; ?>" />
                        <fieldset>
                            <legend>Opciones</legend>
                            <input type="submit" class="btn btn-success" value="Guardar" />
                            <input type="reset" class="btn btn-default" value="Restablecer Campos" />
                            <input type="button" id="salir" class="btn btn-default" onClick="chgAction();" value="Salir" />
                        </fieldset>
                            
                        <script language="javascript" type="text/javascript">
                            function chgAction(){
                                document.getElementById("formulario").action ="valoracion.ver.php";
                                document.getElementById("formulario").submit();
                            }
                        </script>

                    </form>
                    </div>
                    </div>
                </div>
<!--            </article>-->
            <script>
                $(document).ready(function () {
                    var slider = new Slider('#ex7', {
                        tooltip: '<?php if($enable=="false"){echo "hide";}else{echo "always";}?>',
                        tooltip_position:'bottom',
                        formatter: function(value) {
                            return 'Valor actual: ' + value;
                        }
                    });
                    
                    $("#ex7-enabled").click(function() {
                        if(this.checked) {
                            slider.setAttribute('tooltip','hide');
                            slider.refresh();
                            slider.disable();
                            
                        }else {
                            slider.setAttribute('tooltip','always');
                            slider.refresh();
                            slider.enable();
                       	}
                    });
                    
                    $("[name='recibir_notificacion']").bootstrapSwitch();
                    $("[name='permite_foto']").bootstrapSwitch();
                    $("[name='permite_descripcion']").bootstrapSwitch();
                    $("[name='permite_email']").bootstrapSwitch();
                    $("[name='habilitado']").bootstrapSwitch();

                });
            </script>
        
        <?php include_once '../gui/GUIfooter.php'; ?>
       </section>
    </body>
</html>
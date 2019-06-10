<?php
include_once '../lib/ControlAcceso.class.php';

ControlAcceso::requierePermiso(PermisosSistema::PERMISO_SERVICIOS);
/* obtencion de los datos sobre los que se va a trabajar */
$datos_antes = ObjetoDatos::getInstancia()->ejecutarQuery(""
        . "SELECT * FROM checkpoint.servicios "
        . "WHERE idservicios = {$_GET['id']}");

if ($datos_antes != null) {
    $servicio_antes = $datos_antes->fetch_assoc();
//obtension del nombre
    $nombre_actual = $servicio_antes['nombre'];
//obtension de la descripcion
    $descripcion_actual = $servicio_antes['descripcion'];
//obtencion de correo electronico valoraciones
    $email_valoraciones_actual = $servicio_antes['email_valoraciones'];     //si es nulo, entonces es el email del encarado
//obtencion de estado (habilitado)
    $habilitado_actual = $servicio_antes['habilitado'];
//obtencion de encargado
    $encargado_actual = $servicio_antes['usuario_idusuario'];
//obtencion del numero de icono
    $icono_actual = $servicio_antes['icono'];
}
?>
<html>
    <head>
        <title><?php echo Constantes::NOMBRE_SISTEMA; ?></title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <script src="../lib/jQuery/jquery-3.2.1.min.js" type="text/javascript"></script>
        <script src="../lib/validador.js" type="text/javascript"></script>
        <script src="../lib/bootstrap/js/bootstrap.min.js" type="text/javascript"></script>
        <script src="../lib/validator/jquery.validate.min.js"></script>
        <script type="text/javascript" src="../lib/validadorServicios.js"></script>
        <script src="../lib/imagepicker/image-picker.js" type="text/javascript"></script>
        <link href="../gui/estilo.css" type="text/css" rel="stylesheet" />
        <link href="../lib/imagepicker/image-picker.css" type="text/css" rel="stylesheet" />
    </head>
    <body>
        <?php include_once '../gui/GUI.class.php';include_once '../gui/GUImenu.php'; ?>
        <section id="main-content">
            <article>
                <div class="content">
                    <h3>Editar Servicio «<?php echo ($nombre_actual); ?>»</h3>
                    <p>Por favor complete los datos a continuaci&oacute;n. Los campos marcados con (*) son obligatorios.</p>
                    <div class="panel-body">
                        <div class="row">
                            <form method="post" action="servicio.editar.procesa.php" name="formulario" id="formulario" >
                                <script type="text/javascript" language="javascript">var validador = new Validator("formulario");</script>
                                <fieldset>
                                    <legend>Propiedades</legend>   
                                    <input type="hidden" name="idservicio" value="<?php echo $_GET['id']; ?>" />
                                    <div class="form-group row">
                                        <label for="nombre" class="col-sm-3 col-form-label">Nombre Servicio (*)</label>
                                        <div class="col-sm-3">
                                            <input type="text" name="nombre" id="nombre" pattern=".{3,20}" required maxlength="20" class="form-control" title="Nombre del Servicio" value="<?php echo $nombre_actual; ?>"/>
                                        </div>
                                        <span>(Entre 3 y 20 letras)</span>
                                    </div>

                                    <div class="form-group row">
                                        <label for="descripcion" class="col-sm-3 col-form-label">Descripcion (*)</label>
                                        <div class="col-sm-3">
                                            <textarea name="descripcion" rows="3" cols="32" minlength="5" maxlength="140" id="descripcion" class="form-control"><?php echo $descripcion_actual; ?></textarea>
<!--                                            <script>validador.addValidation("descripcion", "obligatorio");</script>
                                            <script>validador.addValidation("descripcion", "solotexto");</script>-->
                                        </div>
                                        <span>(Entre 5 y 140 letras)</span>
                                    </div>

                                    <div class="form-group row">
                                        <label class="col-sm-3 col-form-label">Correo electr&oacute;nico Valoraciones (*)</label>
                                        <div class="col-sm-7">
                                            <label style="font-weight:normal;">Mismo correo Encargado <input type="checkbox" name="mismo" <?php
                                                if (($email_valoraciones_actual == '')) {
                                                    echo " checked";
                                                }
                                                ?> /> </label>
                                            &nbsp;&nbsp;&nbsp;&nbsp;o Ingresar Email
                                            <input type="text" name="email" id="email" title="Correo electronico" size="40" maxlength="50" <?php
                                            if ($email_valoraciones_actual != '') {
                                                echo " value='" . $email_valoraciones_actual . "' ";
                                            } else {
                                                echo " value = '' disabled='true' ";
                                            }
                                            ?> />
                                        </div>
                                    </div>

                                    <div class="form-group row">
                                        <label for="habilitado" class="col-sm-3 col-form-label">Encargado (*)</label>
                                        <div class="col-sm-2">
                                            <select name="idencargado" title="Encargado" class="form-control">
                                                <option value="0">Seleccione</option>
                                                <?php
                                                $datos = ObjetoDatos::getInstancia()->ejecutarQuery(""
                                                        . "SELECT u.idusuario, u.nombre "
                                                        . "FROM " . Constantes::BD_USERS . ".USUARIO u "
                                                        . "join " . Constantes::BD_USERS . ".USUARIO_ROL ur on u.idusuario=ur.idusuario "
                                                        . "join " . Constantes::BD_USERS . ".ROL r on r.idrol=ur.idrol "
                                                        . "where r.nombre='" . PermisosSistema::ROL_ENCARGADO . "' "
                                                        . "order by u.nombre asc;");
                                                for ($x = 0; $x < $datos->num_rows; $x++) {
                                                    $encargado = $datos->fetch_assoc();
                                                    if ($encargado['idusuario'] == $encargado_actual) {
                                                        $selected = "selected =  'selected' ";
                                                    } else {
                                                        $selected = "";
                                                    }
                                                    ?>
                                                    <option value="<?= $encargado['idusuario']; ?>" <?php echo $selected; ?>><?= $encargado['nombre']; ?></option>
                                                <?php } ?>
                                            </select>
                                            <script>validador.addValidation("idencargado", "selectOptions=0");</script>
                                        </div>
                                    </div>

                                    <div class="form-group row">
                                        <label for="icono" class="col-sm-3 col-form-label">Icono</label>
                                        <div class="col-sm-7">
                                            <img id="icono" src="../imagenes/iconos/png/<?php echo $icono_actual; ?>.png" />
                                            <!-- Button trigger modal -->
                                            <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
                                                Seleccionar Icono
                                            </button>
                                        </div>
                                    </div>


                                    <!-- Modal -->
                                    <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                        <div class="modal-dialog modal-lg" role="document">
                                            <div class="modal-content">
                                                <div class="modal-header">
                                                    <h4 class="modal-title" id="exampleModalLabel">Haga click en una imagen para seleccionar</h4>
                                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                        <span aria-hidden="true">&times;</span>
                                                    </button>
                                                </div>
                                                <div class="modal-body" style="height:300px;overflow-y:scroll">
                                                    <!--        en esta parte van las imagenes para seleccionar-->
                                                    <select id="selecticon" class="image-picker show-html" name="selecticon">
                                                        <option value=""></option>
                                                        <?php
                                                        for ($i = 1; $i <= 50; $i++) {
                                                            if ($i == $icono_actual) {
                                                                $selected = " selected='selected'";
                                                            } else {
                                                                $selected = "";
                                                            }

                                                            echo "<option data-img-src='../imagenes/iconos/png/" . $i . ".png' value='" . $i . "' " . $selected . ">Icono$i</option>";
                                                        }
                                                        ?>
                                                    </select>
                                                    <!--        fin de la parte en que van las imagenes para seleccionar-->
                                                </div>
                                                <div class="modal-footer">
                                                    <!--                                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>-->
                                                    <button type="button" class="btn btn-success" data-dismiss="modal">Aceptar</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </fieldset>

                                <fieldset>
                                    <legend>Opciones</legend>
                                    <input type="submit" class="btn btn-success" onclick="return validar(document.formulario);" id="guardar" value="Guardar" />
                                    <a href="servicios.ver.php">
                                        <input type="button" class="btn btn-default" value="Salir" />
                                    </a>
                                </fieldset>
                                <p>&nbsp;</p>

                            </form>
                        </div><!-- row -->
                    </div><!-- panel body -->
                </div><!-- content -->
            </article>
            <script>
                $(document).ready(function () {

                    $("#selecticon").imagepicker({
                        hide_select: true,
                        show_label: false,
                        changed: function (select, newValues, oldValues, event) {
                            if (newValues.toString() !== '') {
                                //cambio la imagen cuando haga click en otra imagen
                                $("#icono").prop("src", "../imagenes/iconos/png/" + newValues.toString() + ".png");
                            } else {
                                $("#icono").prop("src", "../imagenes/iconos/png/000.png");
                            }
                        }
                    });
                    $('input[name="mismo"]').on('change', function () {
                        var radioValue = $('input[name="mismo"]:checked').val();
                        //alert(radioValue);
                        if (radioValue == 'on') {
                            $("#email").prop('disabled', true);
                            $("#email").prop('value', '');
                        } else {
                            $("#email").prop('disabled', false);
                        }
                        ;
                    });
                });

                function validar(formulario) {

                    //verificar que no esta tildado la casilla checkbox,
                    if (!formulario.mismo.checked) {
                        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(formulario.email.value)) {
                            return (true);
                        } else {
                            alert("Formato de Email invalido!");
                            formulario.email.focus();
                            return (false);
                        }
                    } else {
                        return true;
                    }
                }
            </script>
        </section>
        <?php include_once '../gui/GUIfooter.php'; ?>
    </body>
</html>
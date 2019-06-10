<?php /* recibo por post email, nombre, imagen, googleid */
include_once '../lib/ControlAcceso.class.php';
?>
<html>
    <head>
        <title><?php echo Constantes::NOMBRE_SISTEMA; ?></title>
        <noscript>
            <meta http-equiv="refresh" content="0; URL=sinJavascript.php">
        </noscript>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="google-signin-client_id" content="356408280239-7airslbg59lt2nped9l4dtqm2rf25aii.apps.googleusercontent.com" />
        <link href="../gui/estilo.css" type="text/css" rel="stylesheet" />
        <link href="../gui/responsivo.css" type="text/css" rel="stylesheet" />
        <script type="text/javascript" src="https://apis.google.com/js/platform.js" async defer></script>
        <script type="text/javascript" src="../lib/datatables/jquery.js"></script>
        <script type="text/javascript" src="../lib/jQuery/jquery.redirect.js"></script>
        <script type="text/javascript" src="../lib/login.js"></script>
    </head>
    <body>
        <?php include_once '../gui/GUI.class.php';
        include_once '../gui/GUImenu.php';
        ?>
        <section id="main-content">
            <article>
                <div class="content">
                    <h3><?php echo Constantes::NOMBRE_SISTEMA; ?></h3>
                    <div>
                        <h4>Bienvenido. Ha ingresado al sistema CheckPoint</h4>
                        <p>Estimado agente:<br>
                            <?php
                            /* determinar el rol del usuario (administrador, encargado, consultor */
                            $aux = $_SESSION['usuario']->roles;
                            $nombrerol = $aux[0]->nombre;
                            switch ($nombrerol) {
                                case "Encargado":
                                    $mensaje = "Usted podrá administrar las valoraciones asociadas a los servicios que posea y atender las observaciones que la comunidad"
                                        . " del Campus realice.";
                                    break;
                                case "Administrador":
                                    $mensaje = "Usted podrá gestionar los servicios que serán asignados a los encargados, como así también las ubicaciones físicas en"
                                        . "las que se distribuye el Campus; y administrar los usuarios que tendrán acceso a este sistema.";
                                    break;
                                case "Usuario Consulta":
                                    $mensaje = "Usted podrá realizar consultas estadísticas sobre las valoraciones que reciben los servicios.";
                                    break;
                                default:
                                    $mensaje = "";
                                    break;
                            }
                            echo $mensaje;
                            ?>
                        </p>
                    </div>
                </div>
            </article>
        </section>
<?php include_once '../gui/GUIfooter.php'; ?>
    </body>
</html>
<?php
error_reporting(E_ALL);
ini_set('display_errors', '1');
include_once '../lib/ControlAcceso.class.php';
ControlAcceso::requierePermiso(PermisosSistema::PERMISO_UBICACION);
require_once 'gestorUbicacion.class.php';
require "../lib/generador_qr/phpqrcode/qrlib.php";
include '../lib/funcionauxiliar.php';

$mensaje = "La Ubicación ha sido agregada con éxito.";

//obtengo los valores POST
// -------------------------------------------------------------------
$nombre_ = mb_ucfirst(mb_strtolower($_POST['nombrenuevo'],"UTF-8"));
$dependencia_ = $_POST['iddependencia'];
// -------------------------------------------------------------------
$respuesta = 1;
try{
    $ubicacion = new gestorUbicacion();
    $id_generado = $ubicacion->agregarUbicacion($nombre_, $dependencia_);

    /* parte dde la creacion de la imagen qr         */
    $codigoQr = $id_generado;

    //Declaramos una carpeta temporal para guardar la imagenes generadas
    $dir = '../imagenes/temp/';

    //Si no existe la carpeta la creamos
    if (!file_exists($dir))
    mkdir($dir);

    //Declaramos la ruta y nombre del archivo a generar
    $filename = $dir.$id_generado.'.png';

    //Parametros de Condiguración
    $tamaño = 10; //Tamaño de Pixel
    $level = 'L'; //Precisión L= Baja, M = Media, Q = Alta, H = Maxima
    $framSize = 3; //Tamaño en blanco
    $contenido = $codigoQr; //Texto Contenido

    //Enviamos los parametros a la Función para generar código QR 
    QRcode::png($contenido, $filename, $level, $tamaño, $framSize);   
}catch(Exception $ex){
    $respuesta = 0;
    $mensaje = $ex->getMessage();
}
?>
<html>
    <head>
        <title><?php echo Constantes::NOMBRE_SISTEMA; ?></title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
        <script src="../lib/jQuery/jquery-3.2.1.min.js"></script>
        <link href="../gui/estilo.css" type="text/css" rel="stylesheet" />
    </head>
    <body>
        <?php include_once '../gui/GUI.class.php';include_once '../gui/GUImenu.php'; ?>
        <section id="main-content">
            <article>
                <div class="content">
                    <h3>Alta de Ubicaci&oacute;n</h3>
                    
                    <div class="row">
                        <?php if($respuesta!=0){ 
                            $class = "success";
                        }else{$class = "danger";} ?>
                        <div class="col-md-7"><p class="alert alert-<?php echo $class; ?>"><?php echo $mensaje; ?></p>
                                
                                <p>Opciones</p>
                                <a href="ubicacion.ver.php">
                                    <input type="button" class="btn btn-primary" value="Ver Ubicaciones" />
                                </a>
                        </div>
                        <?php if($respuesta != 0){ ?>
                        <div class="col-md-5">
                            <p>El codig QR generado es :<br>
                           <img src="<?php echo $dir.basename($filename);  ?>" /></p>
                        </div>
                        <?php }?>
                    </div>
                </div>
            </article>
        </section>
        <?php include_once '../gui/GUIfooter.php'; ?>
    </body>
</html>
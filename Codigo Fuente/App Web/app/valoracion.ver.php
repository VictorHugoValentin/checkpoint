<?php

include_once '../lib/ControlAcceso.class.php';
include_once '../modelo/Workflow.class.php';
ControlAcceso::requierePermiso(PermisosSistema::PERMISO_OPCIONES_VALORACION);
//print_r($_POST);
include_once('../lib/easytemplate.php');
include '../lib/funcionauxiliar.php';

$contenedor = load("../gui/html/valoracion.ver.html");
$contenedor = setVar($contenedor, 'nombre_sistema', Constantes::NOMBRE_SISTEMA);
$menu = get_include_contents("../gui/GUImenu.php");
$contenedor = replaceHTML($contenedor, 'encabezado', $menu);

/* cambiar el conjunto de caracteres a utf8 */
ObjetoDatos::getInstancia()->set_charset("utf8");

/* parte en la que se obtiene el/los servicios del usuario encargado */
$res = ObjetoDatos::getInstancia()->ejecutarQuery(""
        . "SELECT s.idservicios, s.nombre as servicio "
        . "FROM " . Constantes::BD_SCHEMA . ".USUARIO u "
        . "join " . Constantes::BD_SCHEMA . ".servicios  s "
        . "ON u.idusuario=s.usuario_idusuario "
        . "WHERE u.idusuario = " . $_SESSION['usuario']->idusuario . " "
        . "ORDER BY s.nombre ASC ");
$cantidad = 0;
if ($res) {
    $cantidad = $res->num_rows;
}
/* si la cantidad es cero, mensaje advertencia y opcion de salir
 * si la cantidad es una, solo muestra ese servicio,
 * si la cantidad es mayor a una, se muestra el servicio seleccionado (primer servicio por omision) y un combobox para los restantes
 *  */
if ($cantidad == 0) {
    //encargado sin servicio
    $titulo = "No hay servicio para administrar";
    
    //sacar el resto de la pagina
    $contenedor = delHTML($contenedor, 'hay_servicios');
} else {

    //region de html para personalizar
    $hay_servicios = getHTML($contenedor, 'hay_servicios');
    
    if ($cantidad == 1) {
        $hay_servicios = delHTML($hay_servicios, 'cambio_servicio');
        $servicioActual = $res->fetch_assoc();
        $idServicioActual = $servicioActual['idservicios'];
        $nombreServicioActual = $servicioActual['servicio'];
        $titulo = "Gestión de Valoraciones para el servicio <strong>".mb_strtoupper($nombreServicioActual)."</strong>";
    } else {
        //encargado con mas de un servicio

        //mostrar un combobox para los demas servicios
        $select = "<select name='idservicio' style='width:150px' >";
        
        if(isset($_POST['idservicio'])){
            
            //cuando ha seleccionado otro servicio
            while ($option = $res->fetch_assoc()) {
                if($option['idservicios'] == $_POST['idservicio']){
                    $nombreServicioActual = $option['servicio'];
                    $idServicioActual = $_POST['idservicio'];
                }else{
                    $select .= "<option value='" . $option['idservicios'] . "'>" . $option['servicio'] . "</option>";
                }
            }
        }else{
            //tomo el primer servicio cuando no selecciono nada
            $option = $res->fetch_assoc();
            $nombreServicioActual = $option['servicio'];
            $idServicioActual = $option['idservicios'];
            while ($option = $res->fetch_assoc()) {
                $select .= "<option value='" . $option['idservicios'] . "'>" . $option['servicio'] . "</option>";
            }
        }
        $select .= "</select>";
        $titulo = "Gestión de Valoraciones para el servicio <strong>".mb_strtoupper($nombreServicioActual)."</strong>";

        
        $hay_servicios = replaceHTML($hay_servicios, 'select_servicio', $select);
    }
    $hay_servicios = setvar($hay_servicios, 'idservicio', $idServicioActual);
    $hay_servicios = setvar($hay_servicios, 'nombreservicio', $nombreServicioActual);
    $contenedor = delHTML($contenedor, 'sin_servicio');

    //parte de la tabla principal

$res = ObjetoDatos::getInstancia()->ejecutarQuery(""
        . "SELECT v.idvaloraciones, v.nombre, v.tipo, v.recibir_notificacion_email, v.permite_descripcion, v.habilitado, s.nombre as servicio "
        . "FROM " . Constantes::BD_SCHEMA . ".valoraciones v "
        . "join " . Constantes::BD_SCHEMA . ".servicios  s "
        . "ON v.fk_servicios_idservicios = s.idservicios "
        . "WHERE v.fk_servicios_idservicios = {$idServicioActual}");
$totalFilas = '';
while ($row = $res->fetch_assoc()){
    $getFila = getHTML($hay_servicios, 'fila_servicio');
    $getFila = setvar($getFila, 'valoracion_nombre', (($row['nombre'])));
    $getFila = setvar($getFila, 'tipo', ucfirst(strtolower($row['tipo'])));
    if (($row['recibir_notificacion_email']) == '1') {
        $getFila = setvar($getFila, 'recibir_notificacion_email', 'Si');
    } else {
        $getFila = setvar($getFila, 'recibir_notificacion_email', 'No');
    }

    if ($row['habilitado'] == '1') {
        $hab = "Si";
        $getFila = setvar($getFila, 'habilit', "1");
        $getFila = setvar($getFila, 'imagenelimina', "abm_eliminar.png");
        $getFila = setvar($getFila, 'titulohabilitar', "Deshabilitar");
    } else {
        $hab = "No";
        $getFila = setvar($getFila, 'habilit', "0");
        $getFila = setvar($getFila, 'imagenelimina', "abm_deshabilitado.png");
        $getFila = setvar($getFila, 'titulohabilitar', "Habilitar");
    }
    $getFila = setvar($getFila, 'habilitado', $hab);
    
    if ($row['permite_descripcion'] == '1') {
        $desc = "Si";
    } else {
        $desc = "No";
    }
    $getFila = setvar($getFila, 'permite_descripcion', $desc);
    
    if ($row['tipo'] == 'reclamo') {
        $enlace = "editarreclamo";
    } else {
        $enlace = "editar";
    }
    $getFila = setvar($getFila, 'enlace', $enlace);

    $getFila = setvar($getFila, 'idservicio', $idServicioActual);
    $getFila = setvar($getFila, 'servicio', ucfirst(strtolower($row['servicio'])));
    $getFila = setvar($getFila, 'idvaloraciones', $row['idvaloraciones']);
    $totalFilas .= $getFila;
}
$hay_servicios = replaceHTML($hay_servicios, 'fila_servicio', $totalFilas);
$contenedor = replaceHTML($contenedor, 'hay_servicios', $hay_servicios);
    
//$contenedor = delHTML($contenedor, 'sin_servicio');
}
$contenedor = setvar($contenedor, 'titulo', $titulo);


$contenedor = replaceHTML($contenedor, 'footer', get_include_contents('../gui/GUIfooter.php'));
echo cleanup($contenedor);

/**
 * @assert ("../gui/GUIfooter.php") == "texto"
 * @param type $filename
 * @return boolean
 */
function get_include_contents($filename) {
    if (is_file($filename)) {
        ob_start();
        include $filename;
        return ob_get_clean();
    }
    return false;
}

?>
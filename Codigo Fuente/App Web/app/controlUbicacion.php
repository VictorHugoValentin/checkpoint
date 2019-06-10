<?php

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
require_once 'gestorUbicacion.class.php';

//obtencion de las variables post
switch ($_GET['opcion']) {
    case 'getTree':{
        $ubicacion = new gestorUbicacion();
        return $ubicacion->obtenerArbol();
    }
    break;

    case 'nuevo':{
        //obtengo los valores POST
        $nombre_ = $_POST['nombre'];
        $dependencia_ = $_POST['dependencia'];
        $respuesta = 1;
        try{
            $ubicacion = new gestorUbicacion();
            $ubicacion->agregarUbicacion($nombre_, $dependencia_);
        }catch(Exception $ex){
            $respuesta = 0;
        }
        //preparar respuesta en JSON
        $datos = array('respuesta' => $respuesta );
        echo json_encode($datos);
    }
    break;

    default:{
        //no deberia pasar
    }
    break;
}

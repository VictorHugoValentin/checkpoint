<?php

//include_once '../gui/GUI.class.php';
//setlocale(LC_TIME, 'es_AR.utf8');

/**
 * 
 * Clase para mantener las constantes de sistema
 * @author Eder dos Santos <esantos@uarg.unpa.edu.ar>
 * 
 */
class Constantes {

    
    const NOMBRE_SISTEMA = "CheckPoint";
    
    const WEBROOT = "C:\\xampp\\htdocs\\checkpoint";
//    const WEBROOT = "/var/www/html/checkpoint";

    const APPDIR = "checkpoint";
        
    const SERVER = "http://localhost";
//    const SERVER = "http://checkpoint.192.168.0.12.xip.io";

    const APPURL = "http://localhost/checkpoint/";
//    const APPURL = "http://checkpoint.192.168.0.12.xip.io/checkpoint/";
    
    /* URL principal a la que se accede cuando se acceda (todos) */
    const HOMEURL = "http://localhost/checkpoint/app/index.php";
//    const HOMEURL = "http://checkpoint.192.168.0.12.xip.io/checkpoint/app/index.php";
    
    /* pagina a la que se accesa cuando se logro la correcta autenticacion */
    const HOMEAUTH = "http://localhost/checkpoint/app/bienvenido.php";
//    const HOMEAUTH = "http://checkpoint.192.168.0.12.xip.io/checkpoint/app/bienvenido.php";
    
    const BD_SCHEMA = "checkpoint";
    const BD_USERS = "checkpoint";
    
}

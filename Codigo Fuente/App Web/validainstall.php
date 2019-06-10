<!DOCTYPE html>
<html>
    <head>
        <title>Script de comprobacion de componentes de Checkpoint</title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body>
        <h3>Comprobación de instalación de componentes necesarios de Checkpoint</h3>
        <div>Librería GD....
        <?php
        $corregir = false;
        if (!extension_loaded('gd')) {
            echo "<span style='color:red;'>No tiene instalada.</span>";
            $corregir = true;
        }else{
            echo "OK.";
        }?>
        </div>
        <div>Extension mbstring....
        <?php
        if (!extension_loaded('mbstring')) {
            echo "<span style='color:red;'>No tiene instalada.</span>";
            $corregir = true;
        }else{
            echo "OK.";
        }?>
        </div>
        <div>Comprobación de escritura de carpetas.... 
            <?php
            $is_writable = file_put_contents('imagenes/temp/test.txt', "test");
            if ($is_writable > 0){
                echo "OK";
            } else{
                echo "<span style='color:red;'>El directorio de imagenes no tiene permiso para escritura.</span>";
                $corregir = true;
            }
            ?>
        </div>
        <?php 
        if($corregir){
            echo "<h3>Hay componentes que no están instalados y que son esenciales para la operación de Checkpoint</h3>";
        }else{
            echo "<h3>Todo está correctamente instalado para que se pueda operar Checkpoint.</h3>";
        }
        ?>
    </body>
</html>
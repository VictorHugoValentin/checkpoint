<!DOCTYPE html>
<html>
    <head>
        <title>Script de comprobacion de componentes de Checkpoint</title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <script type="text/javascript">
            function popUp()
            {
                document.getElementById("javascr").innerHTML = "<i>JavaScript está habilitado. Se puede operar desde este puesto.</i>";
            }
        </script>
    </head>
    <body onLoad='popUp()'>
          <h3>Comprobación de instalación de componentes necesarios de Checkpoint</h3>
        <div>Librería GD........
            <?php
            $corregir = false;
            if (!extension_loaded('gd')) {
                echo "<span style='color:red;'>No tiene instalada.</span>";
                $corregir = true;
            } else {
                echo "<i>Instalado correctamente.</i>";
            }
            ?>
        </div>
        <div>Extension mbstring........
            <?php
            if (!extension_loaded('mbstring')) {
                echo "<span style='color:red;'>No tiene instalada.</span>";
                $corregir = true;
            } else {
                echo "<i>Instalado correctamente.</i>";
            }
            ?>
        </div>
        <div>Comprobación de escritura de carpetas........ 
            <?php
            $is_writable = file_put_contents('imagenes/temp/test.txt', "test");
            if ($is_writable > 0) {
                echo "<i>Instalado correctamente.</i>";
            } else {
                echo "<span style='color:red;'>El directorio de imagenes no tiene permiso para escritura.</span>";
                $corregir = true;
            }
            ?>
        </div>
        <?php
        if ($corregir) {
            echo "<h3>Hay componentes que no están instalados y que son esenciales para la operación de Checkpoint</h3>";
        } else {
            echo "<h3>Los componentes y extensiones del servidor están correctamente instalados para que se pueda operar Checkpoint.</h3>";
        }
        ?>
        <noscript><span style='color:red;'>Javascript no está habilitado en este navegador, por lo que no podrá acceder para operar desde este puesto.</span></noscript>
        <div id="javascr"></div>
    </body>
</html>
<?php

require_once '../lib/ObjetoDatos.class.php';
require_once '../lib/Constantes.class.php';

class Ubicacion {

    public $id;
    public $nombre;
    public $codigo_qr;
    public $dependencia;

    public function setId($id) {
        $this->id = $id;
    }

    public function setNombre($nombre) {
        $this->nombre = $nombre;
    }

    public function setCodigo_qr($codigo_qr) {
        $this->codigo_qr = $codigo_qr;
    }

    public function setDependencia($dependencia) {
        $this->dependencia = $dependencia;
    }

}

class gestorUbicacion {

    public function __construct() {
        ;
    }

    /**
     *  Obtiene los datos de la ubicación a partir del identificador
     * @param type $idubicacion_
     * @return type
     * @throws Exception
     */
    public function obtenerUbicacion($idubicacion_) {
        $resultados = false;
        $ubicacion = null;
        $codigoerror = "";
        $mensaje = "No se pudo obtener los datos de la ubicación.";
        try {

            $resultados = ObjetoDatos::getInstancia()->ejecutarQuery(""
                    . "SELECT idubicacion,nombre,codigo_qr,fk_ubicacion_idubicacion FROM `ubicacion` where idubicacion ={$idubicacion_} "
            );
            if (!$resultados) {
                $codigoerror = ObjetoDatos::getInstancia()->sqlstate;
            } else {
                if ($fila = $resultados->fetch_assoc()) {
                    $ubicacion = new Ubicacion();
                    $ubicacion->setId($idubicacion_);
                    $ubicacion->setNombre($fila['nombre']);
                    $ubicacion->setCodigo_qr($fila['nombre']);
                    $ubicacion->setDependencia($fila['fk_ubicacion_idubicacion']);
                }
            }
        } catch (Exception $ex) {
            $mensaje = "Ha ocurrido un error. "
                    . "Codigo de error MYSQL: " . $exc->getCode() . ". ";
            $ubicacion = null;
        }
        if (!$resultados) {
            throw new Exception($mensaje);
        }
        return $ubicacion;
    }

    /**
     * 
     * @param type $nombre
     * @param type $dependencia
     * @return int
     * @throws Exception
     */
    public function agregarUbicacion($nombre, $dependencia) {
        $retorno = 0;
        $codigoerror = "";
        $mensaje = "No se pudo agregar la ubicacion $nombre";
        if (!empty($dependencia) && !empty($nombre)) {
            try {
                $qr = $nombre . $dependencia;
                $cons2 = ".ubicacion (idubicacion, nombre, codigo_qr, fk_ubicacion_idubicacion) ";
                ObjetoDatos::getInstancia()->autocommit(false);
                ObjetoDatos::getInstancia()->begin_transaction();
                $respuesta = ObjetoDatos::getInstancia()->ejecutarQuery(""
                        . "INSERT INTO " . Constantes::BD_USERS . $cons2
                        . "VALUES (NULL, '{$nombre}', '{$qr}', '{$dependencia}')");
                if (!$respuesta) {
                    $codigoerror = ObjetoDatos::getInstancia()->sqlstate;
                    ObjetoDatos::getInstancia()->rollback();
                } else {
                    $retorno = ObjetoDatos::getInstancia()->insert_id;
                    ObjetoDatos::getInstancia()->commit();
                }
                ObjetoDatos::getInstancia()->autocommit(true);
            } catch (Exception $exc) {
                $mensaje = "Ha ocurrido un error. "
                        . "Codigo de error MYSQL: " . $exc->getCode() . ". ";
                ObjetoDatos::getInstancia()->rollback();
                ObjetoDatos::getInstancia()->autocommit(true);
                $retorno = 0;
            }
            if (!$respuesta) {
                if ($codigoerror = "23000") {
                    throw new Exception("No se puede agregar porque ya existe una ubicación en esa dependencia.");
                } else {
                    throw new Exception($mensaje);
                }
            }
        } else {
            throw new Exception("No se puede agregar la ubicación porque no se especificaron datos");
        }
        return $retorno;
    }

    /**
     * 
     * @param Ubicacion $ubicacion_
     * @return boolean
     * @throws Exception
     */
    public function modificarUbicacion(Ubicacion $ubicacion_) {
        $retorno = false;
        $codigoerror = "";
        $mensaje = "No se pudo modificar la ubicación.";
        if (!empty($ubicacion_->id) && !empty($ubicacion_->nombre)) {
            try {
                ObjetoDatos::getInstancia()->autocommit(false);
                ObjetoDatos::getInstancia()->begin_transaction();
                $retorno = ObjetoDatos::getInstancia()->ejecutarQuery(""
                        . "UPDATE " . Constantes::BD_USERS . ".ubicacion SET nombre = '{$ubicacion_->nombre}', codigo_qr= '{$ubicacion_->nombre}' "
                        . "where idubicacion={$ubicacion_->id}"
                );
                if (!$retorno) {
                    $codigoerror = ObjetoDatos::getInstancia()->sqlstate;
                    ObjetoDatos::getInstancia()->rollback();
                } else {
                    ObjetoDatos::getInstancia()->commit();
                }
                ObjetoDatos::getInstancia()->autocommit(true);
            } catch (Exception $exc) {
                $mensaje = "Ha ocurrido un error. "
                        . "Codigo de error MYSQL: " . $exc->getCode() . ". ";
                ObjetoDatos::getInstancia()->rollback();
                ObjetoDatos::getInstancia()->autocommit(true);
                $retorno = false;
            }
            if (!$retorno) {
                if ($codigoerror = "23000") {
                    throw new Exception("No se puede modificar porque ya existe una ubicación con ese nombre en esa dependencia.");
                } else {
                    throw new Exception($mensaje);
                }
            }
        } else {
            //los datos estan incompletos
            throw new Exception($mensaje);
        }
        return $retorno;
    }

    /**
     * Obtiene la estructura de ubicaciones en general.
     */
    public function obtenerArbol() {//ubicacionVistabootstrap_treeview_nodes
        $resultados = ObjetoDatos::getInstancia()->ejecutarQuery(""
                . "SELECT idubicacion as id,nombre as name,nombre as label,fk_ubicacion_idubicacion as parent_id,0 as link  FROM checkpoint.ubicacion;"
        );
        $data = array();

        while ($fila = $resultados->fetch_assoc()) {
            $tmp = array();
            $tmp['id'] = $fila['id'];
            $tmp['name'] = $fila['name'];
            $tmp['text'] = $fila['label'];
            $tmp['parent_id'] = $fila['parent_id'];
            $tmp['href'] = $fila['link'];
            array_push($data, $tmp);
        }

        $itemsByReference = array();

        // Build array of item references:
        foreach ($data as $key => &$item) {
            $itemsByReference[$item['id']] = &$item;
            // Children array:
            $itemsByReference[$item['id']]['nodes'] = array();
        }

        // Set items as children of the relevant parent item.
        foreach ($data as $key => &$item) {
            if ($item['parent_id'] && isset($itemsByReference[$item['parent_id']])) {
                $itemsByReference [$item['parent_id']]['nodes'][] = &$item;
            }
        }
        // Remove items that were added to parents elsewhere:
        foreach ($data as $key => &$item) {
            if (empty($item['nodes'])) {
                unset($item['nodes']);
            }
            if ($item['parent_id'] && isset($itemsByReference[$item['parent_id']])) {
                unset($data[$key]);
            }
        }

        // Encode:
        $clave = key($data);
        $arreglo = array("0" => $data[$clave]);
        header('Content-Type: application/json');
        echo json_encode($arreglo, JSON_FORCE_OBJECT);
    }

    /**
     * Obtiene la estructura de ubicaciones con la valoracion seleccionada en cada ubicacion
     * @param type $valoracion_actual
     */
    public function obtenerArbolCheck($valoracion_actual) {
        $id_check = ObjetoDatos::getInstancia()->ejecutarQuery(""
                . "SELECT fk_ubicacion_idubicacion as idubicacion, idubicacion_valoracion "
                . "FROM " . Constantes::BD_SCHEMA . ".ubicacion_valoracion uv "
                . "WHERE uv.fk_valoraciones_idvaloraciones={$valoracion_actual} ");
        $pila_ubicaciones = array();
        while ($value = $id_check->fetch_assoc()) {
            array_push($pila_ubicaciones, $value['idubicacion']);
        }
        //var_dump($pila_ubicaciones);

        $resultados = ObjetoDatos::getInstancia()->ejecutarQuery(""
                . "SELECT id,name,label,parent_id,link FROM `ubicacionVista` "
        );
        $data = array();

        while ($fila = $resultados->fetch_assoc()) {
            $tmp = array();
            $tmp['id'] = $fila['id'];
            $tmp['name'] = $fila['name'];
            $tmp['text'] = $fila['label'];
            $tmp['parent_id'] = $fila['parent_id'];
            $tmp['href'] = $fila['link'];
            array_push($data, $tmp);
        }

        $itemsByReference = array();

        // Build array of item references:
        foreach ($data as $key => &$item) {
            $itemsByReference[$item['id']] = &$item;
            // Children array:
            $itemsByReference[$item['id']]['nodes'] = array();
        }

        $seleccionados = array();
        $contador = 0;
        // Set items as children of the relevant parent item.
        foreach ($data as $key => &$item) {
            if ($item['parent_id'] && isset($itemsByReference[$item['parent_id']])) {

                $itemsByReference [$item['parent_id']]['nodes'][] = &$item;
                $contador++;
                echo "itemid:$contador -" . $item['id'] . "<br>";
                if (in_array($item['id'], $pila_ubicaciones)) {
                    array_push($seleccionados, $contador);
                }
            }
        }

        // Remove items that were added to parents elsewhere:
        foreach ($data as $key => &$item) {
            if (empty($item['nodes'])) {
                unset($item['nodes']);
            }
            if ($item['parent_id'] && isset($itemsByReference[$item['parent_id']])) {
                unset($data[$key]);
            }
        }

        $clave = key($data);
        $arreglo = array("0" => $data[$clave]);
        echo json_encode($seleccionados, JSON_FORCE_OBJECT);
    }

    /**
     * elimina una ubicacion que no tenga dependencias
     * @param type $idUbicacion
     * @return boolean
     * @throws Exception
     */
    public function eliminarUbicacion($idUbicacion) {
        $retorno = FALSE;
        $codigorespuesta = 0;
        $mensaje = "";
        if (!empty($idUbicacion)) {
            try {
                ObjetoDatos::getInstancia()->autocommit(false);
                ObjetoDatos::getInstancia()->begin_transaction();
                $consultaarmada = ""
                        . "DELETE FROM " . Constantes::BD_USERS
                        . ".ubicacion WHERE idubicacion='{$idUbicacion}'";
                $retorno = ObjetoDatos::getInstancia()->ejecutarQuery($consultaarmada);
                if (!$retorno) {
                    $mensaje = ObjetoDatos::getInstancia()->error;
                    $codigorespuesta = ObjetoDatos::getInstancia()->sqlstate;
                    ObjetoDatos::getInstancia()->rollback();
                } else {
                    ObjetoDatos::getInstancia()->commit();
                }
                ObjetoDatos::getInstancia()->autocommit(true);
            } catch (Exception $exc) {
                $mensaje = "Ha ocurrido un error. "
                        . "Codigo de error MYSQL: " . $exc->getCode() . ". ";
                ObjetoDatos::getInstancia()->rollback();
                ObjetoDatos::getInstancia()->autocommit(true);
                $retorno = FALSE;
            }
            if (!$retorno) {
                if ($codigorespuesta = "23000") {
                    throw new Exception("No se puede eliminar porque hay valoraciones que hacen referencia a esta Ubicación.");
                } else {
                    throw new Exception($mensaje);
                }
            }
        } else {
            throw new Exception("No se especificó una Ubicación para eliminar.");
        }
        return $retorno;
    }

    /**
     * Determina si una ubicacion tiene otras ubicaciones que dependen de ésta.
     * @param type $idUbicacion
     * @return boolean
     */
    public function tieneDependencia($idUbicacion) {
        $retorno = FALSE;
        if (!empty($idUbicacion)) {
            try {
                ObjetoDatos::getInstancia()->autocommit(false);
                ObjetoDatos::getInstancia()->begin_transaction();
                $consultaarmada = "SELECT COUNT(*) as cantidad FROM " . Constantes::BD_USERS
                        . ".ubicacion WHERE fk_ubicacion_idubicacion='{$idUbicacion}'";
                $resultados = ObjetoDatos::getInstancia()->ejecutarQuery($consultaarmada);

                if ($fila = $resultados->fetch_assoc()) {
                    if ($fila['cantidad'] > 0) {
                        $retorno = TRUE;
                    }
                }

                ObjetoDatos::getInstancia()->commit();
                ObjetoDatos::getInstancia()->autocommit(true);
                //echo $idubicacion;
            } catch (Exception $exc) {
                $mensaje = "Ha ocurrido un error. "
                        . "Codigo de error MYSQL: " . $exc->getCode() . ". ";
                ObjetoDatos::getInstancia()->rollback();
                ObjetoDatos::getInstancia()->autocommit(true);
                $retorno = FALSE;
            }
        }
        return $retorno;
    }
    
    public function esRaiz($idUbicacion) {
        $retorno = FALSE;
        if (!empty($idUbicacion)) {
            try {
                $consultaarmada = "SELECT IFNULL(fk_ubicacion_idubicacion,'raiz') as resultado FROM ". Constantes::BD_USERS
                        . ".ubicacion WHERE idubicacion = '{$idUbicacion}'";
                $resultados = ObjetoDatos::getInstancia()->ejecutarQuery($consultaarmada);

                if ($fila = $resultados->fetch_assoc()) {
                    if ($fila['resultado'] == 'raiz') {
                        $retorno = TRUE;
                    }
                }
            } catch (Exception $exc) {
                $mensaje = "Ha ocurrido un error. "
                        . "Codigo de error MYSQL: " . $exc->getCode() . ". ";
                $retorno = FALSE;
            }
        }
        return $retorno;
    }

}

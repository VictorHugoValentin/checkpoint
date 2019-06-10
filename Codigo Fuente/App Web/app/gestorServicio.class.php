<?php

require_once '../lib/ObjetoDatos.class.php';
require_once '../lib/Constantes.class.php';

class Servicio {

    public $id;
    public $nombre;
    public $descripcion;
    public $email;
    public $encargado;
    public $habilitado;
    public $icono;

    public function setId($id) {
        $this->id = $id;
    }

    public function setNombre($nombre) {
        $this->nombre = $nombre;
    }

    public function setDescripcion($descripcion) {
        $this->descripcion = $descripcion;
    }

    public function setEmail($email) {
        $this->email = $email;
    }

    public function setEncargado($encargado) {
        $this->encargado = $encargado;
    }

    public function setHabilitado($habilitado) {
        $this->habilitado = $habilitado;
    }

    public function setIcono($icono) {
        $this->icono = $icono;
    }

}

class gestorServicio {

    public function __construct() {
        ;
    }

    /**
     * Obtiene un objeto Servicio a partir de su id
     * @param type $idservicio_
     * @return \Servicio
     */
    public function obtenerServicio($idservicio_) {
        $resultados = ObjetoDatos::getInstancia()->ejecutarQuery(""
                . "SELECT idservicios,nombre,descripcion,email_valoraciones,habilitado,usuario_idusuario,icono FROM `servicios` where idservicios ={$idservicio_} "
        );
        $servicio = null;

        if ($fila = $resultados->fetch_assoc()) {
            $servicio = new Servicio();
            $servicio->setId($idservicio_);
            $servicio->setNombre($fila['nombre']);
            $servicio->setDescripcion($fila['descripcion']);
            $servicio->setEmail($fila['email_valoraciones']);
            $servicio->setHabilitado($fila['habilitado']);
            $servicio->setEncargado($fila['usuario_idusuario']);
            $servicio->setIcono($fila['icono']);
        }
        return $servicio;
    }

    /**
     * Obtiene todos los servicios asociado a un usuario
     * @param type $idusuario_
     */
    public function obtenerServicios() {
        $todos = array();
        $resultados = false;
        try {
            $resultados = ObjetoDatos::getInstancia()->ejecutarQuery(""
                    . "SELECT idservicios, nombre, email_valoraciones, habilitado, usuario_idusuario, icono, descripcion  "
                    . "FROM " . Constantes::BD_SCHEMA . ".servicios "
                    . " ORDER BY nombre ASC ");
            if (!$resultados) {
                $error = ObjetoDatos::getInstancia()->error;
                $errorestado = ObjetoDatos::getInstancia()->sqlstate;
            } else {
                $servicio = null;
                while ($fila = $resultados->fetch_assoc()) {
                    $servicio = new Servicio();
                    $servicio->setId($fila['idservicios']);
                    $servicio->setNombre($fila['nombre']);
                    $servicio->setDescripcion($fila['descripcion']);
                    $servicio->setEmail($fila['email_valoraciones']);
                    $servicio->setHabilitado($fila['habilitado']);
                    $servicio->setEncargado($fila['usuario_idusuario']);
                    $servicio->setIcono($fila['icono']);
                    $todos[] = $servicio;
                }
            }
        } catch (Exception $e) {
            $error = $e->getMessage();
            //var_dump($e);
        }
        if (!$resultados) {
            throw new Exception($error);
        }
        return $todos;
    }

    /**
     * Obtiene todos los servicios asociado a un usuario
     * @param type $idusuario_
     */
    public function obtenerServicioPorUsuario($idusuario_) {
        $todos = array();
        $resultados = false;
        try {
            $resultados = ObjetoDatos::getInstancia()->ejecutarQuery(""
                    . "SELECT idservicios, nombre, email_valoraciones, habilitado, usuario_idusuario, icono, descripcion  "
                    . "FROM " . Constantes::BD_SCHEMA . ".servicios "
                    . "WHERE usuario_idusuario = " . $idusuario_
                    . " ORDER BY nombre ASC ");
            if (!$resultados) {
                $error = ObjetoDatos::getInstancia()->error;
                $errorestado = ObjetoDatos::getInstancia()->sqlstate;
            } else {

                $servicio = null;
                while ($fila = $resultados->fetch_assoc()) {
                    $servicio = new Servicio();
                    $servicio->setId($fila['idservicios']);
                    $servicio->setNombre($fila['nombre']);
                    $servicio->setDescripcion($fila['descripcion']);
                    $servicio->setEmail($fila['email_valoraciones']);
                    $servicio->setHabilitado($fila['habilitado']);
                    $servicio->setEncargado($fila['usuario_idusuario']);
                    $servicio->setIcono($fila['icono']);
                    $todos[] = $servicio;
                }
            }
        } catch (Exception $e) {
            $error = $e->getMessage();
            //var_dump($e);
        }
        if (!$resultados) {
            throw new Exception($error);
        }
        return $todos;
    }

    /**
     * Agrega un nuevo servicio
     * @param Servicio $servicio_
     * @return int
     */
    public function agregarServicio(Servicio $servicio_) {
        $retorno = 0;
        $codigoerror = "";
        $mensaje = "No se pudo agregar el servicio.";
        /*
         * controlar esta parte de la carga con el gestor
         */
        if (!empty($servicio_->nombre) && !empty($servicio_->descripcion) && !empty($servicio_->encargado)) {
            try {
                $cons2 = ".servicios (idservicios, nombre, descripcion, email_valoraciones, habilitado, usuario_idusuario, icono) ";
                ObjetoDatos::getInstancia()->autocommit(false);
                ObjetoDatos::getInstancia()->begin_transaction();
                $respuesta = ObjetoDatos::getInstancia()->ejecutarQuery(""
                        . "INSERT INTO " . Constantes::BD_USERS . $cons2
                        . "VALUES (NULL, '{$servicio_->nombre}', '{$servicio_->descripcion}', '{$servicio_->email}', '{$servicio_->habilitado}','{$servicio_->encargado}','{$servicio_->icono}')");

                if (!$respuesta) {
                    $codigoerror = ObjetoDatos::getInstancia()->sqlstate;
                    $mensajeerror = ObjetoDatos::getInstancia()->error;
                    ObjetoDatos::getInstancia()->rollback();
                } else {
                    $retorno = ObjetoDatos::getInstancia()->insert_id;
                    ObjetoDatos::getInstancia()->commit();
                }
            } catch (Exception $exc) {
                $mensaje = "Ha ocurrido un error. "
                        . "Codigo de error MYSQL: " . $exc->getCode() . ". ";
                ObjetoDatos::getInstancia()->rollback();
                ObjetoDatos::getInstancia()->autocommit(true);
                $retorno = 0;
            }
            if (!$respuesta) {
                if ($codigoerror = "23000") {
                    throw new Exception("No se puede agregar porque ya existe un Servicio con ese nombre.");
                } else {
                    throw new Exception($mensaje);
                }
            }
        } else {
            throw new Exception("No se puede agregar porque los datos son insuficientes.");
        }
        return $retorno;
    }

    /**
     * Modifica todos los atributos de un servicio. Se envía un objeto Servicio
     * @param Servicio $servicio_
     * @return boolean
     */
    public function modificarServicio(Servicio $servicio_) {
        $retorno = false;
        $codigoerror = "";
        $mensaje = "No se pudo modificar el Servicio.";

        if (!empty($servicio_->nombre) && !empty($servicio_->descripcion) && !empty($servicio_->encargado)) {
            try {
                ObjetoDatos::getInstancia()->autocommit(false);
                ObjetoDatos::getInstancia()->begin_transaction();
                $consulta = "UPDATE " . Constantes::BD_USERS . ".servicios SET nombre = '{$servicio_->nombre}', descripcion= '{$servicio_->descripcion}', email_valoraciones= '{$servicio_->email}',usuario_idusuario= '{$servicio_->encargado}', habilitado= '{$servicio_->habilitado}', icono= '{$servicio_->icono}' "
                        . "where idservicios={$servicio_->id}";
                $retorno = ObjetoDatos::getInstancia()->ejecutarQuery($consulta);
                if (!$retorno) {
                    $codigoerror = ObjetoDatos::getInstancia()->sqlstate;
                    $mensajeerror = ObjetoDatos::getInstancia()->error;
                    ObjetoDatos::getInstancia()->rollback();
                } else {
                    ObjetoDatos::getInstancia()->commit();
                }
                ObjetoDatos::getInstancia()->autocommit(true);
            } catch (Exception $exc) {
                $mensaje = "Ha ocurrido un error. "
                        . "Codigo de error MYSQL: " . $exc->getCode() . ". ";
                ObjetoDatos::getInstancia()->rollback();
                $retorno = false;
            }
            if (!$retorno) {
                if ($codigoerror = "23000") {
                    throw new Exception("No se puede modificar porque ya existe un Servicio con ese nombre.");
                } else {
                    throw new Exception($mensaje);
                }
            }
        } else {
            throw new Exception("No se puede modificar el Servicio porque no se especificaron datos");
        }
        return $retorno;
    }

    /**
     * 
     * @param type $idservicio_
     * @param boolean $habilitar
     * @return boolean
     */
    private function habilitacionServicio($idservicio_, $habilitar) {

        /* ----------------- HACER LA VALIDACION PARA CUANDO NO CORRESPONDA HABILITAR ----------------- */
        $retorno = false;
        $codigoerror = "";
        if (!empty($idservicio_) && isset($habilitar)) {
            try {
                ObjetoDatos::getInstancia()->autocommit(false);
                ObjetoDatos::getInstancia()->begin_transaction();
                $consulta = "UPDATE " . Constantes::BD_USERS . ".servicios SET habilitado= '{$habilitar}' "
                        . "where idservicios={$idservicio_}";
                $retorno = ObjetoDatos::getInstancia()->ejecutarQuery($consulta);

                if ($retorno) {
                    ObjetoDatos::getInstancia()->commit();
                } else {
                    $codigoerror = ObjetoDatos::getInstancia()->sqlstate;
                    $mensaje = ObjetoDatos::getInstancia()->error;
                    ObjetoDatos::getInstancia()->rollback();
                }
                ObjetoDatos::getInstancia()->autocommit(true);
            } catch (Exception $exc) {
                $mensaje = "Ha ocurrido un error. "
                        . "Codigo de error MYSQL: " . $exc->getCode() . ". ";
                ObjetoDatos::getInstancia()->rollback();
                $retorno = false;
            }
            if (!$retorno) {
                throw new Exception($mensaje);
            }
        } else {
            throw new Exception("No se especificaron datos para habilitar");
        }
        return $retorno;
    }

    public function habilitarServicio($idservicio_) {
        return $this->habilitacionServicio($idservicio_, 1);
    }

    public function deshabilitarServicio($idservicio_) {
        return $this->habilitacionServicio($idservicio_, 0);
    }

    /**
     * elimina una ubicacion que no tenga dependencias
     * @param type $idServicio_
     * @return type boolean
     */
    public function eliminarServicio($idServicio_) {
        $retorno = FALSE;
        if (!empty($idServicio_)) {
            try {
                ObjetoDatos::getInstancia()->autocommit(false);
                ObjetoDatos::getInstancia()->begin_transaction();
                $consultaarmada = ""
                        . "DELETE FROM " . Constantes::BD_USERS
                        . ".servicios WHERE idservicios='{$idServicio_}'";
                $retorno = ObjetoDatos::getInstancia()->ejecutarQuery($consultaarmada);

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

    public function cantidadValoracionesExistentes($idServicio_) {
        $retorno = FALSE;
        if (!empty($idServicio_)) {
            try {
                ObjetoDatos::getInstancia()->autocommit(false);
                ObjetoDatos::getInstancia()->begin_transaction();
                $consultaarmada = "SELECT COUNT(*) as cantidad FROM " . Constantes::BD_USERS . ".servicios s "
                        . "JOIN " . Constantes::BD_USERS . ".valoraciones v on v.fk_servicios_idservicios = s.idservicios "
                        . "WHERE s.idservicios ='{$idServicio_}'";
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

    public function cantidadValoracionesHabilitadas($idServicio_) {
        $retorno = FALSE;
        if (!empty($idServicio_)) {
            try {
                ObjetoDatos::getInstancia()->autocommit(false);
                ObjetoDatos::getInstancia()->begin_transaction();
                $consultaarmada = "SELECT COUNT(*) as cantidad FROM " . Constantes::BD_USERS . ".servicios s "
                        . "JOIN " . Constantes::BD_USERS . ".valoraciones v on v.fk_servicios_idservicios = s.idservicios "
                        . "JOIN " . Constantes::BD_USERS . ".ubicacion_valoracion uv on uv.fk_valoraciones_idvaloraciones=v.idvaloraciones "
                        . "WHERE s.idservicios ={$idServicio_} and v.habilitado=1";

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

    public function cantidadValoracionesHechas($idServicio_) {
        $retorno = FALSE;
        if (!empty($idServicio_)) {
            try {
                ObjetoDatos::getInstancia()->autocommit(false);
                ObjetoDatos::getInstancia()->begin_transaction();
                $consultaarmada = "SELECT COUNT(*) as cantidad FROM " . Constantes::BD_USERS
                        . ".ubicacion WHERE fk_ubicacion_idubicacion='{$idUbicacion}'";

                /* ------------- TERMINAR DE ARMAR LA CONSULTA -------------- */
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

}

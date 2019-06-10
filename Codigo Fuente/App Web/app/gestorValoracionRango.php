<?php

require_once '../lib/ObjetoDatos.class.php';
require_once '../lib/Constantes.class.php';
require_once './valoracion.class.php';

class gestorValoracionRango {

    public function __construct() {
        /* cambiar el conjunto de caracteres a utf8 */
        ObjetoDatos::getInstancia()->set_charset("utf8");
    }

    /**
     * 
     * @param type $idvaloracion_
     * @return \ValoracionRango
     * @throws Exception
     */
    public function obtenerValoracion($idvaloracion_) {
        $valoracionRango = null;
        try {
            $resultados = ObjetoDatos::getInstancia()->ejecutarQuery(""
                    . "SELECT v.idvaloraciones,v.nombre,v.tipo,v.recibir_notificacion_email,v.permite_descripcion,v.habilitado,v.fk_servicios_idservicios,v.descripcion,vr.tipo_valores 
FROM checkpoint.valoracion_rango vr join valoraciones v on vr.valoraciones_idvaloraciones=v.idvaloraciones
where v.idvaloraciones={$idvaloracion_} ");
            if ($fila = $resultados->fetch_assoc()) {
                $valoracionRango = new ValoracionRango();
                $valoracionRango->setIdValoracion($idvaloracion_);
                $valoracionRango->setNombre($fila['nombre']);
                $valoracionRango->setTipo($fila['tipo']);
                $valoracionRango->setRecibirNotificacionEmail($fila['recibir_notificacion_email']);
                $valoracionRango->setPermiteDescripcion($fila['permite_descripcion']);
                $valoracionRango->setHabilitado($fila['habilitado']);
                $valoracionRango->setDescripcion($fila['descripcion']);
                $valoracionRango->setFkIdservicio($fila['fk_servicios_idservicios']);
                $valoracionRango->setTipoValor($fila['tipo_valores']);
            }
        } catch (Exception $e) {
            throw new Exception("error");
        }
        return $valoracionRango;
    }

    /**
     * Agrega una nueva valoracion de reclamo
     * @param ValoracionRango $vRango_
     * @return int
     */
    public function agregarValoracion(ValoracionRango $vRango_) {
        $retorno = 0;
        $mensaje = "";
        if ($this->validarNuevo($vRango_)) {
            try {
                if ($this->validarDuplicado($vRango_)) {
                    /* cambiar el conjunto de caracteres a utf8 */
                    ObjetoDatos::getInstancia()->set_charset("utf8");
                    
                    $cons2 = ".valoraciones (`idvaloraciones`, `nombre`, `tipo`, `recibir_notificacion_email`, `permite_descripcion`, `habilitado`, `fk_servicios_idservicios`, `descripcion`) ";
                    ObjetoDatos::getInstancia()->autocommit(false);
                    ObjetoDatos::getInstancia()->begin_transaction();
                    ObjetoDatos::getInstancia()->ejecutarQuery(""
                            . "INSERT INTO " . Constantes::BD_USERS . $cons2
                            . "VALUES (NULL, '{$vRango_->nombre}', '{$vRango_->tipo}', '{$vRango_->recibir_notificacion_email}', '{$vRango_->permite_descripcion}', '{$vRango_->habilitado}', '{$vRango_->fk_idservicio}', '{$vRango_->descripcion}')");
                    $idretorno = ObjetoDatos::getInstancia()->insert_id;

                    //con el mismo id inserto la tabla asociada
                    "INSERT INTO `valoracion_rango` (`tipo_valores`, `valoraciones_idvaloraciones`) VALUES ('numerico', '4');";
                    $consulta = "INSERT INTO " . Constantes::BD_USERS . ".valoracion_rango "
                            . "(`tipo_valores`, `valoraciones_idvaloraciones`) "
                            . "VALUES ('{$vRango_->tipo_valor}', '{$idretorno}');";
                    $retorno = ObjetoDatos::getInstancia()->ejecutarQuery($consulta);
                    ObjetoDatos::getInstancia()->commit();
                } else {
                    //ya existe, dar aviso
                    $retorno = 0;
                    $mensaje = "Ya existe una valoración con ese nombre.";
                }
            } catch (Exception $exc) {
                $mensaje = "Ha ocurrido un error. "
                        . "Codigo de error MYSQL: " . $exc->getCode() . ". ";
                ObjetoDatos::getInstancia()->rollback();
                $retorno = 0;
            }
        } else {
            //datos incompletos
            $mensaje = "Faltan datos esenciales para la creación de una nueva valoración.";
        }
        if ($retorno == 0) {
            throw new Exception($mensaje);
        } else {
            return $retorno;
        }
    }

    /**
     * Realiza la validacion de los datos de la nueva valoracion de reclamo 
     */
    public function validarNuevo(ValoracionRango $valoracionRango_) {
        return (!empty($valoracionRango_->nombre) && !empty($valoracionRango_->descripcion) && !empty($valoracionRango_->tipo)
                );
    }

    /**
     * Realiza la validacion de que no se duplique el nombre de la nueva valoracion
     */
    public function validarDuplicado(ValoracionRango $valoracionRango_) {
        $query = "select count(*) as cantidad from valoraciones where nombre='" . $valoracionRango_->nombre . "' and fk_servicios_idservicios=" . $valoracionRango_->fk_idservicio;
        $retorno2 = ObjetoDatos::getInstancia()->ejecutarQuery($query);
        if ($retorno2) {
            $resultset = $retorno2->fetch_assoc();
            $valido = (($resultset['cantidad']) == 0);
        } else {
            throw new Exception("No se puede determinar si ya existe.");
        }
        return $valido;
    }
    
    /**
     * Realiza la validacion de que no se duplique el nombre con otra valoracion
     */
    public function validarDuplicadoEditar(ValoracionRango $valoracionRango_) {
        $query = "select count(*) as cantidad from valoraciones where nombre='" . $valoracionRango_->nombre . "' and idvaloraciones != {$valoracionRango_->idvaloracion} and fk_servicios_idservicios=" . $valoracionRango_->fk_idservicio;
        $retorno2 = ObjetoDatos::getInstancia()->ejecutarQuery($query);
        if ($retorno2) {
            $resultset = $retorno2->fetch_assoc();
            $valido = (($resultset['cantidad']) == 0);
        } else {
            throw new Exception("No se puede determinar si ya existe.");
        }
        return $valido;
    }

    public function editarValoracion(ValoracionRango $vRango_) {
        $retorno = 0;
        if ($this->validarNuevo($vRango_)) {
            try {
                if ($this->validarDuplicadoEditar($vRango_)) {
                    $cons2 = ".valoraciones (`idvaloraciones`, `nombre`, `tipo`, `recibir_notificacion_email`, `permite_descripcion`, `habilitado`, `fk_servicios_idservicios`, `descripcion`) ";
                    ObjetoDatos::getInstancia()->autocommit(false);
                    ObjetoDatos::getInstancia()->begin_transaction();
                    $resultado = ObjetoDatos::getInstancia()->ejecutarQuery(""
                            . "UPDATE " . Constantes::BD_USERS . ".valoraciones "
                            . "SET nombre= '{$vRango_->nombre}', recibir_notificacion_email ='{$vRango_->recibir_notificacion_email}', permite_descripcion= '{$vRango_->permite_descripcion}', habilitado= '{$vRango_->habilitado}',descripcion= '{$vRango_->descripcion}'"
                            . "WHERE idvaloraciones='{$vRango_->idvaloracion}'");
                    if ($resultado == true) {
                        $consulta = "UPDATE " . Constantes::BD_USERS . ".valoracion_rango "
                                . "SET tipo_valores='{$vRango_->tipo_valor}'"
                                . "WHERE valoraciones_idvaloraciones='{$vRango_->idvaloracion}'";
                        $retorno = ObjetoDatos::getInstancia()->ejecutarQuery($consulta);
                        if ($retorno == true) {
                            $retorno = ObjetoDatos::getInstancia()->commit();
                        } else {
                            ObjetoDatos::getInstancia()->rollback();
                        }
                    } else {
                        ObjetoDatos::getInstancia()->rollback();
                    }
                } else {
                    //ya existe, dar aviso
                    $retorno = 0;
                    $mensaje = "Ya existe otra valoración con ese nombre.";
                }
            } catch (Exception $exc) {
                $mensaje = "Ha ocurrido un error. "
                        . "Codigo de error MYSQL: " . $exc->getCode() . ". ";
                ObjetoDatos::getInstancia()->rollback();
                $retorno = 0;
            }
        } else {
            //datos incompletos
            $mensaje = "Faltan datos esenciales para modificar la valoración.";
        }
        if ($retorno == 0) {
            throw new Exception($mensaje);
        } else {
            return $retorno;
        }
    }

    /**
     * 
     * @param type $idValoracion_
     * @param type $habilitar
     * @return boolean
     */
    private function habilitacionRango($idValoracion_, $habilitar) {
        /* ----------------- HACER LA VALIDACION PARA CUANDO NO CORRESPONDA HABILITAR ----------------- */
        $retorno = false;
        $lanzarexcepcion = false;
        $codigo = 0;
        if (!empty($idValoracion_) && isset($habilitar)) {
            try {
                ObjetoDatos::getInstancia()->autocommit(false);
                ObjetoDatos::getInstancia()->begin_transaction();
                $consulta = "UPDATE " . Constantes::BD_USERS . ".valoraciones SET habilitado= '{$habilitar}' "
                        . "where idvaloraciones={$idValoracion_}";
                $retorno = ObjetoDatos::getInstancia()->ejecutarQuery($consulta);
                if ($retorno) {
                    if ($habilitar == 0) {
                        $consulta2 = "select fk_servicios_idservicios as idservicio from valoraciones where idvaloraciones={$idValoracion_}";
                        $retorno2 = ObjetoDatos::getInstancia()->ejecutarQuery($consulta2);
                        if ($retorno2) {
                            $resultset = $retorno2->fetch_assoc();
                            $idservicio = $resultset['idservicio'];
                            $consulta3 = "select count(*) as cantidadhabilitados from valoraciones where fk_servicios_idservicios={$idservicio} and habilitado=1";
                            $retorno3 = ObjetoDatos::getInstancia()->ejecutarQuery($consulta3);
                            if ($retorno3) {
                                $resultset3 = $retorno3->fetch_assoc();
                                $totalhabilitados = $resultset3['cantidadhabilitados'];
                                if ($totalhabilitados == 0) {
                                    $lanzarexcepcion = true;
                                    $mensjexcepcion = "El Servicio ya no tiene valoraciones disponibles.";
                                    $codigo = 1;
                                }
                                $retorno = ObjetoDatos::getInstancia()->commit();
                            } else {
                                //camino de error obteniendo la cantidad de valoraciones habilitadas
                                ObjetoDatos::getInstancia()->rollback();
                                $lanzarexcepcion = true;
                                $mensjexcepcion = "No se pudo completar la operación de deshabilitación.";
                            }
                        } else {
                            //camino de error obteniendo el idservicio a partir del idvaloracion
                            ObjetoDatos::getInstancia()->rollback();
                            $lanzarexcepcion = true;
                            $mensjexcepcion = "No se pudo completar la operación de deshabilitación.";
                        }
                    } else {
                        //exito, caso de una habilitacion
                        $retorno = ObjetoDatos::getInstancia()->commit();
                    }
                } else {
                    //no se pudo hacer la actualizacion  del estado
                    ObjetoDatos::getInstancia()->rollback();
                    $lanzarexcepcion = true;
                    $mensjexcepcion = "No se pudo completar la actualización del estado.";
                }
                ObjetoDatos::getInstancia()->autocommit(true);
            } catch (Exception $exc) {
                $mensjexcepcion = "Ha ocurrido un error. "
                        . "Codigo de error MYSQL: " . $exc->getCode() . ". ";
                ObjetoDatos::getInstancia()->rollback();
                $lanzarexcepcion = true;
                $retorno = false;
            }
        }
        if ($lanzarexcepcion) {
            throw new Exception($mensjexcepcion, $codigo);
        } else {
            return $retorno;
        }
    }

    public function habilitarRango($idservicio_) {
        return $this->habilitacionRango($idservicio_, 1);
    }

    public function deshabilitarRango($idservicio_) {
        return $this->habilitacionRango($idservicio_, 0);
    }

    public function cantidadValoracionesExistentes($idServicio_) {
        $retorno = FALSE;
        if (!empty($idServicio_)) {
            try {
                ObjetoDatos::getInstancia()->autocommit(false);
                ObjetoDatos::getInstancia()->begin_transaction();
                $consultaarmada = "SELECT COUNT(*) as cantidad FROM " . Constantes::BD_USERS . ".valoraciones v "
                        . "WHERE v.fk_servicios_idservicios ='{$idServicio_}'";
                $resultados = ObjetoDatos::getInstancia()->ejecutarQuery($consultaarmada);

                if ($fila = $resultados->fetch_assoc()) {
                    if ($fila['cantidad'] > 0) {
                        $retorno = TRUE;
                    }
                }
                ObjetoDatos::getInstancia()->commit();
                ObjetoDatos::getInstancia()->autocommit(true);
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
                $consultaarmada = ""; //terminar de armar la consulta

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

    public function cantidadValoracionesHechas($idValoracion_) {
        $retorno = FALSE;
        if (!empty($idValoracion_)) {
            try {
                ObjetoDatos::getInstancia()->autocommit(false);
                ObjetoDatos::getInstancia()->begin_transaction();
                $consultaarmada = "SELECT COUNT(*) as cantidad FROM " . Constantes::BD_USERS
                        . ".valoracion_hecha where idvaloracion_hecha='{$idValoracion_}'";

                $resultados = ObjetoDatos::getInstancia()->ejecutarQuery($consultaarmada);

                if ($fila = $resultados->fetch_assoc()) {
                    if ($fila['cantidad'] > 0) {
                        $retorno = TRUE;
                    }
                }
                ObjetoDatos::getInstancia()->commit();
                ObjetoDatos::getInstancia()->autocommit(true);
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

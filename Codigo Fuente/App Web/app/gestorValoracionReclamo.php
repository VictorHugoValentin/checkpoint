<?php

require_once '../lib/ObjetoDatos.class.php';
require_once '../lib/Constantes.class.php';
require_once './valoracion.class.php';

class gestorValoracionReclamo {

    public function __construct() {
        ObjetoDatos::getInstancia()->set_charset("utf8");
    }

    /**
     * 
     * @param type $idvaloracion_
     * @return \ValoracionReclamo
     * @throws Exception
     */
    public function obtenerValoracion($idvaloracion_) {
        $valoracionReclamo = null;
        try {
            ObjetoDatos::getInstancia()->set_charset("utf8");
            $resultados = ObjetoDatos::getInstancia()->ejecutarQuery(""
                    . "SELECT v.idvaloraciones,v.nombre,v.tipo,v.recibir_notificacion_email,v.permite_descripcion,v.habilitado,v.fk_servicios_idservicios,v.descripcion,vr.permite_email,vr.permite_foto,vr.vencimiento
FROM checkpoint.valoracion_reclamo vr join valoraciones v on vr.valoraciones_idvaloraciones=v.idvaloraciones
where v.idvaloraciones={$idvaloracion_} "
            );

            if ($fila = $resultados->fetch_assoc()) {
                $valoracionReclamo = new ValoracionReclamo();
                $valoracionReclamo->setIdValoracion($idvaloracion_);
                $valoracionReclamo->setNombre($fila['nombre']);
                $valoracionReclamo->setTipo($fila['tipo']);
                $valoracionReclamo->setRecibirNotificacionEmail($fila['recibir_notificacion_email']);
                $valoracionReclamo->setPermiteDescripcion($fila['permite_descripcion']);
                $valoracionReclamo->setHabilitado($fila['habilitado']);
                $valoracionReclamo->setDescripcion($fila['descripcion']);
                $valoracionReclamo->setPermiteFoto($fila['permite_foto']);
                $valoracionReclamo->setPermiteEmail($fila['permite_email']);
                $valoracionReclamo->setVencimiento($fila['vencimiento']);
                $valoracionReclamo->setFkIdservicio($fila['fk_servicios_idservicios']);
            }
        } catch (Exception $e) {
            throw new Exception("error");
        }
        return $valoracionReclamo;
    }

    /**
     * Agrega una nueva valoracion de reclamo
     * @param ValoracionReclamo $vReclamo_
     * @return int
     */
    public function agregarValoracion(ValoracionReclamo $vReclamo_) {
        $retorno = 0;
        $mensaje = "";
        if ($this->validarNuevo($vReclamo_)) {
            try {
                if ($this->validarDuplicado($vReclamo_)) {
                    $cons2 = ".valoraciones (`idvaloraciones`, `nombre`, `tipo`, `recibir_notificacion_email`, `permite_descripcion`, `habilitado`, `fk_servicios_idservicios`, `descripcion`) ";
                    ObjetoDatos::getInstancia()->autocommit(false);
                    ObjetoDatos::getInstancia()->begin_transaction();
                    ObjetoDatos::getInstancia()->ejecutarQuery(""
                            . "INSERT INTO " . Constantes::BD_USERS . $cons2
                            . "VALUES (NULL, '{$vReclamo_->nombre}', '{$vReclamo_->tipo}', '{$vReclamo_->recibir_notificacion_email}', '{$vReclamo_->permite_descripcion}', '{$vReclamo_->habilitado}', '{$vReclamo_->fk_idservicio}', '{$vReclamo_->descripcion}')");
                    $idretorno = ObjetoDatos::getInstancia()->insert_id;

                    //con el mismo id inserto la tabla asociada
                    $consulta = "INSERT INTO " . Constantes::BD_USERS . ".valoracion_reclamo "
                            . "(`permite_foto`, `permite_email`, `vencimiento`, `valoraciones_idvaloraciones`) "
                            . "VALUES (b'{$vReclamo_->permite_foto}', b'{$vReclamo_->permite_email}', '{$vReclamo_->vencimiento}', '$idretorno');";
                    $retorno = ObjetoDatos::getInstancia()->ejecutarQuery($consulta);
                    ObjetoDatos::getInstancia()->commit();
                } else {
                    //ya existe, dar aviso
                    $retorno = 0;
                    $mensaje = "Ya existe una valoración con ese nombre.";
                }
                //echo $idubicacion;
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
    public function validarNuevo(ValoracionReclamo $valoracionReclamo_) {
        return (!empty($valoracionReclamo_->nombre) && !empty($valoracionReclamo_->descripcion) && !empty($valoracionReclamo_->tipo) && !empty($valoracionReclamo_->vencimiento)
                );
    }

    /**
     * Realiza la validacion de que no se repita el nombre de la nueva valoracion de reclamo 
     */
    public function validarDuplicado(ValoracionReclamo $valoracionReclamo_) {
        $query = "select count(*) as cantidad from valoraciones where nombre='" . $valoracionReclamo_->nombre . "' and fk_servicios_idservicios=" . $valoracionReclamo_->fk_idservicio;
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
     * Realiza la validacion de que no se repita el nombre de la nueva valoracion de reclamo 
     */
    public function validarDuplicadoEditar(ValoracionReclamo $valoracionReclamo_) {
        $query = "select count(*) as cantidad from valoraciones where nombre='" . $valoracionReclamo_->nombre . "' and idvaloraciones != {$valoracionReclamo_->idvaloracion}  and fk_servicios_idservicios=" . $valoracionReclamo_->fk_idservicio;
        $retorno2 = ObjetoDatos::getInstancia()->ejecutarQuery($query);
        if ($retorno2) {
            $resultset = $retorno2->fetch_assoc();
            $valido = (($resultset['cantidad']) == 0);
        } else {
            throw new Exception("No se puede determinar si ya existe.");
        }
        return $valido;
    }

    public function editarValoracion(ValoracionReclamo $vReclamo_) {
        $retorno = 0;
        if ($this->validarNuevo($vReclamo_)) {
            try {
                if ($this->validarDuplicadoEditar($vReclamo_)) {
                    $cons2 = ".valoraciones (`idvaloraciones`, `nombre`, `tipo`, `recibir_notificacion_email`, `permite_descripcion`, `habilitado`, `fk_servicios_idservicios`, `descripcion`) ";
                    ObjetoDatos::getInstancia()->autocommit(false);
                    ObjetoDatos::getInstancia()->begin_transaction();
                    $resultado = ObjetoDatos::getInstancia()->ejecutarQuery(""
                            . "UPDATE " . Constantes::BD_USERS . ".valoraciones "
                            . "SET nombre= '{$vReclamo_->nombre}', recibir_notificacion_email ='{$vReclamo_->recibir_notificacion_email}', permite_descripcion= '{$vReclamo_->permite_descripcion}', habilitado= '{$vReclamo_->habilitado}',descripcion= '{$vReclamo_->descripcion}'"
                            . "WHERE idvaloraciones='{$vReclamo_->idvaloracion}'");
                    if ($resultado == true) {
                        $consulta = "UPDATE " . Constantes::BD_USERS . ".valoracion_reclamo "
                                . "SET permite_foto= b'{$vReclamo_->permite_foto}', permite_email= b'{$vReclamo_->permite_email}', vencimiento='{$vReclamo_->vencimiento}'"
                                . "WHERE valoraciones_idvaloraciones='{$vReclamo_->idvaloracion}'";
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
     * @param type $idservicio_
     * @param boolean $habilitar
     * @return boolean
     */
    private function habilitacionReclamo($idValoracion_, $habilitar) {

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

    public function habilitarReclamo($idservicio_) {
        return $this->habilitacionReclamo($idservicio_, 1);
    }

    public function deshabilitarReclamo($idservicio_) {
        return $this->habilitacionReclamo($idservicio_, 0);
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
                        . ".valoracion_hecha where idvaloracion_hecha='{$idServicio_}'";
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

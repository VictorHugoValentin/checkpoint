<?php
require_once '../lib/ObjetoDatos.class.php';
require_once '../lib/Constantes.class.php';
require_once './valoracion.class.php';

class valoracionHechaReclamo {
    public function __construct() {
        ;
    }
    public $id;
    public $nombreValoracionRepresentada;
    public $descripcion;
    public $tipo;
    public $fecha;
    public $urlImagen;
    public $emailDevolucion;
    public $vencimiento;
    public $estado;
    public $ultimoCambio;
    
    public function setNombreValoracionRepresentada($nombreValoracionRepresentada) {
        $this->nombreValoracionRepresentada = $nombreValoracionRepresentada;
    }

    public function setEstado($estado) {
        $this->estado = $estado;
    }

    public function setUltimoCambio($ultimoCambio) {
        $this->ultimoCambio = $ultimoCambio;
    }

        public function setId($id) {
        $this->id = $id;
    }

    public function setIdUbicacionValoracion($idUbicacionValoracion) {
        $this->idUbicacionValoracion = $idUbicacionValoracion;
    }

    public function setDescripcion($descripcion) {
        $this->descripcion = $descripcion;
    }

    public function setTipo($tipo) {
        $this->tipo = $tipo;
    }

    public function setFecha($fecha) {
        $this->fecha = $fecha;
    }

    public function setUrlImagen($urlImagen) {
        $this->urlImagen = $urlImagen;
    }

    public function setEmailDevolucion($emailDevolucion) {
        $this->emailDevolucion = $emailDevolucion;
    }

    public function setVencimiento($vencimiento) {
        $this->vencimiento = $vencimiento;
    }
}

class gestorValoracionHechas {
    public function __construct() {
        ;
    }

    /**
     * Devuelve los datos de una valoracion realizada de tipo reclamo
     * @param type $idvaloracion_
     * @return \ValoracionReclamo
     * @throws Exception
     */
    public function obtenerValoracionHecha($idvaloracionreclamo_) {
        $valoracionReclamo = null;
        $usuario = $_SESSION['usuario'];
        try {
            $resultados = ObjetoDatos::getInstancia()->ejecutarQuery(""
                    . "SELECT s.nombre as servicio, v.nombre as valoracion,vh.descripcion,vh.tipo,vh.fecha, vh.idvaloracion_hecha,s.idservicios, 
cev.estado,cev.fecha as ultimocambio,vhr.url_imagen,vhr.email_devolucion,vr.vencimiento
FROM " . Constantes::BD_SCHEMA . ".USUARIO u 
join " . Constantes::BD_SCHEMA . ".servicios  s ON u.idusuario=s.usuario_idusuario 
join " . Constantes::BD_SCHEMA . ".valoraciones v on v.fk_servicios_idservicios=s.idservicios
join " . Constantes::BD_SCHEMA . ".valoracion_reclamo vr on vr.valoraciones_idvaloraciones=v.idvaloraciones
join " . Constantes::BD_SCHEMA . ".ubicacion_valoracion uv on uv.fk_valoraciones_idvaloraciones=v.idvaloraciones
join " . Constantes::BD_SCHEMA . ".valoracion_hecha vh on vh.ubicacion_valoracion_idubicacion_valoracion=uv.idubicacion_valoracion
left join " . Constantes::BD_SCHEMA . ".valoracion_hecha_reclamo vhr on vhr.idvaloracion_hecha=vh.idvaloracion_hecha
left join (select idcambio_estado_valoracion,estado,fecha,fk_valoracion_hecha_idvaloracion_hecha from " . Constantes::BD_SCHEMA . ".cambio_estado_valoracion where fk_valoracion_hecha_idvaloracion_hecha= {$idvaloracionreclamo_} order by fecha desc limit 1) cev on cev.fk_valoracion_hecha_idvaloracion_hecha=vh.idvaloracion_hecha
WHERE u.idusuario = {$usuario->idusuario} and vh.idvaloracion_hecha= {$idvaloracionreclamo_}
ORDER BY s.nombre ASC, v.nombre ASC"
            );
 //$id;$nombreValoracionRepresentada;$descripcion;$tipo;$fecha;$urlImagen;$emailDevolucion;$vencimiento;$estado;$ultimoCambio;
            if ($fila = $resultados->fetch_assoc()) {
                $valoracionReclamo = new valoracionHechaReclamo();
                $valoracionReclamo->setId($idvaloracionreclamo_);
                $valoracionReclamo->setNombreValoracionRepresentada($fila['valoracion']);
                $valoracionReclamo->setDescripcion($fila['descripcion']);
                $valoracionReclamo->setTipo($fila['tipo']);
                $valoracionReclamo->setFecha($fila['fecha']);
                $valoracionReclamo->setUrlImagen($fila['url_imagen']);
                $valoracionReclamo->setEmailDevolucion($fila['email_devolucion']);
                $valoracionReclamo->setVencimiento($fila['vencimiento']);
                $valoracionReclamo->setEstado($fila['estado']);                
                $valoracionReclamo->setUltimoCambio($fila['vencimiento']);
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
        if ($this->validarNuevo($vReclamo_)) {
            try {
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

                //echo $idubicacion;
            } catch (Exception $exc) {
                $mensaje = "Ha ocurrido un error. "
                        . "Codigo de error MYSQL: " . $exc->getCode() . ". ";
                ObjetoDatos::getInstancia()->rollback();
                $retorno = 0;
            }
        }
        return $retorno;
    }

    /**
     * Realiza la validacion de los datos de la nueva valoracion de reclamo 
     */
    public function validarNuevo(ValoracionReclamo $valoracionReclamo_) {
        return (!empty($valoracionReclamo_->nombre) && !empty($valoracionReclamo_->descripcion) && !empty($valoracionReclamo_->tipo) && !empty($valoracionReclamo_->vencimiento)
                );
    }

    public function editarValoracion(ValoracionReclamo $vReclamo_) {
        $retorno = 0;
        if ($this->validarNuevo($vReclamo_)) {
            try {
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
            } catch (Exception $exc) {
                $mensaje = "Ha ocurrido un error. "
                        . "Codigo de error MYSQL: " . $exc->getCode() . ". ";
                ObjetoDatos::getInstancia()->rollback();
                $retorno = 0;
            }
        }
        return $retorno;
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
                                    //deshabilito el servicio
                                    $consulta4 = "update servicios set habilitado=0 where idservicios={$idservicio}";
                                    $retorno4 = ObjetoDatos::getInstancia()->ejecutarQuery($consulta4);
                                    if ($retorno4) {
                                        //exito, excepcion con codigo 1
                                        $retorno = ObjetoDatos::getInstancia()->commit();
                                        $lanzarexcepcion = true;
                                        $mensjexcepcion = "El Servicio está deshabilitado por no tener valoraciones habilitadas.";
                                        $codigo = 1;
                                    }
                                } else {
                                    //exito
                                    $retorno = ObjetoDatos::getInstancia()->commit();
                                }
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
                    }else{
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
        if($lanzarexcepcion){
            throw new Exception($mensjexcepcion,$codigo);
        }else{
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

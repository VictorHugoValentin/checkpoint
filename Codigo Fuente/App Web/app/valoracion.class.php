<?php
class Valoracion {
    public $idvaloracion;
    public $nombre;
    public $tipo;
    public $recibir_notificacion_email;
    public $permite_descripcion;
    public $habilitado;
    public $fk_idservicio;
    public $descripcion;
    
    public function setIdvaloracion($id_) {
        $this->idvaloracion = $id_;
    }

    public function setNombre($nombre_) {
        $this->nombre = $nombre_;
    }

    public function setTipo($tipo_) {
        $this->tipo = $tipo_;
    }

    public function setRecibirNotificacionEmail($recibirNotificacionEmail_) {
        $this->recibir_notificacion_email = $recibirNotificacionEmail_;
    }
    
    public function setPermiteDescripcion($permiteDescripcion_) {
        $this->permite_descripcion = $permiteDescripcion_;
    }
    
    public function setHabilitado($habilitado_) {
        $this->habilitado = $habilitado_;
    }
    
    public function setFkIdservicio($fkIdservicio_) {
        $this->fk_idservicio = $fkIdservicio_;
    }
    
    public function setDescripcion($descripcion_) {
        $this->descripcion = $descripcion_;
    }
}

class ValoracionRango extends Valoracion{
    public $tipo_valor;
    
    public function setTipoValor($tipoValor_) {
        $this->tipo_valor = $tipoValor_;
    }
}

class ValoracionReclamo extends Valoracion{
    public $permite_foto;
    public $permite_email;
    public $vencimiento;
    
    public function setPermiteFoto($permiteFoto_) {
        $this->permite_foto = $permiteFoto_;
    }
    
    public function setPermiteEmail($permiteEmail_) {
        $this->permite_email = $permiteEmail_;
    }
    public function setVencimiento($vencimiento_) {
        $this->vencimiento = $vencimiento_;
    }
}

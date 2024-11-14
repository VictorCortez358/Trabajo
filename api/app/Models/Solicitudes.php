<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Solicitudes extends Model
{
    protected $connection = 'sqlsrv';
    protected $table = 'Solicitudes';

    public function filters($codigo_cliente = null, $estado = null, $fecha = null)
    {
        try {
            // Inicia la consulta a la tabla
            $query = DB::table($this->table)->select('*');

            // Aplica filtro por código de cliente si está definido
            if (!is_null($codigo_cliente)) {
                $query->where('codigo_cliente', $codigo_cliente);
            }

            // Aplica filtro por estado si está definido
            if (!is_null($estado)) {
                $query->where('estado', $estado);
            }

            // Aplica filtro por fecha si está definida
            if (!is_null($fecha)) {
                $query->whereDate('fecha', $fecha);
            }

            // Ejecuta la consulta y devuelve los resultados
            return $query->get();
        } catch (\Exception $e) {
            return "Error en la consulta: " . $e->getMessage();
        }
    }
}

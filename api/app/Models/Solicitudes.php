<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;


class solicitudes extends Model
{
    protected $connection = 'sqlsrv';

    protected $table = 'Solicitudes';

    // Relacion Muchos a Muchos  
    public function items()
    {
        return $this->belongsToMany(Item::class, 'Solicitud_Adicional', 'id_solicitud', 'id_item')
            ->withPivot('cantidad');  
    }

    /**
     select 
v.codigo,
c.*
from vendor v
left join clientes c
on  v.codigo = c.codigo

     */
}

<?php

namespace App\Http\Controllers;

use App\Models\solicitudes;

abstract class Controller
{

    public function getSolicitudes()
    {
        $solicitudes = new Solicitudes();
        $solicitudesConItems = $solicitudes->items();  // Cargar solicitudes con items

        return $solicitudesConItems;
    }
}

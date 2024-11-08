<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\solicitudes;

class Ruteros extends Controller
{
    public function getSolicitudes()
    {
        $solicitudes = new solicitudes();
        $solicitudesConItems = $solicitudes->items();  // Cargar solicitudes con items

        return $solicitudesConItems;
    }
}

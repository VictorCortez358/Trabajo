<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\solicitudes;
use Illuminate\Support\Facades\Request;

class Ruteros extends Controller
{
    public function filtrarSolicitudes(Request $request)
    {
        // Obtén los valores de los filtros desde el request
        $codigo_cliente = $request->input('codigo_cliente');
        $estado = $request->input('estado');
        $fecha = $request->input('fecha');

        // Llama al método filters del modelo Solicitud
        $solicitud = new Solicitudes();
        $resultados = $solicitud->filters($codigo_cliente, $estado, $fecha);

        // Verifica si hay un error en la consulta
        if (is_string($resultados)) {
            return response()->json(['error' => $resultados], 500);
        }

        // Retorna los resultados como JSON
        return response()->json($resultados);
    }

    public function obtenerImagen()
    {
        $imagePath = 'images/imagen.png'; // Ajusta el nombre de la imagen
        $url = asset("storage/{$imagePath}");
        return response()->json(['url' => $url]);
    }
}

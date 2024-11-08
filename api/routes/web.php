<?php

use App\Models\solicitudes;
use Illuminate\Support\Facades\Route;

Route::get('/solicitudes/items', function () {
    $solicitudes = solicitudes::with('items')->get();
    // Devolver los datos en formato JSON
    return response()->json($solicitudes);
});



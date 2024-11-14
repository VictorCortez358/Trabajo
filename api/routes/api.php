<?php

use Illuminate\Support\Facades\Route;

Route::get('/obtener/imagen', function () {
    $imagePath = 'images/imagen.png'; // Ajusta el nombre de la imagen
    $url = asset("storage/{$imagePath}");
    return response()->json(['url' => $url]);
});
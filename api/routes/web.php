<?php

use App\Http\Controllers\Ruteros;
use App\Models\Solicitudes;
use Illuminate\Http\Middleware\HandleCors;
use Illuminate\Support\Facades\Route;

Route::middleware([HandleCors::class])->group(function () {
    Route::get('/obtener/imagen', [Ruteros::class,'obtenerImagen'])->name('obtenerImagen');
    // Agrega otras rutas según sea necesario
});







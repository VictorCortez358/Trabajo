<?php

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Route;

Route::get('/solicitudes/items', [Controller::class,'getSolicitudes'])->name('getSolicitudes');

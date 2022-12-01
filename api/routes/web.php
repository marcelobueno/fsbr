<?php

use App\Models\Cadastro;
use App\Models\Estado;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
Route::get('/', function(){

    $estados = Estado::all();
    $cadastros = Cadastro::all();

    dd($estados, $cadastros);
});

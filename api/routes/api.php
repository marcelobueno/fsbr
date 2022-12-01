<?php

use App\Http\Controllers\Api\Auth\AuthController;
use App\Http\Controllers\Api\Auth\ForgotPasswordController;
use App\Http\Controllers\Api\Auth\RegisterController;
use App\Http\Controllers\Api\CadastroController;
use App\Http\Controllers\Api\EstadoController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('/register', [RegisterController::class, 'store']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function(){

    Route::post('/logout', [AuthController::class, 'logout']);

    Route::prefix('cadastros')->group(function() {

        Route::get('/', [CadastroController::class, 'list']);

        Route::post('/findbycpf', [CadastroController::class, 'findByCpf']);

        Route::post('/findallbycpf', [CadastroController::class, 'findAllByCpf']);

        Route::post('/findbyname', [CadastroController::class, 'findByName']);

        Route::post('/store', [CadastroController::class, 'store']);

        Route::put('/update', [CadastroController::class, 'update']);

        Route::delete('/destroy', [CadastroController::class, 'destroy']);
    });

    Route::prefix('estados')->group(function() {

        Route::get('/', [EstadoController::class, 'list']);
    });

});

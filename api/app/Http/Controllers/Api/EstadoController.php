<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Estado;
use Illuminate\Http\Request;

class EstadoController extends Controller
{
    /**
     * Função responsável por listar os estados.
     */
    public function list()
    {
        try {

            $estados = Estado::all();

            return response()->json([
                'status' => 'success',
                'code' => 200,
                'message' => 'Estados listados com sucesso',
                'data' => $estados
            ]);

        } catch (\Exception $e) {

            return response()->json([
                'status' => 'error',
                'code' => 406,
                'message' => 'Falha ao listar os estados',
                'error' => $e->getMessage()
            ]);
        }
    }
}

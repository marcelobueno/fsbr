<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Cadastro;
use App\Models\Estado;
use Exception;
use Illuminate\Http\Request;

class CadastroController extends Controller
{
    /**
     * Função responsável por listar os cadastros.
     */
    public function list()
    {
        try {

            $cadastros = Cadastro::all();

            if ($cadastros) {

                return response()->json([
                    'status' => 'success',
                    'code' => 200,
                    'message' => 'Cadastros listados com sucesso',
                    'data' => $cadastros
                ]);
            }
        } catch (\Exception $e) {

            return response()->json([
                'status' => 'error',
                'code' => 406,
                'message' => 'Falha ao listar cadastros. Erro: ',
                'error' => $e->getMessage()
            ]);
        }
    }

    /**
     * Função responsável por gerar um novo cadastro.
     */
    public function store(Request $request)
    {
        try {

            $validation = $request->validate([
                'nome' => 'required|string',
                'cpf' => 'required|string',
                'cidade' => 'required|string',
                'estado' => 'required|integer'
            ]);

            if ($validation) {

                $estado = Estado::findOrFail($request->estado);

                $cadastro = new Cadastro();
                $cadastro->nome = ucwords(strtolower($request->nome));
                $cadastro->cpf = str_replace(['.', '-'], '', $request->cpf);
                $cadastro->cidade = ucwords(strtolower($request->cidade));
                $cadastro->estado = $estado->estado;
                $cadastro->save();

                return response()->json([
                    'status' => 'success',
                    'code' => 200,
                    'message' => 'Cadastro gerado com sucesso',
                    'data' => $cadastro
                ]);
            }

        } catch (\Exception $e) {

            return response()->json([
                'status' => 'error',
                'code' => 406,
                'message' => 'Falha ao gerar cadastro. Erro: ',
                'error' => $e->getMessage()
            ]);
        }
    }

    /**
     * Função responsável por encontrar um cadastro pelo cpf.
     */
    public function findByCpf(Request $request)
    {
        try {

            $cpf = $request->cpf;

            $cadastro = Cadastro::where('cpf', $cpf)->orWhere('cpf', 'like', '%' . $cpf . '%')->first();

            if ($cadastro) {

                return response()->json([
                    'status' => 'success',
                    'code' => 200,
                    'message' => 'Cadastro encontrado com sucesso',
                    'data' => $cadastro
                ]);
            } else {

                throw new Exception('Cadastro não encontrado', 404);
            }

        } catch (\Exception $e) {

            return response()->json([
                'status' => 'error',
                'code' => 404,
                'message' => 'Não foi possível encontrar este cadastro.',
                'error' => $e->getMessage()
            ]);
        }
    }

    /**
     * Função responsável por encontrar um cadastro pelo cpf.
     */
    public function findAllByCpf(Request $request)
    {
        try {

            $cpf = $request->cpf;

            $cadastros = Cadastro::where('cpf', $cpf)->orWhere('cpf', 'like', '%' . $cpf . '%')->get();

            if ($cadastros) {

                return response()->json([
                    'status' => 'success',
                    'code' => 200,
                    'count' => count($cadastros),
                    'message' => 'Cadastro encontrado com sucesso',
                    'data' => $cadastros
                ]);
            } else {

                throw new Exception('Cadastro não encontrado', 404);
            }

        } catch (\Exception $e) {

            return response()->json([
                'status' => 'error',
                'code' => 404,
                'message' => 'Não foi possível encontrar este cadastro.',
                'error' => $e->getMessage()
            ]);
        }
    }

    /**
     * Função responsável por encontrar um cadastro pelo nome.
     */
    public function findByName(Request $request)
    {
        try {

            $nome = $request->nome;

            $cadastros = Cadastro::where('nome', 'like', '%' . $nome . '%')->get();

            if ($cadastros) {

                return response()->json([
                    'status' => 'success',
                    'code' => 200,
                    'count' => count($cadastros),
                    'message' => 'Cadastro encontrado com sucesso',
                    'data' => $cadastros
                ]);
            } else {

                throw new Exception('Cadastro não encontrado', 404);
            }

        } catch (\Exception $e) {

            return response()->json([
                'status' => 'error',
                'code' => 404,
                'message' => 'Não foi possível encontrar este cadastro. Erro: ',
                'error' => $e->getMessage()
            ]);
        }
    }

    /**
     * Função responsável por atualizar um cadastro.
     */
    public function update(Request $request)
    {
        try {

            $validation = $request->validate([
                'id' => 'required|integer',
                'nome' => 'required|string',
                'cpf' => 'required|string',
                'cidade' => 'required|string',
                'estado' => 'required|integer'
            ]);

            if ($validation) {

                $estado = Estado::findOrFail($request->estado);

                $cadastro = Cadastro::findOrFail($request->id);

                $cadastro->nome = ucwords(strtolower($request->nome));
                $cadastro->cpf = str_replace(['.', '-'], '', $request->cpf);
                $cadastro->cidade = ucwords(strtolower($request->cidade));
                $cadastro->estado = $estado->estado;

                $cadastro->save();

                return response()->json([
                    'status' => 'success',
                    'code' => 200,
                    'message' => 'Cadastro atualizado com sucesso',
                    'data' => $cadastro
                ]);
            }

        } catch (\Exception $e) {

            return response()->json([
                'status' => 'error',
                'code' => 406,
                'message' => 'Falha ao atualizar cadastro. Por favor, tente novamente.',
                'error' => $e->getMessage()
            ]);
        }
    }

    /**
     * Função responsável por deletar um cadastro.
     */
    public function destroy(Request $request)
    {
        try {

            $validation = $request->validate([
                'id' => 'required|integer',
            ]);

            if ($validation) {

                $cadastro = Cadastro::findOrFail($request->id);

                $cadastro->delete();

                return response()->json([
                    'status' => 'success',
                    'code' => 200,
                    'message' => 'Cadastro excluído com sucesso',
                    'data' => $cadastro
                ]);
            }

        } catch (\Exception $e) {

            return response()->json([
                'status' => 'error',
                'code' => 406,
                'message' => 'Falha ao excluir cadastro. Por favor, tente novamente.',
                'error' => $e->getMessage()
            ]);
        }
    }
}

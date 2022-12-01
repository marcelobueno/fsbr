<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        try {

            $validation = $request->validate([
                'email' => 'required|email',
                'password' => 'required|string'
            ]);

            if ($validation) {

                $user = User::where('email', $request->email)->first();

                if ($user && Hash::check($request->password, $user->password)) {

                    $user->tokens()->delete();

                    $token = $user->createToken('auth');

                    return response()->json([
                        'status' => 'success',
                        'code' => 200,
                        'message' => 'Token gerado com sucesso',
                        'token' => $token->plainTextToken
                    ]);

                } else {

                    throw new Exception('Essas credenciais não foram encontradas em nossos registros.', 404);
                }

            } else {

                throw new Exception('Informações de login inválidas.', 403);
            }

        } catch (\Exception $e) {

            return response()->json([
                'status' => 'error',
                'code' => 403,
                'message' => 'Não foi possível realizar a autenticação do usuário. Erro: ' . $e->getMessage(),
                'token' => null
            ]);
        }
    }

    public function logout(Request $request)
    {
        try {

            $validation = $request->validate([
                'id' => 'required|integer'
            ]);

            if ($validation) {

                $user = User::find($request->id);

                if ($user) {

                    $user->tokens()->delete();

                    return response()->json([
                        'status' => 'success',
                        'code' => 200,
                        'message' => 'Logout realizado com sucesso.'
                    ]);

                } else {

                    throw new Exception('Usuário não encontrado.', 404);
                }

            } else {

                throw new Exception('ID de usuário não informado.', 406);
            }

        } catch (\Exception $e) {

            return response()->json([
                'status' => 'error',
                'code' => 403,
                'message' => 'Não foi possível realizar o logout do usuário. Erro: ' . $e->getMessage()
            ]);
        }
    }
}

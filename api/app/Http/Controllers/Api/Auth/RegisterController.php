<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class RegisterController extends Controller
{
    public function store(Request $request)
    {
        try {

            $validation = $request->validate([
                'name' => 'required|string',
                'email' => 'required|email',
                'password' => 'required|string',
            ]);

            if ($validation) {

                $user = new User();
                $user->name =  $request->name;
                $user->email = $request->email;
                $user->password = Hash::make($request->password);
                $user->save();

                return response()->json([
                    'status' => 'success',
                    'code' => 200,
                    'message' => 'Usuário cadastrado com sucesso.',
                    'user' => $user
                ]);

            } else {

                throw new Exception('Não foi possível cadastrar o usuário, por favor revise as informações.', 406);
            }

        } catch (\Exception $e) {

            return response()->json([
                'status' => 'error',
                'code' => 406,
                'message' => 'Não foi possível cadastrar este usuário. Erro: ' . $e->getMessage(),
                'user' => null
            ]);
        }
    }
}

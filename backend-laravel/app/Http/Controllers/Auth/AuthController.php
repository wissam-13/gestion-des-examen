<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    public function signup(Request $req){
        $data = $req->validate([
            'email' => ['required','email','unique:users'],
            'password'  => ['required','min:8'],
            'firstname' => ['required','string'],
            'lastname'  => ['required','string'],
            'departement'   => ['required','string'],
            'speciality'    => ['required','string'],
            'phone'         => ['required','string'],
            'max_supervisions'  => ['integer','required'],
        ]);

        $user = User::create([
            'email'     => $data['email'],
            'password'  => bcrypt($data['password']),
            'firstname' => $data['firstname'],
            'lastname'  => $data['lastname'],
            'departement'    => $data['departement'],
            'speciality'    => $data['speciality'],
            'phone'     => $data['phone']??null,
            'max_supervisions'  => $data['max_supervisions']
        ]);

        $token = $user->createToken('api')->plainTextToken;

        return response()->json([
            'success'   => true,
            'token'     => $token,
            'user'      => $user
        ]);
    }

    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);
        $user = User::where('email', $request->email)->first();
        if (! $user || ! Hash::check($request->password, $user->password)) {
            throw ValidationException::withMessages([
                'email' => ['Invalid credentials.'],
            ]);
        }
        return response()->json([
            'token' => $user->createToken('api-token')->plainTextToken,
            'user' => $user
        ]);
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json(['message' => 'Logged out']);
    }
}

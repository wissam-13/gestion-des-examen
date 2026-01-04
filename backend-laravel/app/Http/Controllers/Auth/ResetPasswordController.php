<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\PasswordResetToken;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class ResetPasswordController extends Controller
{
    public function index($email,$token){
        $reset = PasswordResetToken::where('email',$email)->where('token',$token)->first();
        if($reset){
            return response()->json([
                'success'   => true,
                'email'     => $email,
                'token'     => $token,
            ]);
        }
        return response()->json([
            'success'   => false,
        ]);
    }

    public function send(Request $request){
        $request->validate([
            'email'                 => ['required','email','exists:password_reset_tokens,email'],
            'token'                 => ['required','string'],
            'password'              => ['required','min:8','confirmed'],
            'password_confirmation' => ['required'],
        ]);

        $verify = PasswordResetToken::where('email',$request->email)->where('token',$request->token)->first();
        if($verify){
            if(Carbon::parse($verify->created_at)->gt(Carbon::now()->subMinutes(15))){
                // Get the current student
                $user = User::where('email',$request->email)->first();
                // change the Password of student
                $user->update([
                    'password'  => Hash::make($request->password)
                ]);
                // Delete the existing Token
                $verify->delete();
                // Return the success
                return response()->json([
                    'success'   => true,
                    'message'   => 'password changed'
                ]);
            }else{
                return response()->json([
                    'success'   => false,
                    'message'   => 'token expiree'
                ]);
            }
        }else{
            return response()->json([
                'success'   => false
            ]);
        }
    }
}

<?php

namespace App\Http\Controllers\Admin\Auth;

use App\Http\Controllers\Controller;
use App\Models\Admin;
use App\Models\AdminPasswordResetToken;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AdminResetPasswordController extends Controller
{
    public function index($email,$token){
        $reset = AdminPasswordResetToken::where('email',$email)->where('token',$token)->first();
        if($reset){
            return response()->json([
                'success'   => true,
                'email'     => $email,
                'token'     => $token
            ]);
        }

        return response()->json([
            'success'   => false
        ]);
    }

    public function send(Request $request){
        $request->validate([
            'email'     => ['required','email','exists:admin_password_reset_tokens,email'],
            'token'     => ['required','string'],
            'password'  => ['required','min:8','confirmed'],
            'password_confirmation' => ['required'],
        ]);

        $verify = AdminPasswordResetToken::where('email',$request->email)->where('token',$request->token)->first();
        if($verify){
            if(Carbon::parse($verify->created_at)->gt(Carbon::now()->subMinutes(15))){
                $admin = Admin::where('email',$request->email)->first();
                $admin->update([
                    'password'  => Hash::make($request->password),
                ]);
                $verify->delete();
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
                'success'   => false,
            ]);
        }
    }
}

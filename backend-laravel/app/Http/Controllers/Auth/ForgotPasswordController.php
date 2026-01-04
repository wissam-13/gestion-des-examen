<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Mail\UserResetPassword;
use App\Models\PasswordResetToken;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Log;

class ForgotPasswordController extends Controller
{
    public function sendVerificationCodeEmail(Request $request){
        $request->validate([
            'email' => ['required','email','exists:users,email'],
        ]);
        $token = Str::random(64);
        $verify_email = PasswordResetToken::where('email',$request->email)->first('email');
        if($verify_email){
            $verify_email->update([
                'token' => $token,
                'created_at'    => Carbon::now(),
            ]);
            try{
                Mail::to($request->email)->send(new UserResetPassword($verify_email));
            }catch(\Exception $e){
                Log::error($e->getMessage());
                return response()->json([
                    'success'   => false,
                    'message'   => $e->getMessage()
                ],500);
            }
        }else{
            $password_reset_token = PasswordResetToken::create([
                'email' => $request->email,
                'token' => $token,
                'created_at'    => Carbon::now(),
            ]);
            try{
                Mail::to($request->email)->send(new UserResetPassword($password_reset_token));
            }catch(\Exception $e){
                Log::error($e->getMessage());
                return response()->json([
                    'success'   => false,
                    'message'   => $e->getMessage()
                ],500);
            }
        }

        return response()->json([
            'success'   => true,
            'message'   => 'message send'
        ]);
    }
}

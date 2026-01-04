<?php

namespace App\Http\Controllers\Planner\Auth;

use App\Http\Controllers\Controller;
use App\Mail\PlanerResetPassword;
use App\Models\PlanerPasswordResetToken;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Log;

class PlanerForgotPasswordController extends Controller
{
    public function sendVerificationCodeEmail(Request $request){
        $request->validate([
            'email' => ['required','email','exists:planers,email'],
        ]);
        $token = Str::random(64);
        $verify_email = PlanerPasswordResetToken::where('email',$request->email)->first('email');
        if($verify_email){
            $verify_email->update([
                'token' => $token,
                'created_at'    => Carbon::now(),
            ]);
            try{
                Mail::to($request->email)->send(new PlanerResetPassword($verify_email));
            }catch(\Exception $e){
                Log::error($e->getMessage());
                return response()->json([
                    'success'   => false,
                    'message'   => $e->getMessage()
                ],500);
            }
        }else{
            $planer_prt = PlanerPasswordResetToken::create([
                'email' => $request->email,
                'token' => $token,
                'created_at'    => Carbon::now(),
            ]);
            try{
                Mail::to($request->email)->send(new PlanerResetPassword($planer_prt));
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

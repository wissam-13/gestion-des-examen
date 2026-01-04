<?php

namespace App\Http\Controllers\Admin\Auth;

use App\Http\Controllers\Controller;
use App\Mail\AdminResetPassword;
use App\Models\Admin;
use App\Models\AdminPasswordResetToken;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Log;

class AdminForgotPasswordController extends Controller
{
    public function sendVerificationCodeEmail(Request $request){
        $request->validate([
            'email' => ['required','email','exists:admins,email'],
        ]);
        $token = Str::random(64);
        $verify_email = AdminPasswordResetToken::where('email',$request->email)->first('email');
        if($verify_email){
            $verify_email->update([
                'token' => $token,
                'created_at'    => Carbon::now()
            ]);
            try{
                Mail::to($request->email)->send(new AdminResetPassword(($verify_email)));
            }catch(\Exception $e){
                Log::error($e->getMessage());
                return response()->json([
                    'success'   => false,
                    'message'   => $e->getMessage()
                ],500);
            }
        }else{
            $admin_prt = AdminPasswordResetToken::create([
                'email' => $request->email,
                'token' => $token,
                'created_at'    => Carbon::now()
            ]);
            try{
                Mail::to($request->email)->send(new AdminResetPassword($admin_prt));
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
            'message'   => 'message send',
        ]);
    }
}

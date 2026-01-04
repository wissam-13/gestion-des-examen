<?php

namespace App\Http\Controllers\Teacher\Auth;

use App\Http\Controllers\Controller;
use App\Mail\TeacherResetPassword;
use App\Models\TeacherPasswordResetToken;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Log;

class TeacherForgotPasswordController extends Controller
{
    public function sendVerificationCodeEmail(Request $request){
        $request->validate([
            'email' => ['required','email','exists:teachers,email'],
        ]);
        $token = Str::random(64);
        $verify_email = TeacherPasswordResetToken::where('email',$request->email)->first('email');
        if($verify_email){
            $verify_email->update([
                'token' => $token,
                'created_at'    => Carbon::now(),
            ]);
            try{
                Mail::to($request->email)->send(new TeacherResetPassword($verify_email));
            }catch(\Exception $e){
                Log::error($e->getMessage());
                return response()->json([
                    'success'   => false,
                    'message'   => $e->getMessage()
                ],500);
            }
        }else{
            $teacher_prt = TeacherPasswordResetToken::create([
                'email' => $request->email,
                'token' => $token,
                'created_at'    => Carbon::now(),
            ]);
            try{
                Mail::to($request->email)->send(new TeacherResetPassword($teacher_prt));
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

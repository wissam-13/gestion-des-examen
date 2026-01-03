<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\AuditLog;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    public function index(){
        $users = User::all();
        return response()->json([
            'success' => true,
            'users' => $users
        ]);
    }

    public function store(Request $request){
        $data = $request->validate([
            'email' => ['required','email','unique:users'],
            'password'  => ['required','min:8'],
            'firstname' => ['required','string'],
            'lastname'  => ['required','string'],
            'departement'   => ['required','string'],
            'speciality'    => ['required','string'],
            'phone'         => ['required','string','unique:users'],
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
            'max_supervisions'  => $data['max_supervisions'],
            'is_active' => true
        ]);

        if(Auth::guard('admin')->check()){
            AuditLog::create([
                'entity'    => 'student',
                'entity_id' => $user->id,
                'action'    => 'create',
                'Performed_by_admin'    => Auth::guard('admin')->id(),
                'details'   => $user
            ]);
        }

        return response()->json([
            'success'   => true,
        ]);
    }

    public function show(User $user){
        return response()->json([
            'success'   => true,
            'user'      => $user,
        ]);
    }

    public function update(Request $request,User $user){
        $data = $request->validate([
            'email' => ['required','email','unique:users,email,'.$user->id],
            'password'  => ['nullable','min:8'],
            'firstname' => ['required','string'],
            'lastname'  => ['required','string'],
            'departement'   => ['required','string'],
            'speciality'    => ['required','string'],
            'phone'         => ['required','string','unique:users,phone,'.$user->id],
            'is_active'     => ['required','boolean'],
            'max_supervisions'  => ['integer','required'],
        ]);
        // change information instead the password
        $user->update([
            'email'     => $data['email'],
            'firstname' => $data['firstname'],
            'lastname'  => $data['lastname'],
            'departement'    => $data['departement'],
            'speciality'    => $data['speciality'],
            'phone'     => $data['phone']??null,
            'max_supervisions'  => $data['max_supervisions'],
            'is_active'     => $data['is_active'],
        ]);
        // change password
        if($data['password']){
            $user->update([
                'password'  => bcrypt($data['password']),
            ]);
        }
        // Log Audit
        if(Auth::guard('admin')->check()){
            AuditLog::create([
                'entity'    => 'student',
                'entity_id' => $user->id,
                'action'    => 'update',
                'Performed_by_admin'    => Auth::guard('admin')->id(),
                'details'   => $user
            ]);
        }
        return response()->json([
            'success'   => true,
        ]);
    }

    public function active(User $user){
        $user->update([
            'is_active'     => true,
        ]);
        return response()->json([
            'success'   => true,
        ]);
    }

    public function destroy(User $user){
        // Audit Log
        if(Auth::guard('admin')->check()){
            AuditLog::create([
                'entity'    => 'student',
                'entity_id' => $user->id,
                'action'    => 'delete',
                'Performed_by_admin'    => Auth::guard('admin')->id(),
                'details'   => $user
            ]);
        }
        // delete student
        $user->delete();
        return response()->json([
            'success'   => true,
        ]);
    }

}

<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\AuditLog;
use App\Models\Teacher;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class TeacherController extends Controller
{
    public function index(){
        $teachers = Teacher::all();
        return response()->json([
            'success' => true,
            'teachers' => $teachers
        ]);
    }

    public function store(Request $request){
        $data = $request->validate([
            'email' => ['required','email','unique:teachers'],
            'password'  => ['required','min:8'],
            'firstname' => ['required','string'],
            'lastname'  => ['required','string'],
            'departement'   => ['required','string'],
            'speciality'    => ['required','string'],
            'phone'         => ['required','string','unique:teachers'],
            'max_supervisions'  => ['integer','required'],
        ]);

        $teacher = Teacher::create([
            'email'     => $data['email'],
            'password'  => bcrypt($data['password']),
            'firstname' => $data['firstname'],
            'lastname'  => $data['lastname'],
            'departement'    => $data['departement'],
            'speciality'    => $data['speciality'],
            'phone'     => $data['phone']??null,
            'max_supervisions'  => $data['max_supervisions'],
            'is_active'     => true,
        ]);
        // Log Audit
        if(Auth::guard('admin')->check()){
            AuditLog::create([
                'entity'    => 'teacher',
                'entity_id' => $teacher->id,
                'action'    => 'create',
                'Performed_by_admin'    => Auth::guard('admin')->id(),
                'details'   => $teacher
            ]);
        }
        return response()->json([
            'success'   => true,
        ]);
    }

    public function show(Teacher $teacher){
        return response()->json([
            'success'   => true,
            'teacher'      => $teacher,
        ]);
    }

    public function update(Request $request,Teacher $teacher){
        $data = $request->validate([
            'email' => ['required','email','unique:teachers,email,'.$teacher->id],
            'password'  => ['nullable','min:8'],
            'firstname' => ['required','string'],
            'lastname'  => ['required','string'],
            'departement'   => ['required','string'],
            'speciality'    => ['required','string'],
            'phone'         => ['required','string','unique:teachers,phone,'.$teacher->id],
            'is_active'     => ['required','boolean'],
            'max_supervisions'  => ['integer','required'],
        ]);
        // change information instead the password
        $teacher->update([
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
            $teacher->update([
                'password'  => bcrypt($data['password']),
            ]);
        }
        // Audit Log
        if(Auth::guard('admin')->check()){
            AuditLog::create([
                'entity'    => 'teacher',
                'entity_id' => $teacher->id,
                'action'    => 'update',
                'Performed_by_admin'    => Auth::guard('admin')->id(),
                'details'   => $teacher
            ]);
        }
        return response()->json([
            'success'   => true,
        ]);
    }

    public function active(Teacher $teacher){
        $teacher->update([
            'is_active'     => true,
        ]);
        return response()->json([
            'success'   => true,
        ]);
    }

    public function destroy(Teacher $teacher){
        // Audit Log
        if(Auth::guard('admin')->check()){
            AuditLog::create([
                'entity'    => 'teacher',
                'entity_id' => $teacher->id,
                'action'    => 'delete',
                'Performed_by_admin'    => Auth::guard('admin')->id(),
                'details'   => $teacher
            ]);
        }
        // delete teacher
        $teacher->delete();
        return response()->json([
            'success'   => true,
        ]);
    }

}

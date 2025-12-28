<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Planer;
use Illuminate\Http\Request;

class PlanerController extends Controller
{
    public function index(){
        $teachers = Planer::all();
        return response()->json([
            'success' => true,
            'teachers' => $teachers
        ]);
    }

    public function store(Request $request){
        $data = $request->validate([
            'email' => ['required','email','unique:planers'],
            'password'  => ['required','min:8'],
            'firstname' => ['required','string'],
            'lastname'  => ['required','string'],
            'departement'   => ['required','string'],
            'speciality'    => ['required','string'],
            'phone'         => ['required','string','unique:planers'],
            'max_supervisions'  => ['integer','required'],
        ]);

        $teacher = Planer::create([
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

        return response()->json([
            'success'   => true,
        ]);
    }

    public function show(Planer $planer){
        return response()->json([
            'success'   => true,
            'planer'      => $planer,
        ]);
    }

    public function update(Request $request,Planer $planer){
        $data = $request->validate([
            'email' => ['required','email','unique:planers,email,'.$planer->id],
            'password'  => ['nullable','min:8'],
            'firstname' => ['required','string'],
            'lastname'  => ['required','string'],
            'departement'   => ['required','string'],
            'speciality'    => ['required','string'],
            'phone'         => ['required','string','unique:planers,phone,'.$planer->id],
            'is_active'     => ['required','boolean'],
            'max_supervisions'  => ['integer','required'],
        ]);
        // change information instead the password
        $planer->update([
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
            $planer->update([
                'password'  => bcrypt($data['password']),
            ]);
        }
        return response()->json([
            'success'   => true,
        ]);
    }

    public function active(Planer $planer){
        $planer->update([
            'is_active'     => true,
        ]);
        return response()->json([
            'success'   => true,
        ]);
    }

    public function destroy(Planer $planer){
        $planer->delete();
        return response()->json([
            'success'   => true,
        ]);
    }
}

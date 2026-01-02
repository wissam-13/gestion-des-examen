<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\TeacherConstraint;
use Illuminate\Http\Request;

class TeacherConstraintController extends Controller
{
    public function index(){
        $teacher_constraints = TeacherConstraint::all();
        return response()->json([
            'success'   => true,
            'teacher_constraints' => $teacher_constraints
        ]);
    }

    public function index_teacher($teacher){
        $t_consts = TeacherConstraint::where('teacher_id',$teacher)->get();
        return response()->json([
            'success'   => true,
            'teacher_constraints'   => $t_consts
        ]);
    }

    public function store(Request $request){
        $data = $request->validate([
            'teacher_id'    => ['required','exists:teachers,id'],
            'contraint_date'=> ['required','date'],
            'start_time'    => ['required','date_format:H:i'],
            'end_time'      => ['required','date_format:H:i','after:start_time'],
            'reason'        => ['required','string'],
            'is_unavailable'=> ['nullable','boolean']
        ]);

        $constraint = TeacherConstraint::create([
            'teacher_id'    => $data['teacher_id'],
            'contraint_date'=> $data['contraint_date'],
            'start_time'    => $data['start_time'],
            'end_time'      => $data['end_time'],
            'reason'        => $data['reason'],
            'is_unavailable'=> $data['is_unavailable']??true,
        ]);

        return response()->json([
            'success'   => true
        ]);
    }

    public function show(TeacherConstraint $const){
        return response()->json([
            'success'   => true,
            'constraint'=> $const
        ]);
    }

    public function update(Request $request,TeacherConstraint $const){
        $data = $request->validate([
            'teacher_id'    => ['required','exists:teachers,id'],
            'contraint_date'=> ['required','date'],
            'start_time'    => ['required','date_format:H:i'],
            'end_time'      => ['required','date_format:H:i','after:start_time'],
            'reason'        => ['required','string'],
            'is_unavailable'=> ['required','boolean']
        ]);
        $const->update([
            'teacher_id'    => $data['teacher_id'],
            'contraint_date'=> $data['contraint_date'],
            'start_time'    => $data['start_time'],
            'end_time'      => $data['end_time'],
            'reason'        => $data['reason'],
            'is_unavailable'=> $data['is_unavailable'],
        ]);

        return response()->json([
            'success'   => true,
        ]);
    }

    public function destroy(TeacherConstraint $const){
        $const->delete();
        return response()->json([
            'success'   => true,
        ]);
    }
}

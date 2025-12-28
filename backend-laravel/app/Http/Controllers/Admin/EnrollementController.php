<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Enrollment;
use App\Models\Group;
use Illuminate\Http\Request;

class EnrollementController extends Controller
{
    public function index(){
        $enrollements = Enrollment::all();
        return response()->json([
            'success'   => true,
            'enrollements'  => $enrollements
        ]);
    }

    public function index_by_group(Group $group){
        $getGroup = Enrollment::where('group_id',$group->id)->get();
        return response()->json([
            'success'   => true,
            'group'     => $group,
            'enrollements'     => $getGroup
        ]);
    }

    public function store(Request $request){
        $data = $request->validate([
            'user_id'   => ['required','integer','exists:users,id'],
            'group_id'  => ['required','integer','exists:groups,id'],
            'date_joined'    => ['required','date']
        ]);

        $enrollement = Enrollment::create([
            'user_id'   => $data['user_id'],
            'group_id'  => $data['group_id'],
            'date_joined'   => $data['date_joined']
        ]); 

        return response()->json([
            'success'   => true,
        ]);

    }

    public function show($student,$group){
        $getEnrol = Enrollment::where('user_id',$student)->where('group_id',$group)->first();
        return response()->json([
            'success'   => true,
            'enrollement'   => $getEnrol,
        ]);
    }

    public function update($student,$group,Request $request){
        $getEnrol = Enrollment::where('user_id',$student)->where('group_id',$group)->first();
        if(!$getEnrol){
            return response()->json([
                'success'   => false
            ]);
        }
        $data = $request->validate([
            'user_id'   => ['required','integer','exists:users,id'],
            'group_id'  => ['required','integer','exists:groups,id'],
            'date_joined'    => ['required','date']
        ]);

        $updated = Enrollment::where('user_id', $student)
        ->where('group_id', $group)
        ->update([
            'user_id'     => $data['user_id'],
            'group_id'    => $data['group_id'],
            'date_joined' => $data['date_joined'],
        ]);

        if ($updated === 0) {
            return response()->json(['success' => false], 404);
        }

        return response()->json(['success' => true]);
    }

    public function destroy($student,$group){
        $getEnrol = Enrollment::where('user_id',$student)->where('group_id',$group)->first();
        if(!$getEnrol){
            return response()->json([
                'success'   => false
            ]);
        }
         $updated = Enrollment::where('user_id', $student)
        ->where('group_id', $group)->delete();
        return response()->json([
            'success'   => true,
        ]);
    }
}

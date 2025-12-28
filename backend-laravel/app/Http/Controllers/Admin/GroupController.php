<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Group;
use Illuminate\Http\Request;

class GroupController extends Controller
{
    public function index(){
        $groups = Group::all();
        return response()->json([
            'success' => true,
            'groups'    => $groups
        ]);
    }

    public function store(Request $request){
        $data  = $request->validate([
            'name'  => ['required','string'],
            'level' => ['required','string'],
            'year'  => ['required','integer']
        ]);

        $group = Group::create([
            'name'  => $data['name'],
            'level' => $data['level'],
            'year'  => $data['year'],
        ]);

        return response()->json([
            'success'   => true
        ]);
    }

    public function show(Group $group){
        return response()->json([
            'success'   => true,
            'group'     => $group,
        ]);
    }

    public function update(Request $request,Group $group){
        $data  = $request->validate([
            'name'  => ['required','string'],
            'level' => ['required','string'],
            'year'  => ['required','integer']
        ]);

        $group->update([
            'name'  => $data['name'],
            'level' => $data['level'],
            'year'  => $data['year'],
        ]);

        return response()->json([
            'success'   => true,
        ]);
    }

    public function destroy(Group $group){
        $group->delete();
        return response()->json([
            'success'   => true
        ]);
    }
}

<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\AuditLog;
use App\Models\Group;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

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

        // Audit Log
        if(Auth::guard('admin')->check()){
            AuditLog::create([
                'entity'    => 'group',
                'entity_id' => $group->id,
                'action'    => 'create',
                'Performed_by_admin'    => Auth::guard('admin')->id(),
                'details'   => $group
            ]);
        }else if(Auth::guard('planer')->check()){
            AuditLog::create([
                'entity'    => 'group',
                'entity_id' => $group->id,
                'action'    => 'create',
                'Performed_by_planer'    => Auth::guard('planer')->id(),
                'details'   => $group
            ]);
        }

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

        // Audit Log
        if(Auth::guard('admin')->check()){
            AuditLog::create([
                'entity'    => 'group',
                'entity_id' => $group->id,
                'action'    => 'update',
                'Performed_by_admin'    => Auth::guard('admin')->id(),
                'details'   => $group
            ]);
        }else if(Auth::guard('planer')->check()){
            AuditLog::create([
                'entity'    => 'group',
                'entity_id' => $group->id,
                'action'    => 'update',
                'Performed_by_planer'    => Auth::guard('planer')->id(),
                'details'   => $group
            ]);
        }

        return response()->json([
            'success'   => true,
        ]);
    }

    public function destroy(Group $group){
        // Audit Log
        if(Auth::guard('admin')->check()){
            AuditLog::create([
                'entity'    => 'group',
                'entity_id' => $group->id,
                'action'    => 'delete',
                'Performed_by_admin'    => Auth::guard('admin')->id(),
                'details'   => $group
            ]);
        }else if(Auth::guard('planer')->check()){
            AuditLog::create([
                'entity'    => 'group',
                'entity_id' => $group->id,
                'action'    => 'delete',
                'Performed_by_planer'    => Auth::guard('planer')->id(),
                'details'   => $group
            ]);
        }

        $group->delete();
        return response()->json([
            'success'   => true
        ]);
    }
}

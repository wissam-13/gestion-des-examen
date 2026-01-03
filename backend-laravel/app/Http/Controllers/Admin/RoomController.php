<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\AuditLog;
use App\Models\Room;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class RoomController extends Controller
{
    public function index(){
        $rooms = Room::all();
        return response()->json([
            'success'   => true,
            'rooms'     => $rooms,
        ]); 
    }

    public function store(Request $request){
        $data = $request->validate([
            'code'  => ['required','string','unique:rooms,code'],
            'name'  => ['required','string'],
            'capacity'  => ['required','integer'],
            'room_type' => ['required','string'],
            'location'  => ['required','string'],
        ]);

        $room = Room::create([
            'code'  => $data['code'],
            'name'  => $data['name'],
            'capacity'  => $data['capacity'],
            'room_type' => $data['room_type'],
            'location'  => $data['location']
        ]);

        // Audit Log
        if(Auth::guard('admin')->check()){
            AuditLog::create([
                'entity'    => 'room',
                'entity_id' => $room->id,
                'action'    => 'create',
                'Performed_by_admin'    => Auth::guard('admin')->id(),
                'details'   => $room
            ]);
        }else if(Auth::guard('planer')->check()){
            AuditLog::create([
                'entity'    => 'room',
                'entity_id' => $room->id,
                'action'    => 'create',
                'Performed_by_planer'    => Auth::guard('planer')->id(),
                'details'   => $room
            ]);
        }

        return response()->json([
            'success' => true
        ]);
    }

    public function show(Room $room){
        return response()->json([
            'success'   => true,
            'room'  => $room
        ]);
    }

    public function update(Request $request,Room $room){
        $data = $request->validate([
            'code'  => ['required','string','unique:rooms,code,'.$room->id],
            'name'  => ['required','string'],
            'capacity'  => ['required','integer'],
            'room_type' => ['required','string'],
            'location'  => ['required','string'],
        ]);

        $room->update([
            'code'  => $data['code'],
            'name'  => $data['name'],
            'capacity'  => $data['capacity'],
            'room_type' => $data['room_type'],
            'location'  => $data['location']
        ]);

        // Audit Log
        if(Auth::guard('admin')->check()){
            AuditLog::create([
                'entity'    => 'room',
                'entity_id' => $room->id,
                'action'    => 'update',
                'Performed_by_admin'    => Auth::guard('admin')->id(),
                'details'   => $room
            ]);
        }else if(Auth::guard('planer')->check()){
            AuditLog::create([
                'entity'    => 'room',
                'entity_id' => $room->id,
                'action'    => 'update',
                'Performed_by_planer'    => Auth::guard('planer')->id(),
                'details'   => $room
            ]);
        }

        return response()->json([
            'success'   => true,
        ]);
    }

    public function destroy(Room $room){

        // Audit Log
        if(Auth::guard('admin')->check()){
            AuditLog::create([
                'entity'    => 'room',
                'entity_id' => $room->id,
                'action'    => 'delete',
                'Performed_by_admin'    => Auth::guard('admin')->id(),
                'details'   => $room
            ]);
        }else if(Auth::guard('planer')->check()){
            AuditLog::create([
                'entity'    => 'room',
                'entity_id' => $room->id,
                'action'    => 'delete',
                'Performed_by_planer'    => Auth::guard('planer')->id(),
                'details'   => $room
            ]);
        }

        $room->delete();
        return response()->json([
            'success'   => true,
        ]);
    }
}

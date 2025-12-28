<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Room;
use Illuminate\Http\Request;

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

        return response()->json([
            'success'   => true,
        ]);
    }

    public function destroy(Room $room){
        $room->delete();
        return response()->json([
            'success'   => true,
        ]);
    }
}

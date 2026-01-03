<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\AuditLog;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuditLogController extends Controller
{
    public function index(){
        $auditLogs = AuditLog::all();
        return response()->json([
            'success'   => true,
            'auditLogs' => $auditLogs
        ]);
    }

    public function index_admin(){
        $admin = Auth::guard('admin')->id();
        $auditLogsAdmin = AuditLog::where('Performed_by_admin',$admin)->get();
        return response()->json([
            'success'   => true,
            'auditLogs' => $auditLogsAdmin
        ]);
    }

    public function index_planer(){
        $planer = Auth::guard('planer')->id();
        $auditLogsPlaner = AuditLog::where('Performed_by_planer',$planer)->get();
        return response()->json([
            'success'   => true,
            'auditLogs' => $auditLogsPlaner
        ]);
    }

    public function show(AuditLog $auditlog){
        if(Auth::guard('admin')->check()){
            $admin = Auth::guard('admin')->id();
            if($auditlog->Performed_by_admin == $admin){
                return response()->json([
                    'success'   => true,
                    'auditLog'  => $auditlog
                ]);
            }
            return response()->json([
                'success'   => false
            ]);
        }else if(Auth::guard('planer')->check()){
            $planer = Auth::guard('planer')->id();
            if($auditlog->Performed_by_planer == $planer){
                return response()->json([
                    'success'   => true,
                    'auditLog'  => $auditlog
                ]);
            }
            return response()->json([
                'success'   => false
            ]);
        }
        return response()->json([
            'success'   => false
        ]);
    }

    public function destroy(AuditLog $auditlog){
        if(Auth::guard('admin')->check()){
            $admin = Auth::guard('admin')->id();
            if($auditlog->Performed_by_admin == $admin){
                $auditlog->delete();
                return response()->json([
                    'success'   => true
                ]);
            }
            return response()->json([
                'success'   => false
            ]);
        }else if(Auth::guard('planer')->check()){
            $planer = Auth::guard('planer')->id();
            if($auditlog->Performed_by_planer == $planer){
                $auditlog->delete();
                return response()->json([
                    'success'   => true
                ]);
            }
            return response()->json([
                'success'   => false
            ]);
        }
        return response()->json([
            'success'   => false
        ]);
    }

    // clear history of admin log audit
    public function destroy_admin(){
        $admin = Auth::guard('admin')->id();
        AuditLog::where('Performed_by_admin', $admin)->delete();

        return response()->json([
            'success' => true,
        ]);
    }

    // clear history of planer log audit
    public function destroy_planer(){
        $planer = Auth::guard('planer')->id();
        AuditLog::where('Performed_by_planer',$planer)->delete();
        return response()->json([
            'success'   => true
        ]);
    }
}

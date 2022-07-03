<?php

namespace App\Http\Controllers;

use App\Exports\LmsExport;
use Illuminate\Http\Request;
use Maatwebsite\Excel\Excel;

class LmsController extends Controller
{
    

    public function download(Request $request) {
        $from = $request->from;
        $to = $request->to;
        $id = $request->id;
        $type = $request->type;

        return (new LmsExport($id, $from, $to))->download('lms_reports.'.$type, Excel::strtoupper($type));

    }
}

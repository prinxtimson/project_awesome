<?php

namespace App\Http\Controllers;

use App\Exports\LmsExport;
use App\Mail\CandidateReport;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Mail;
use Maatwebsite\Excel\Excel;

class LmsController extends Controller
{
    
    public function search(Request $request)
    {
        $email = $request->email;

        $res = Http::get('https://mytritek.co.uk/wp-json/my-lpa/v1/user-progress', ['email' => $email])->throw()->json();

        return $res;
    }

    public function download(Request $request) {
        $name = $request->name;
        $email = $request->email;
        $from = $request->from;
        $to = $request->to;
        $type = $request->type;
        $date = Carbon::now()->getTimestamp();

        if($type == 'xlsx'){
            return (new LmsExport($email, $name, $from, $to))->download('lms_reports_'.$date.'.'.$type, Excel::XLSX);
        }elseif($type == 'csv'){
            return (new LmsExport($email, $name, $from, $to))->download('lms_reports_'.$date.'.'.$type, Excel::CSV);
        }elseif($type == 'pdf'){
            return (new LmsExport($email, $name, $from, $to))->download('lms_reports_'.$date.'.'.$type, Excel::MPDF);
        }elseif($type == 'html'){
            return (new LmsExport($email, $name, $from, $to))->download('lms_reports_'.$date.'.'.$type, Excel::HTML);
        }          

    }

    public function email(Request $request)
    {
        $user = auth()->user();
        $name = $request->name;
        $email = $request->email;
        $from = $request->from;
        $to = $request->to;
        $type = $request->type;
        $date = Carbon::now()->getTimestamp();

        $filename = 'lms_reports_'.$date.'.'.$type;
       
        $result = 0;

        if($type == 'xlsx'){
            $result = $this->excel->store(new LmsExport($email, $name, $from, $to), $filename, null, Excel::XLSX);
        }elseif($type == 'csv'){
            $result = $this->excel->store(new LmsExport($email, $name, $from, $to), $filename, null, Excel::CSV);
        }elseif($type == 'pdf'){
            $result = $this->excel->store(new LmsExport($email, $name, $from, $to), $filename, null, Excel::MPDF);
        }elseif($type == 'html'){
            $result = $this->excel->store(new LmsExport($email, $name, $from, $to), $filename, null, Excel::HTML);
        }

        if($result){
            try{
                Mail::to($user)->send(new CandidateReport($filename, $user));

                return ['msg' => 'Email had been sent'];
            }
            catch(\Exception $e){
                error_log($e);
                return response(['msg' => 'An error occur.'], 400);
            }

        }
        return response(['msg' => 'An error occur.'], 400);
        
    }
}

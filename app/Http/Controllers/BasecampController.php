<?php

namespace App\Http\Controllers;

use App\Actions\Basecamp\Basecamp;
use App\Exports\BasecampExport;
use App\Mail\CandidateReport;
use Carbon\Carbon;
use Exception;
use Maatwebsite\Excel\Excel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Mail;

class BasecampController extends Controller
{
    private $excel;

    public function __construct(Excel $excel)
    {
        $this->excel = $excel;
    }

    public function people()
    {

        $people = Cache::get('bc_people', []);

        return $people;
    }

    public function activities()
    {
        $basecamp = new Basecamp;
        
        $activities = $basecamp->getAllActivities();

        return $activities;
    }

    public function campfires()
    {

        $campfires = Cache::get('bc_campfires', []);

        return $campfires;
    }

    public function search(Request $request){
        $from = $request->from;
        $to = $request->to;
        $id = $request->id;

        $campfires = Cache::get('bc_campfires', []);
        $activities = Cache::get('bc_activities', []);
        //error_log($id);
        $filter_campfires = [];
        $filter_activities = [];

        foreach(array_chunk($campfires, 500) as $campfires_chunk){
            foreach($campfires_chunk as $val){
                if($val['creator']['id'] == $id){
                    if($val['created_at'] >= $from && $val['created_at'] <= $to){
                        array_push($filter_campfires, $val);
                    }  
                }
            }
        }

        foreach(array_chunk($activities, 500) as $activities_chunk){
            foreach($activities_chunk as $val){
                if($val['creator']['id'] == $id && $val['kind'] === 'question_answer_created'){
                    if($val['created_at'] >= $from && $val['created_at'] <= $to){
                        array_push($filter_activities, $val);
                    }  
                }
            }
        }

        return ['campfires' => $filter_campfires, 'activities' => $filter_activities];
    }

    public function download(Request $request) {
        $from = $request->from;
        $to = $request->to;
        $id = $request->id;
        $type = $request->type;
        $date = Carbon::now()->getTimestamp();

        if($type == 'xlsx'){
            return (new BasecampExport($id, $from, $to))->download('basecamp_reports_'.$date.'.'.$type, Excel::XLSX);
        }elseif($type == 'csv'){
            return (new BasecampExport($id, $from, $to))->download('basecamp_reports_'.$date.'.'.$type, Excel::CSV);
        }elseif($type == 'pdf'){
            return (new BasecampExport($id, $from, $to))->download('basecamp_reports_'.$date.'.'.$type, Excel::MPDF);
        }elseif($type == 'html'){
            return (new BasecampExport($id, $from, $to))->download('basecamp_reports_'.$date.'.'.$type, Excel::HTML);
        }          

    }

    public function email(Request $request)
    {
        $user = auth()->user();
        $from = $request->from;
        $to = $request->to;
        $id = $request->id;
        $type = $request->type;
        $date = Carbon::now()->getTimestamp();

        $filename = 'basecamp_reports_'.$date.'.'.$type;
       
        $result = 0;

        if($type == 'xlsx'){
            $result = $this->excel->store(new BasecampExport($id, $from, $to), $filename, null, Excel::XLSX);
        }elseif($type == 'csv'){
            $result = $this->excel->store(new BasecampExport($id, $from, $to), $filename, null, Excel::CSV);
        }elseif($type == 'pdf'){
            $result = $this->excel->store(new BasecampExport($id, $from, $to), $filename, null, Excel::MPDF);
        }elseif($type == 'html'){
            $result = $this->excel->store(new BasecampExport($id, $from, $to), $filename, null, Excel::HTML);
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
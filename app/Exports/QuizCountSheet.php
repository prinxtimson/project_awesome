<?php

namespace App\Exports;

use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\Facades\Http;
use Maatwebsite\Excel\Concerns\FromArray;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use Maatwebsite\Excel\Concerns\WithCustomStartCell;
use Maatwebsite\Excel\Concerns\WithMapping;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithEvents;
use Maatwebsite\Excel\Concerns\WithTitle;
use Maatwebsite\Excel\Events\AfterSheet;

class QuizCountSheet implements FromArray, WithMapping, ShouldAutoSize, WithHeadings, WithEvents, WithCustomStartCell, WithTitle
{
    private $name;
    private $email;
    private $from;
    private $to;

    public function __construct($email, $name, $from, $to)
    {
        $this->name = $name;
        $this->email = $email;
        $this->from = $from;
        $this->to = $to;
    }

    public function array()
    {
        $res = Http::get('https://mytritek.co.uk/wp-json/my-lpa/v1/user-progress', ['email' => $this->email])->json();
        $data = [];

        foreach($res as $val){
            $endTime = explode(' ', $val->end_time);
            $minTime = explode('T', $this->from);
            $maxTime = explode('T', $this->to);

            if($val->item_type === 'lp_lesson' && $val->status === "completed" && $endTime >= $minTime && $endTime <= $maxTime){
                array_push($data, $val);
            }
        }
        return $data;
    }

    public function map($quiz): array
    {

        return [
            $quiz['user_item_id'],
            $this->name,
            $this->email,
            $quiz['start_time'],
            $quiz['end_time'],
        ];
    }

    public function headings(): array
    {
        return [
        
            'ID',
            'Candidate Name',
            'Candidate Email',
            'Start Time',
            'End Time'
        ];
    }

    public function registerEvents(): array
    {
        return [
            AfterSheet::class => function(AfterSheet $event) {
                $event->sheet->getStyle('B3:F3')->applyFromArray([
                    'font' => [
                        'bold' => true,
                    ],
                ]);
            },
        ];
    }

    public function startCell(): string
    {
        return 'B3';
    }

    public function title(): string
    {
        return 'Quiz Report';
    }
}


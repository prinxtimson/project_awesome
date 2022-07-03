<?php

namespace App\Exports;

use Illuminate\Support\Facades\Cache;
use Maatwebsite\Excel\Concerns\FromArray;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use Maatwebsite\Excel\Concerns\WithCustomStartCell;
use Maatwebsite\Excel\Concerns\WithMapping;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithEvents;
use Maatwebsite\Excel\Concerns\WithTitle;
use Maatwebsite\Excel\Events\AfterSheet;

class CheckInsExport implements FromArray, WithMapping, ShouldAutoSize, WithHeadings, WithEvents, WithCustomStartCell, WithTitle
{
    private $from;
    private $to;
    private $id;

    public function __construct($id, $from, $to)
    {
        $this->from = $from;
        $this->to = $to;
        $this->id = $id;

    }

    public function array(): array
    {

        $activities =  Cache::get('bc_activities');

        if(is_null($activities)){
            $activities = [];
        }
        
        $filter_activities = array_filter($activities, function($val) {
            if($val['creator']['id'] == $this->id && $val['kind'] === 'question_answer_created'){
                return $val;
            }
        });

        $filter_activities = array_filter($filter_activities, function($value) {
            if($value['created_at'] >= $this->from && $value['created_at'] <= $this->to){
                return $value;
            }
        });  

        return $filter_activities;
    }

    public function map($activities): array
    {

        return [
            $activities['created_at'],
            $activities['action'],
            $activities['creator']['name'],
            $activities['creator']['email_address'],
        ];
    }

    public function headings(): array
    {
        return [
        
            'Date',
            'Action',
            'Candidate Name',
            'Email',
        ];
    }

    public function registerEvents(): array
    {
        return [
            AfterSheet::class => function(AfterSheet $event) {
                $event->sheet->getStyle('B3:E3')->applyFromArray([
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
        return 'Check Ins Report';
    }
}

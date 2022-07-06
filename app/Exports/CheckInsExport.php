<?php

namespace App\Exports;

use App\Models\Basecamp;
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

        $activities =  Basecamp::where('type', 'activities')->first();
        
        $filter_activities = [];

        foreach(array_chunk(json_decode($activities->data, true), 500) as $activities_chunk){
            foreach($activities_chunk as $val){
                if($val['creator']['id'] == $this->id){
                    if($val['created_at'] >= $this->from && $val['created_at'] <= $this->to){
                        array_push($filter_activities, $val);
                    }  
                }
            }
        }

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

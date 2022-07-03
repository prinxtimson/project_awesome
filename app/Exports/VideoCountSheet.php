<?php

namespace App\Exports;

use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Date;
use Maatwebsite\Excel\Concerns\FromArray;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use Maatwebsite\Excel\Concerns\WithCustomStartCell;
use Maatwebsite\Excel\Concerns\WithMapping;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithEvents;
use Maatwebsite\Excel\Concerns\WithTitle;
use Maatwebsite\Excel\Events\AfterSheet;

class VideoCountSheet implements FromArray, WithMapping, ShouldAutoSize, WithHeadings, WithEvents, WithCustomStartCell, WithTitle
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

    public function array()
    {

        $videos =  Cache::get('lms_videos');

        $filter_videos = array_filter(array_filter($videos, function($val) {
            if($val['creator']['id'] == $this->id){
                return $val;
            }
        }), function($value) {
            if($value['created_at'] >= $this->from && $value['created_at'] <= $this->to){
                return $value;
            }
        });

        return $filter_videos;
    }

    public function map($videos): array
    {

        return [
            Date::dateTimeToExcel($videos['created_at']),
            $videos['bucket']['name'],
            $videos['creator']['name'],
            $videos['creator']['email_address'],
        ];
    }

    public function headings(): array
    {
        return [
        
            'Date',
            'Project Name',
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
        return 'Video Report';
    }
}


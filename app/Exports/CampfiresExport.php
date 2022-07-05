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
use Maatwebsite\Excel\Concerns\Exportable;

class CampfiresExport implements FromArray, WithMapping, ShouldAutoSize, WithHeadings, WithEvents, WithCustomStartCell, WithTitle
{

    private $from;
    private $to;
    private $id;

    public function __construct($id, $from, $to)
    {
        $this->from = $from;
        $this->to = $to;
        $this->id = $id;

        // dd($this->from);
    }

    public function array(): array
    {

        $campfires =  Cache::get('bc_campfires', []);

        $filter_campfires = [];

        foreach(array_chunk($campfires, 500) as $campfires_chunk){
            foreach($campfires_chunk as $val){
                if($val['creator']['id'] == $this->id){
                    if($val['created_at'] >= $this->from && $val['created_at'] <= $this->to){
                        array_push($filter_campfires, $val);
                    }  
                }
            }
        }

        return $filter_campfires;
    }

    public function map($campfires): array
    {
         return [
            $campfires['created_at'],
            $campfires['bucket']['name'],
            $campfires['creator']['name'],
            $campfires['creator']['email_address'],
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
        return 'Campfire Report';
    }
}

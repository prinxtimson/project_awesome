<?php

namespace App\Exports;

use Maatwebsite\Excel\Concerns\Exportable;
use Maatwebsite\Excel\Concerns\WithMultipleSheets;

class BasecampExport implements WithMultipleSheets
{
    use Exportable;

    protected $from;
    protected $to;
    protected $id;

    public function __construct($id, $from, $to)
    {
        $this->from = $from;
        $this->to = $to;
        $this->id = $id;

    }

    public function sheets(): array
    {
        
        $sheets = [
            new CampfiresExport($this->id, $this->from, $this->to),
            new CheckInsExport($this->id, $this->from, $this->to),
        ];

        return $sheets;
    }
}

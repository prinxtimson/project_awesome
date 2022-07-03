<?php

namespace App\Exports;

use Maatwebsite\Excel\Concerns\Exportable;
use Maatwebsite\Excel\Concerns\WithMultipleSheets;

class LmsExport implements WithMultipleSheets
{
    use Exportable;

    private $from;
    private $to;
    private $id;

    public function __construct($id, $from, $to)
    {
        $this->from = $from;
        $this->to = $to;
        $this->id = $id;
    }

    public function sheets(): array
    {
        $sheets = [
            new VideoCountSheet($this->id, $this->from, $this->to),
            new QuizCountSheet($this->id, $this->from, $this->to),
        ];

        return $sheets;
    }
}

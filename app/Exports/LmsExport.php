<?php

namespace App\Exports;

use Maatwebsite\Excel\Concerns\Exportable;
use Maatwebsite\Excel\Concerns\WithMultipleSheets;

class LmsExport implements WithMultipleSheets
{
    use Exportable;

    private $email;
    private $name;
    private $from;
    private $to;

    public function __construct($email, $name, $from, $to)
    {
        $this->name = $name;
        $this->email = $email;
        $this->from = $from;
        $this->to = $to;
    }

    public function sheets(): array
    {
        $sheets = [
            new VideoCountSheet($this->email, $this->name, $this->from, $this->to),
            new QuizCountSheet($this->email, $this->name, $this->from, $this->to),
        ];

        return $sheets;
    }
}

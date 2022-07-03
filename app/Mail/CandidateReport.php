<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class CandidateReport extends Mailable
{
    use Queueable, SerializesModels;

    private $attachment;

    public $user;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($attachment, $user)
    {
        $this->attachment = $attachment;
        $this->user = $user;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        $subject = 'Candidate Report';

        return $this->markdown('emails.reports')->subject($subject)->attachFromStorage($this->attachment);
    }
}

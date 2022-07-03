@component('mail::message')
# Candidate Report

Hi {{ $user['name']}},

Find the attached document the report you requested for.

Thanks,<br>
{{ config('app.name') }}
@endcomponent

<?php

declare(strict_types=1);

namespace PrintDate\Test;

use PrintDate\Calendar;

class CalendarStub extends Calendar
{
    public function now(): string
    {
        return 'perro';
    }
}

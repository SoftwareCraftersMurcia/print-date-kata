<?php

namespace PrintDate\Test;

use PHPUnit\Framework\TestCase;
use PrintDate\Calendar;
use PrintDate\PrintDate;
use PrintDate\Printer;

class PrintDateTest extends TestCase
{
    /** @test */
    public function it_test_system_methods()
    {
        $date = 'perro';

        $calendarStub = $this->prophesize(Calendar::class);
        $calendarStub->now()->willReturn($date);

        $printerSpy = $this->prophesize(Printer::class);
        $printerSpy->printLine($date)->shouldBeCalled();

        $printDate = new PrintDate($printerSpy->reveal(), $calendarStub->reveal());

        $printDate->printCurrentDate();
    }
}

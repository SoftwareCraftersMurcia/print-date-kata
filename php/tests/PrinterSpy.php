<?php

declare(strict_types=1);

namespace PrintDate\Test;

use PrintDate\Printer;

class PrinterSpy extends Printer
{
    private array $calls = [];

    public function printLine(string $line)
    {
        $this->calls[] = $line;
        parent::printLine($line);
    }

    public function haveBeenCalledWith(string $line): bool
    {
        return in_array($line, $this->calls);
    }
}

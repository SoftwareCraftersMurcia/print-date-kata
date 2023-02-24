import PrintDate from "../src/print_date";
import Calendar from "../src/calendar";
import Printer from "../src/printer";

describe("Print date behaviour", () => {
  it("date is printed on the console", () => {
    const calendar = new Calendar();
    const printer = new Printer();
    const printDate = new PrintDate(calendar, printer);
    printDate.printCurrentDate();
  });

  it("check that Calendar today is called", () => {
    const spy = jest.spyOn(Calendar.prototype, "today");
    spy.mockReturnValue(new Date("2020-01-01"));
    const calendar = new Calendar();
    const printer = new Printer();
    const printDate = new PrintDate(calendar, printer);
    printDate.printCurrentDate();
    expect(spy).toHaveBeenCalled();
  });

  it("check that Printer printLine is called", () => {
    const spy = jest.spyOn(Printer.prototype, "printLine");
    const calendar = new Calendar();
    const printer = new Printer();
    const printDate = new PrintDate(calendar, printer);
    printDate.printCurrentDate();
    expect(spy).toHaveBeenCalled();
  });

  it("check that Printer printLine is called with the right argument", () => {
    const mockedDate = new Date("2020-01-01");
    const spyPrinter = jest.spyOn(Printer.prototype, "printLine");
    const spyCalendar = jest.spyOn(Calendar.prototype, "today");
    spyCalendar.mockReturnValue(mockedDate);
    const calendar = new Calendar();
    const printer = new Printer();
    const printDate = new PrintDate(calendar, printer);
    printDate.printCurrentDate();
    expect(spyPrinter).toHaveBeenCalledWith(mockedDate.toString());
  });

  it("check that Calendar today is called. No library", () => {
    const calendar = new FakeCalendar();
    const printer = new Printer();
    const printDate = new PrintDate(calendar, printer);
    printDate.printCurrentDate();
    const timesCalled = calendar.getTimesCalled();
    expect(timesCalled).toBe(1);
  });

  it("check that Printer printLine is called. No library", () => {
    const calendar = new Calendar();
    const printer = new FakePrinter();
    const printDate = new PrintDate(calendar, printer);
    printDate.printCurrentDate();
    const timesCalled = printer.getTimesCalled();
    expect(timesCalled).toBe(1);
  });

  it("check value passed to printLine. No library", () => {
    const mockedDate = new Date("2020-01-01");
    const calendar = new FakeCalendar(mockedDate);
    const printer = new FakePrinter();
    const printDate = new PrintDate(calendar, printer);
    printDate.printCurrentDate();
    const lastLine = printer.getLastLine();
    expect(lastLine).toBe(mockedDate.toString());
  });
});

class FakeCalendar implements Calendar {
  timesCalled: number = 0;
  mockedDate: Date;
  constructor(mockedDate: Date = new Date("2020-01-01")) {
    this.mockedDate = mockedDate;
  }

  getTimesCalled(): number {
    return this.timesCalled;
  }

  today(): Date {
    this.timesCalled++;
    return this.mockedDate;
  }
}

class FakePrinter implements Printer {
  timesCalled: number = 0;
  lastLine: string = "";
  getTimesCalled(): number {
    return this.timesCalled;
  }
  getLastLine(): string {
    return this.lastLine;
  }
  printLine(line: string): void {
    this.timesCalled++;
    this.lastLine = line;
  }
}

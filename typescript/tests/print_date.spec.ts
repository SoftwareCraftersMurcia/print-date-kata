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
});

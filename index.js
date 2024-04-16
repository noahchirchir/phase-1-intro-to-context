function createEmployeeRecord(employeeData) {
    return {
      firstName: employeeData[0],
      familyName: employeeData[1],
      title: employeeData[2],
      payPerHour: employeeData[3],
      timeInEvents: [],
      timeOutEvents: []
    };
  }
  
  function createEmployeeRecords(employeesData) {
    return employeesData.map(createEmployeeRecord);
  }
  
  function createTimeInEvent(employee, dateTime) {
    const [date, hour] = dateTime.split(' ');
    employee.timeInEvents.push({
      type: "TimeIn",
      hour: parseInt(hour),
      date: date
    });
    return employee;
  }
  
  function createTimeOutEvent(employee, dateTime) {
    const [date, hour] = dateTime.split(' ');
    employee.timeOutEvents.push({
      type: "TimeOut",
      hour: parseInt(hour),
      date: date
    });
    return employee;
  }
  
  function hoursWorkedOnDate(employee, date) {
    const timeIn = employee.timeInEvents.find(event => event.date === date);
    const timeOut = employee.timeOutEvents.find(event => event.date === date);
    if (!timeIn || !timeOut) return 0;
    return (timeOut.hour - timeIn.hour) / 100;
  }
  
  function wagesEarnedOnDate(employee, date) {
    const hoursWorked = hoursWorkedOnDate(employee, date);
    if (!hoursWorked) return 0;
    return hoursWorked * employee.payPerHour;
  }
  
  function allWagesFor(employee) {
    return employee.timeInEvents.reduce((totalWages, timeInEvent) => {
      const wages = wagesEarnedOnDate(employee, timeInEvent.date);
      return totalWages + wages;
    }, 0);
  }
  
  function calculatePayroll(employees) {
    return employees.reduce((totalPayroll, employee) => {
      return totalPayroll + allWagesFor(employee);
    }, 0);
  }
  
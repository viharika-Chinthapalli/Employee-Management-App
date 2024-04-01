const validateEmployeeId = (employeeId) => {
    if (!employeeId) {
        return 'Employee ID is required';
    }
    return null;
};

const validateTimesheetData = (data) => {
    const {employeeId, weekStartDate, hoursWorked, documents} = data;
    if (!employeeId) {
        return 'Employee ID is required';
    }
    if (!weekStartDate) {
        return 'Week start date is required';
    }
    if (!hoursWorked) {
        return 'Hours worked is required';
    }
    if (!documents || !Array.isArray(documents)) {
        return 'Documents must be an array';
    }
    return null;
};

module.exports = {
    validateEmployeeId,
    validateTimesheetData
};

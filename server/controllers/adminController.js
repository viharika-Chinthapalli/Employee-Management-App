
const Employee = require('../models/Employee');
const Timesheet = require('../models/Timesheet');
const LeaveRequest = require('../models/leaveRequest');
const shortLeaveRequest = require('../models/shortLeaveRequest');

const {validateEmployeeData, validateEmployeeId, validateTimesheetId} = require('../validations/employeeValidations');

exports.addEmployee = async (req, res, next) => {
    try {
        validateEmployeeData(req, res, async () => {
            const {
                name,
                email,
                team,
                role,
                dateOfJoining,
                dateOfBirth,
                phoneNumber,
                password,
                picture
            } = req.body;
            const existingEmployee = await Employee.findOne({email});
            if (existingEmployee) {
                return res.status(409).json({error: 'Email already exists in the database.'});
            }
            const employee = new Employee({
                name,
                email,
                team,
                role,
                dateOfJoining,
                dateOfBirth,
                phoneNumber,
                password,
                picture
            });
            employee.save().then(() => res.status(201).json(employee)).catch(next);
        });
    } catch (error) {
        next(error);
    }
};


exports.updateEmployee = async (req, res, next) => {
    try {
        const {name, team} = req.body;
        const {employeeId} = req.params;
        validateEmployeeId(req, res, () => {
            Employee.findByIdAndUpdate(employeeId, {
                name,
                team
            }, {new: true}).then(employee => {
                if (!employee) {
                    return res.status(404).json({message: 'Employee not found'});
                }
                res.json(employee);
            }).catch(next);
        });
    } catch (error) {
        next(error);
    }
};

exports.deleteEmployee = async (req, res, next) => {
    try {
        const {employeeId} = req.params;
        validateEmployeeId(req, res, () => {
            Employee.findByIdAndDelete(employeeId).then(employee => {
                if (!employee) {
                    return res.status(404).json({message: 'Employee not found'});
                }
                res.json(employee);
            }).catch(next);
        });
    } catch (error) {
        next(error);
    }
};

exports.getAllEmployees = async (req, res, next) => {
    try {
        Employee.find().then(employees => res.json(employees)).catch(next);
    } catch (error) {
        next(error);
    }
};

exports.getAllTimesheets = async (req, res, next) => {
    try {
        Timesheet.find().then(timesheets => res.json(timesheets)).catch(next);
    } catch (error) {
        next(error);
    }
};

exports.getAllLeaverequest = async (req, res, next) => {
    try {
        const leaverequest = await LeaveRequest.find();
        res.json(leaverequest);
    } catch (error) {
        next(error);
    }
};

exports.approveLeaverequest = async (req, res, next) => {
    try {
        const {leaverequestId} = req.params;

        const leaverequest = await LeaveRequest.findByIdAndUpdate(leaverequestId, {
            status: "approve"
        }, {new: true});

        if (! leaverequest) {
            return res.status(404).json({message: 'leaverequest not found'});
        }

        res.json(leaverequest);
    } catch (error) {
        next(error);
    }
};

exports.rejectLeaveRequest = async (req, res, next) => {
    try {
        const { leaverequestId } = req.params;

        const leaverequest = await LeaveRequest.findByIdAndUpdate(leaverequestId, {
            status: "reject"
        }, { new: true });

        if (!leaverequest) {
            return res.status(404).json({ message: 'Leave request not found' });
        }

        res.json(leaverequest);
    } catch (error) {
        next(error);
    }
};

exports.getAllshortLeaverequest = async (req, res, next) => {
    try {
        const shortleaverequest = await shortLeaveRequest.find();
        res.json(shortleaverequest);
    } catch (error) {
        next(error);
    }
};

exports.approveshortLeaverequest = async (req, res, next) => {
    try {
        const {shortleaverequestId} = req.params;
        const shortleaverequest = await shortLeaveRequest.findByIdAndUpdate(shortleaverequestId, {
            status: "approve"
        }, {new: true});
        if (! shortleaverequest) {
            return res.status(404).json({message: 'shortleaverequest not found'});
        }
        res.json(shortleaverequest);
    } catch (error) {
        next(error);
    }
};

exports.rejectshortLeaverequest = async (req, res, next) => {
    try {
        const { shortleaverequestId } = req.params;
        const shortLeaverequest = await shortLeaveRequest.findByIdAndUpdate(shortleaverequestId, {
            status: "reject"
        }, { new: true });
        
        if (!shortLeaverequest) {
            return res.status(404).json({ message: 'shortLeaverequest not found' });
        }

        res.json(shortLeaverequest);
    } catch (error) {
        next(error);
    }
};


exports.approveTimesheet = async (req, res, next) => {
    try {
        const {timesheetId} = req.params;
        const timesheet= await Timesheet.findByIdAndUpdate(timesheetId, {
            status: "approved"
        }, {new: true});
        if (! timesheet) {
            return res.status(404).json({message: 'timesheet not found'});
        }
        res.json(timesheet);
    } catch (error) {
        next(error);
    }
};

exports.rejectTimesheet = async (req, res, next) => {
    try {
        const { timesheetId } = req.params;
        const timesheet = await Timesheet.findByIdAndUpdate(timesheetId, {
            status: "rejected"
        }, { new: true });
        if (!timesheet) {
            return res.status(404).json({ message: 'Timesheet not found' });
        }

        res.json(timesheet);
    } catch (error) {
        next(error);
    }
};

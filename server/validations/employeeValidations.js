exports.validateEmployeeData = (req, res, next) => {
    const { name, email, team, role, dateOfJoining, dateOfBirth, phoneNumber, password } = req.body;

    if (!name) {
        return res.status(400).json({ message: 'name is required' });
    }

    if (!email) {
        return res.status(400).json({ message: 'email is required' });
    }

    if (!team) {
        return res.status(400).json({ message: 'team is required' });
    }

    if (!role) {
        return res.status(400).json({ message: 'role is required' });
    }

    if (!dateOfJoining) {
        return res.status(400).json({ message: 'dateOfJoining is required' });
    }

    if (!dateOfBirth) {
        return res.status(400).json({ message: 'dateOfBirth is required' });
    }

    if (!phoneNumber) {
        return res.status(400).json({ message: 'phoneNumber is required' });
    }

    if (!password) {
        return res.status(400).json({ message: 'password is required' });
    }

    if (!isValidPhoneNumber(phoneNumber)) {
        return res.status(400).json({ message: 'Invalid phone number format' });
    }

    next();
};

exports.validateEmployeeId = (req, res, next) => {
    const { employeeId } = req.params;
    if (!isValidObjectId(employeeId)) {
        return res.status(400).json({ message: 'Invalid employeeId' });
    }
    next();
};

exports.validateTimesheetId = (req, res, next) => {
    const { timesheetId } = req.params;
    if (!isValidObjectId(timesheetId)) {
        return res.status(400).json({ message: 'Invalid timesheetId' });
    }
    next();
};

function isValidPhoneNumber(phoneNumber) {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phoneNumber);
}

function isValidObjectId(id) {
    const objectIdRegex = /^[0-9a-fA-F]{24}$/;
    return objectIdRegex.test(id);
}
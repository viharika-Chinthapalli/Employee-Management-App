const express = require('express');
const employeeController = require('../controllers/employeeController');
const router = express.Router();

router.get('/:employeeId', employeeController.getEmployeeProfile);
router.put('/update/:employeeId', employeeController.editEmployee);
router.put('/resetpassword',employeeController.resetPassword);
router.post('/leaverequest',employeeController.submitLeaveRequest);
router.get('/:employeeId/leaverequest',employeeController.getEachLeaveRequests);
router.post('/shortleaverequest',employeeController.submitshortLeaveRequest);
router.get('/:employeeId/shortleaverequest',employeeController.getEachshortLeaveRequests);
router.post('/timesheets', employeeController.submitTimesheet);
router.get('/:employeeId/timesheets', employeeController.getEmployeeTimesheets);
router.get('/:employeeId/timesheets/:year', employeeController.getEmployeeTimesheetsByYear);
router.get('/:employeeId/timesheets/:year/:month',employeeController.getEmployeeTimesheetsByMonth);
router.get('/:employeeId/timesheets/:year/:month/:week', employeeController.getEmployeeTimesheetsByWeek);
router.get('/:employeeId/timesheets/:year/:month/:week/:date', employeeController.getEmployeeTimesheetsByDate);

module.exports = router;
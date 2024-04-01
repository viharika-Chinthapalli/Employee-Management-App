const express = require('express');
const adminController = require('../controllers/adminController');
const employeeController=require('../controllers/employeeController')
const router = express.Router();

router.post('/', adminController.addEmployee);
router.put('/:employeeId', adminController.updateEmployee);
router.delete('/:employeeId', adminController.deleteEmployee);
router.get('/', adminController.getAllEmployees);
router.get('/leaverequest', adminController.getAllLeaverequest);
router.put('/leaverequest/:leaverequestId/approve', adminController.approveLeaverequest);
router.put('/leaverequest/:leaverequestId/reject', adminController.rejectLeaveRequest);
router.get('/shortleaverequest',adminController.getAllshortLeaverequest);
router.put('/shortleaverequest/:shortleaverequestId/approve',adminController.approveshortLeaverequest);
router.put('/shortleaverequest/:shortleaverequestId/reject',adminController.rejectshortLeaverequest);
router.get('/timesheets', adminController.getAllTimesheets);
router.put('/timesheets/:timesheetId/approve', adminController.approveTimesheet);
router.put('/timesheets/:timesheetId/reject', adminController.rejectTimesheet);
router.get('/:employeeId/timesheets/:year', employeeController.getEmployeeTimesheetsByYear);
router.get('/:employeeId/timesheets/:year/:month',employeeController.getEmployeeTimesheetsByMonth);
router.get('/:employeeId/timesheets/:year/:month/:week', employeeController.getEmployeeTimesheetsByWeek);
router.get('/:employeeId/timesheets/:year/:month/:week/:date', employeeController.getEmployeeTimesheetsByDate);
module.exports = router;
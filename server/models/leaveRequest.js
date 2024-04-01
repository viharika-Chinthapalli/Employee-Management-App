const mongoose = require('mongoose');
const leaveRequestSchema = new mongoose.Schema({
  employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee',
    required: true,
  },
  employeeName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    required: true,
  },
  fromDate: {
    type: Date,
    required: true,
  },
  toDate: {
    type: Date,
    required: true,
  },
  reason: {
    type: String,
    required: true,
  },
  leaveType: {
    type: String,
    default:'long',
    required: true,
  }
});
const Leaverequest = mongoose.model('LeaveRequest', leaveRequestSchema);
module.exports = Leaverequest;
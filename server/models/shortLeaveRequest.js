const mongoose = require('mongoose');
const shortleaveRequestSchema = new mongoose.Schema({
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
  leaveType: {
    type: String,
    default:'short',
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  fromTime: {
    type: String,
    required: function () {
      return this.leaveType === 'short'; 
    },
  },
  toTime: {
    type: String,
    required: function () {
      return this.leaveType === 'short'; 
  }},
  reason: {
    type: String,
    required: true,
  },
});
const shortLeaveRequest = mongoose.model('shortLeaveRequest', shortleaveRequestSchema);
module.exports = shortLeaveRequest;
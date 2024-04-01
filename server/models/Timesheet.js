const mongoose = require('mongoose');

const timesheetSchema = new mongoose.Schema({
    employeeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee',
        required: true
    },
    employeeName:{
       type:String,
       required:true
    },
    status: {
        type: String,
        enum: [
            'pending', 'approved', 'rejected'
        ],
        required: true
    },
   // year: { type: Number, required: true },
    //month: { type: Number, required: true },
    //week: { type: String, required: true },
    date: { type: Date, required: true },
    fromTime:{type: String,required:true},
    toTime:{type: String,required:true},
    documents: { type: [String],required:true }, 
    notes: { type: String,required:true},
    timeDifference: { type: String,required:true}

});

module.exports = mongoose.model('Timesheet', timesheetSchema);
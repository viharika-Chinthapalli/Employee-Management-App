const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const employeeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    team: {
        type: String,
        required: true
    },
    role:{
        type:String,
        required:true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    dateOfBirth: {
        type: Date,
        required: true
    },
    dateOfJoining: {
        type: Date,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    picture:{
        type:String,
    }
});

employeeSchema.pre('save', async function (next) {
    try {
      if (!this.isModified('password')) return next();
      const saltRounds = 10; 
      const hashedPassword = await bcrypt.hash(this.password, saltRounds);
      this.password = hashedPassword;
      next();
    } catch (err) {
      next(err);
    }
  });

module.exports = mongoose.model('Employee', employeeSchema);
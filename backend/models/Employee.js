const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: String,
  email: String,
  department: {
    type: String,
    enum: ["IT", "Sales", "HR", "Finance", "Marketing"],
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  salary: {
    type: Number,
    required: true,
  },
  hire_date: {
    type: Date,
    required: true,
  },
  job_title: {
    type: String,
    required: true,
  },
});


module.exports = mongoose.model('Employee', employeeSchema);

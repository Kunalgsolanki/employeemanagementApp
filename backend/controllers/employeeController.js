const Employee = require('../models/Employee');

exports.getAllEmployees = async (req, res) => {
  const employees = await Employee.find();
  res.json(employees);
};
exports.addEmployee = async (req, res) => {
  const newEmployee = new Employee(req.body);
  await newEmployee.save();
  res.status(201).json(newEmployee);
};

exports.updateEmployee = async (req, res) => {
  const updated = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
};

exports.deleteEmployee = async (req, res) => {
  await Employee.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted successfully' });
};

const Employee = require('../Model/userMode');

exports.getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.render('index', { employees });
  } catch (err) {
    res.status(500).send('Error fetching employees');
  }
};

exports.addEmployee = async (req, res) => {
    const { firstName, lastName, email, department, salary } = req.body;
    try {
      const newEmployee = new Employee({ firstName, lastName, email, department, salary });
      await newEmployee.save();
      res.redirect('/');
    } catch (err) {
      res.status(500).send('Error adding employee');
    }
  };
  exports.editEmployee = async (req, res) => {
    const { id } = req.params;
    try {
      const employee = await Employee.findById(id);
      res.render('editEmployee', { employee });
    } catch (err) {
      res.status(500).send('Error fetching employee');
    }
  };

  exports.updateEmployee = async (req, res) => {
    const { id } = req.params;
    const { firstName, lastName, email, department, salary } = req.body;
    try {
      await Employee.findByIdAndUpdate(id, { firstName, lastName, email, department, salary });
      res.redirect('/');
    } catch (err) {
      res.status(500).send('Error updating employee');
    }
  };
  exports.deleteEmployee = async (req, res) => {
    const { id } = req.params;
    try {
      await Employee.findByIdAndDelete(id);
      res.redirect('/');
    } catch (err) {
      res.status(500).send('Error deleting employee');
    }
  };
const employeeController = {};

import employeeModel from "../models/employees.js";

employeeController.getEmployees = async (req, res) => {
    const employees = await employeeModel.find();
    res.json(employees);
};

employeeController.insertEmployees = async (req, res) => {
    const { name, lastName, salary, DUI, phone, email, password, branchId} = req.body;
    const newEmployee = new employeeModel({
        name,
        lastName,
        salary,
        DUI,
        phone,
        email,
        password,
        branchId
    });

    await newEmployee.save();

    res.json({message: "Employee Saved"});
};

employeeController.deleteEmployee = async (req, res) => {
    await employeeModel.findByIdAndDelete(req.params.id);
    res.json({message: "Employee deleted"})
};

employeeController.updateEmployee = async (req, res) => {
    const { name, lastName, salary, DUI, phone, email, password, branchId} = req.body;
    await employeeModel.findByIdAndUpdate(req.params.id, {
            name,
            lastName,
            salary,
            DUI,
            phone,
            email,
            password,
            branchId
        }, {
            new: true
        },
    );

    res.json({message: "Employee Saved"});
}

export default employeeController;
const employeeController = {};

import employeeModel from "../models/employees.js";

employeeController.getEmployees = async (req, res) => {
    const employees = await employeeModel.find();
    res.json(employees);
};

employeeController.deleteEmployee = async (req, res) => {
    await employeeModel.findByIdAndDelete(req.params.id);
    res.json({message: "Employee deleted"})
};

employeeController.updateEmployee = async (req, res) => {
    const { name, lastName, salary, DUI, phone, email, password, branchId, isVerified} = req.body;
    await employeeModel.findByIdAndUpdate(req.params.id, {
            name,
            lastName,
            salary,
            DUI,
            phone,
            email,
            password,
            branchId,
            isVerified
        }, {
            new: true
        },
    );

    res.json({message: "Employee Saved"});
}

export default employeeController;
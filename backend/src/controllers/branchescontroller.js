const branchesController = {};

import branchesModel from "../models/branches.js";

branchesController.getBranches = async (req, res) => {
    const branches = await branchesModel.find()
    res.json(branches);
}

branchesController.insertBranches = async (req, res) => {
    const { name, address, schedule, isActive } = req.body;
    const newBranch = new branchesModel({name, address, schedule, isActive})
    await newBranch.save();
    res.json({message: "Sucursal insertada correctamente"});
}

branchesController.deleteBranches = async (req, res) => {
    await branchesModel.findByIdAndDelete(req.params.id)
    res.json({message: "Sucursal eliminada correctamente"});
}

branchesController.updateBranches = async (req, res) => {
    const { name, address, schedule, isActive } = req.body;
    await branchesModel.findByIdAndUpdate(req.params.id, {name, address, schedule, isActive}, {new: true})
    res.json({message: "Sucursal actualizada correctamente"});
}

export default branchesController;
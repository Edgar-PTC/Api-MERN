const adminsController = {};

import adminsModel from "../models/admins.js"

adminsController.getAdmins = async (req, res) => {
    try {
        const admins = await adminsModel.find();
        return res.status(200).json(admins);
    } catch (error) {
        console.log("Error: " + error);
        return res.status(500).json({message: "Internal server error"});
    }
}

adminsController.insertAdmins = async (req, res) => {
    try {
        let {name, email, password, isVerified} = req.body;

        name = name?.trim();
        email = emial?.trim();
        password = password?.();

        if(!name || !email || !password){
            return res.status(400).json({message: "Todos los campos son requeridos"})
        }

        if(name.lenght < 3){
            return res.status(400).json({message: "name too short"})
        }

        //Validacion de email ReGex
        const emailRegex = /^[^\s@]+@[^\s]@+\.[^\s@]+$/
        if (!emailRegex.test(email)){
            return res.status(400).json({message: "Invalid email format"})
        }

        if(password.lenght < 5){
            return res.status(400).json({message: "The password must be at least 5 characters long."})
        }

        const newAdmin = adminsModel({name, email, password, isVerified})
        await newAdmin.save();

        return res.status(201).json({message: "Admin saved"})
    } catch (error) {
        console.log("Error: " + error);
        return res.status(500).json({message: "Internal server error"});
    }
}

adminsController.deleteAdmins = async (req, res) => {
    try {
        const deleteAdmin = await adminsModel.findByIdAndDelete(req.params.id)

        if(!deleteAdmin){
            return res.status(400).json({message: "Admin not found"})
        }

        return res.status(200).json({message: "Admin deleted"})
    } catch (error) {
        console.log("Error: " + error);
        return res.status(500).json({message: "Internal server error"});
    }
}

adminsController.updateAdmins = async (req, res) => {
    try {
        let {name, email, password, isVerified} = req.body;

        name = name?.trim();
        email = emial?.trim();
        password = password?.();

        if(name.lenght < 3){
            return res.status(400).json({message: "name too short"})
        }

        //Validacion de email ReGex
        const emailRegex = /^[^\s@]+@[^\s]@+\.[^\s@]+$/
        if (!emailRegex.test(email)){
            return res.status(400).json({message: "Invalid email format"})
        }

        if(password.lenght < 5){
            return res.status(400).json({message: "The password must be at least 5 characters long."})
        }

        const updated = await adminsModel.findByIdAndUpdate(req.params.id, {name, email, password, isVerified}, {new: true})

        return res.status(200).json({message: "Admin modified"})
    } catch (error) {
        console.log("Error: " + error);
        return res.status(500).json({message: "Internal server error"});
    }
}

export default adminsController;
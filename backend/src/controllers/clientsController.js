const clientsController = {};

import clientsModel from "../models/clients.js";

clientsController.getClients = async (req, res) => {
    try {
        const clients = await clientsModel.find();
        return res.status(200).json(clients);
    } catch (error) {
        console.log("Error: " + error);
        return res.status(500).json({message: "Internal server error"});
    }
}

clientsController.deleteClients = async (req, res) => {
    try {
        const deleteClient = await clientsModel.findByIdAndDelete(req.params.id)

        if(!deleteClient){
            return res.status(400).json({message: "Client not found"})
        }
        
        return res.status(200).json({message: "Client deleted"})
    } catch (error) {
        console.log("Error: " + error);
        return res.status(500).json({message: "Internal server error"});
    }
}

clientsController.updateClients = async (req, res) => {
    try {
        let {name, lastname, email, password, birthday, status, isVerified, loginAttemps, timeOut} = req.body;
        
        name = name?.trim();
        lastname = lastname?.trim();
        email = email?.trim();
        password = password?.trim();

        if(!name || !lastname || !email || !password){
            return res.status(400).json({message: "Todos los campos son requeridos"})
        }

        if(birthday >= Date.now()){
            return res.status(400).json({message: "la fecha no puede ser hoy o una en un futuro"})
        }

        if(name.lenght < 3){
            return res.status(400).json({message: "name too short"})
        }

        if(lastname.lenght < 3){
            return res.status(400).json({message: "lastname too short"})
        }

        //Validacion de email ReGex
        const emailRegex = /^[^\s@]+@[^\s]@+\.[^\s@]+$/
        if (!emailRegex.test(email)){
            return res.status(400).json({message: "Invalid email format"})
        }

        if(password.lenght < 5){
            return res.status(400).json({message: "The password must be at least 5 characters long."})
        }

        const updateClient = await clientsModel.findByIdAndUpdate(req.params.id, {name, lastname, email, password, birthday, status, isVerified, loginAttemps, timeOut}, {new: true})

        if(!updateClient){
            return res.status(404).json({message: "Customer not found"})
        }

        return res.status(200).json({message: "Client modified"})
    } catch (error) {
        console.log("Error: " + error);
        return res.status(500).json({message: "Internal server error"});
    }
}

export default clientsController;
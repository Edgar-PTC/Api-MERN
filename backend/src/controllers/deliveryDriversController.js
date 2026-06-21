import deliverDrivers from "../models/deliverDrivers.js";

import { v2 as Cloudinary } from "cloudinary"

const deliveryDriversController = {};

deliveryDriversController.getAllDrivers = async(req, res) => {
    try {
        const drivers = await deliverDrivers.find();
        return res.status(200).json(drivers);
    } catch (error) {
        console.log("Error: " + error);
        return res.status(500).json({message: "Internal server error"});
    }
}

deliveryDriversController.insert = async(req, res) => {
    try {
        const { name, phone, cars } = req.body;

        const newDriver = new deliverDrivers({
            name,
            phone,
            image: req.file.path,
            public_id: req.file.filename,
            cars,
            isActive: true
        });

        await newDriver.save();
        return res.status(200).json({ message: "Driver saved successfully" })
    } catch (error) {
        console.log("Error: " + error);
        return res.status(500).json({message: "Internal server error"});
    }
}

deliveryDriversController.deleted = async(req, res) => {
    try {
        const driverFound = await deliverDrivers.findById(req.params.id);

        await Cloudinary.uploader.destroy(driverFound.public_id)

        await deliverDrivers.findByIdAndDelete(re.params.id)
        return res.status(200).json({ message: "Driver deleted successfully" })
    } catch (error) {
        console.log("Error: " + error);
        return res.status(500).json({message: "Internal server error"});
    }
}

deliveryDriversController.updateDriver = async(req, res) => {
    try {
        //Solicito los nuevos datos
        const {name, phone, cars, isActive} = req.body;
 
 
        //Identificar el repartidor a actualizar
        const driverFound = await deliverDrivers.findById(req.params.id)
 
        const updateDriver = {
            name, phone, cars, isActive
        }
 
        //En caso de que actualizen la imagen
        if(req.file){
 
            //Eliminamos la imagen ya existente
            await cloudinary.uploader.destroy(driverFound.public_id)
 
            updateData.image = req.file.path,
            updateData.public_id = req.file.filename
 
        }
 
        //Guardamos todo en la base de datos
        await deliverDrivers.findByIdAndUpdate(
            req.params.id,
            updateData,
            {new: true}
        )
 
        return res.status(200).json({message: "Dirver updated"})
    } catch (error) {
        console.log("error" + error)
        return res.status(500).json({message: "Internal server error"})
    }
}

export default deliveryDriversController;
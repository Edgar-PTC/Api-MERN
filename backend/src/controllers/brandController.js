const brandController = {};

import brandsModel from "../models/brands.js";

brandController.getBrands = async (req, res) => {
    try {
        const brands = await brandsModel.find();
        return res.status(200).json(brands);
    } catch (error) {
        console.log("Error: " + error);
        return res.status(500).json({message: "Internal server error"});
    }
}

brandController.insertBrands = async (req, res) => {
    try {
        let {name, slogan, address, isActive} = req.body;

        name = name?.trim();
        slogan = slogan?.trim();
        address = address?.trim();

        if(!name || !slogan || !address){
            return res.status(400).json({message: "Todos los campos son requeridos"})
        }

        if(name.lenght < 3){
            return res.status(400).json({message: "name too short"})
        }

        if(address.lenght < 100){
            return res.status(400).json({message: "address too short"})
        }

        const newBrand = brandsModel({name, slogan, address, isActive})
        await newBrand.save()

        return res.status(201).json({message: "Brand saved"})
    } catch (error) {
        console.log("Error: " + error);
        return res.status(500).json({message: "Internal server error"});
    }
}

brandController.deleteBrands = async (req, res) => {
    try {
        const deleteBrand = await brandsModel.findByIdAndDelete(req.params.id)

        if(!deleteBrand){
            return res.status(404).json({message: "Brand not found"})
        }

        return res.status(200).json({message: "Brand deleted"})
    } catch (error) {
        console.log("Error: " + error);
        return res.status(500).json({message: "Internal server error"});
    }
}

brandController.updateBrands = async (req, res) => {
    try {
        let {name, slogan, address, isActive} = req.body;

        name = name?.trim();
        slogan = slogan?.trim();
        address = address?.trim();

        if(name.lenght < 3){
            return res.status(400).json({message: "name too short"})
        }

        if(address.lenght < 100){
            return res.status(400).json({message: "address too short"})
        }

        const  updated = await brandsModel.findByIdAndUpdate(req.params.id, {
            name, slogan, address, isActive
        },
        {new: true}
    )

        return res.status(400).json({message: "Brand updated"})
    } catch (error) {
        console.log("Error: " + error);
        return res.status(500).json({message: "Internal server error"});
    }
}

export default brandController;
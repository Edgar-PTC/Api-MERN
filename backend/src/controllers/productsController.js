const productsController = {};

import productsModel from "../models/products.js";

productsController.getProducts = async (req, res) => {
    const products = await productsModel.find()
    res.json(products);
}

productsController.insertProducts = async (req, res) => {
    /*Solicitamos los campos del producto*/
    const { name, price, description, stock } = req.body;

    /* crea una constante para guardar los campos*/
    const newProduct = new productsModel({name, price, description, stock})

    await newProduct.save()

    res.json({message: "Producto insertado correctamente"});
}

productsController.deleteProducts = async (req, res) => {
    await productsModel.findByIdAndDelete(req.params.id)
    res.json({message: "Producto eliminado correctamente"});
}

productsController.updateProducts = async (req, res) => {
    //Solicitamos los campos del producto
    const { name, price, description, stock } = req.body;

    //Promesa de buscar el producto por su id y actualizarlo con los nuevos datos
    await productsModel.findByIdAndUpdate(req.params.id, {name, price, description, stock}, {new: true})

    res.json({message: "Producto actualizado correctamente"});
}

productsController.getProductById = async (req, res) => {
    try {
        const productBy = await productsModel.findById(req. params.id);
        if(!productBy){
            return res.status(400).json({message: "product not found"})
        }
        return res.status(200).json(productBy);
    } catch (error) {
        console.log("Error: " + error);
        return res.status(500).json({message: "Internal server error"});
    }
}

productsController.searchByName = async (req, res) => {
    try {
        let { name } = req.body;

        const productsByName = await productsModel.find({
            name: { $regex: name, $options: "i"}
        })

        if(!productsByName){
            return res.status(400).json({message: "not found"})
        }

        return res.status(200).json(productsByName);
    } catch (error) {
        console.log("Error: " + error);
        return res.status(500).json({message: "Internal server error"});
    }
}

productsController.getLowStock = async(req, res) => {
    try {
        const products = await productsModel.find({stock: { $lt: 5 }})
        if(!products){
            return res.status(400).json({message: "Not products with low stock"})
        }

        return res.status(200).json(products);
    } catch (error) {
        console.log("Error: " + error);
        return res.status(500).json({message: "Internal server error"});
    }
}

productsController.getProductsByPriceRange = async (req, res) => {
    try {
        const { min, max } = req.body;

        const products = await productsModel.find({
            price: { $gte: min, $lte: max}
        })

        if(!products){
            return res.status(400).json({ message: "" })
        }

        return res.status(200).json(products)
    } catch (error) {
        console.log("Error: " + error);
        return res.status(500).json({message: "Internal server error"});
    }
}

productsController.countProducts = async(req, res) => {
    try {
        const count = await productsModel.countDocuments();

        return res.status(200).json(count);
    } catch (error) {
        console.log("Error: " + error);
        return res.status(500).json({message: "Internal server error"});
    }
}

export default productsController;
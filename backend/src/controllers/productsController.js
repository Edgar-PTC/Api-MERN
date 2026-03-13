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

export default productsController;
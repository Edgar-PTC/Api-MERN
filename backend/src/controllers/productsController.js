const productsController = {};

import productsModel from "../models/products";

productsController.productsController = async (req, res) => {
    const products = await productsModel.find()
    res.json(products);
}
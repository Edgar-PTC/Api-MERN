import express from 'express';
import productsController from '../controllers/productsController.js';

const router = express.Router();

router.route("/")
.get(productsController.getProducts)
.post(productsController.insertProducts);

router.route("/:id")
.delete(productsController.deleteProducts)
.put(productsController.updateProducts);

export default router;
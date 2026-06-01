import express from 'express';
import productsController from '../controllers/productsController.js';

const router = express.Router();

router.route("/")
.get(productsController.getProducts)
.post(productsController.insertProducts);

router.route("/searchByName").post(productsController.searchByName)
router.route("/low-stock").get(productsController.getLowStock)
router.route("/price-range").post(productsController.getProductsByPriceRange)
router.route("/count").get(productsController.countProducts);

router.route("/:id")
.get(productsController.getProductById)
.delete(productsController.deleteProducts)
.put(productsController.updateProducts);

export default router;
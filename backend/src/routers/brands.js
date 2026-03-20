import express from "express";
import brandController from "../controllers/brandController.js";

const router = express.Router();

router.route("/")
.get(brandController.getBrands)
.post(brandController.insertBrands);

router.route("/:id")
.delete(brandController.deleteBrands)
.put(brandController.updateBrands);

export default router;
import express from 'express';
import providersController from '../controllers/providersController.js';
import upload from "../utils/cloudinaryConfig.js"

const router = express.Router();

router.route("/")
.get(providersController.getAll)
.post(upload.single("image"), providersController.insert)

router.route("/:id")
.put(upload.single("image"), providersController.update)
.delete(providersController.delete)

export default router;
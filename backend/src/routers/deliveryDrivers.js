import deliveryDriversController from "../controllers/deliveryDriversController.js";
import express from "express"
import upload from "../utils/cloudinaryConfig.js";

const Router = express.Router();

Router.route("/")
.get(deliveryDriversController.getAllDrivers)
.post(upload.single("image"), deliveryDriversController.insert)

Router.route("/:id")
.delete(deliveryDriversController.deleted)
.put(upload.single("image"), deliveryDriversController.updateDriver)

export default Router;
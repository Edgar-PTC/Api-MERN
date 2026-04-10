import express from "express";
import employeeController from "../controllers/employeeController.js";

const router = express.Router();

router
    .route("/")
    .get(employeeController.getEmployees)

router
    .route("/:id")
    .delete(employeeController.deleteEmployee)
    .put(employeeController.updateEmployee);

export default router;
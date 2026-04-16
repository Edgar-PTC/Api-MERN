import e from "express";

import loginClientsController from "../controllers/loginClientController.js";

const router = e.Router();

router.route("/").post(loginClientsController.login);

export default router;
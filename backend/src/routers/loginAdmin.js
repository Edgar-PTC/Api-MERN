import e from "express";

import loginAdminController from "../controllers/loginAdminController.js";

const router = e.Router();

router.route("/").post(loginAdminController.login);

export default router;
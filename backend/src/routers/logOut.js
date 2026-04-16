import e from "express";

import logOutController from "../controllers/logOutController.js";

const router = e.Router();

router.route("/").post(logOutController.logOut);

export default router;
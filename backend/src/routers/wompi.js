import e from "express";
import wompiController from "../controllers/wompiController.js";

const router = e.Router();

router.route("/token").post(wompiController.generarToken);
router.route("/paymentTest").post(wompiController.paymentTest)
router.route("/payment3ds").post(wompiController.payment3ds)

export default router;
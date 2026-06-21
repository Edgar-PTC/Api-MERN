import express from 'express';
import Register from '../controllers/registerAdminController.js';

const router = express.Router();

router.route("/")
.post(Register.insertAdmin)

router.route("/verifyCode")
.post(Register.verifyCode)

export default router;
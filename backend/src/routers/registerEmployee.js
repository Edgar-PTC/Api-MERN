import express from 'express';
import Register from '../controllers/registerEmployeeController.js';

const router = express.Router();

router.route("/")
.post(Register.insertEmployees)

router.route("/verifyCode")
.post(Register.verifyCode)

export default router;
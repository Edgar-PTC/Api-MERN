import express from 'express';
import Register from '../controllers/registerClientController.js ';

const router = express.Router();

router.route("/")
.post(clientsController.insertClients)

router.route("/verifyCode")
.post(clientsController.verifyCode)

export default router;
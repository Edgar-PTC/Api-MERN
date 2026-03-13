import express from 'express';
import faqsController from '../controllers/faqsController.js';

const router = express.Router();

router.route("/")
.get(faqsController.getFaqs)
.post(faqsController.insertFaqs);

router.route("/:id")
.delete(faqsController.deleteFaqs)
.put(faqsController.updateFaqs);

export default router;
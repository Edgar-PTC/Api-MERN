import express from 'express';
import branchesController from '../controllers/branchescontroller.js';

const router = express.Router();

router.route("/")
.get(branchesController.getBranches)
.post(branchesController.insertBranches);

router.route("/:id")
.delete(branchesController.deleteBranches)
.put(branchesController.updateBranches);

export default router;
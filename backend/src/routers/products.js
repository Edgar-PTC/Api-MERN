import express from 'express';

const router = express.Router();

router.route('/api/products').get().post()

router.route('/api/products/:id').put().delete()

export default router;
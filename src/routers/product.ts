import express from 'express';

import {
  createProduct,
  findById,
  deleteProduct,
  findAll,
  updateProduct,
  placeOrder
} from '../controllers/product';
import {
  protect,
  admin
} from '../middlewares/authHandlers';

const router = express.Router();

router.get('/', findAll);
router.get('/:productId', findById);

//remove for testing
router.use(protect);
router.patch('/order', placeOrder);

router.use(admin);
router.post('/', createProduct);
router.patch('/:productId', updateProduct);
router.delete('/:productId', deleteProduct);

export default router;

import express from 'express';

import {
  getCartItems
} from '../controllers/cart';

const router = express.Router();

router.get('/', getCartItems);

export default router;
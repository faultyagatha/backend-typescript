import express from 'express'

import {
  createProduct,
  findById,
  deleteProduct,
  findAll,
  updateProduct,
} from '../controllers/product'
import { isLoggedin, restrictTo } from '../middlewares/authHandlers'

const router = express.Router()

router.get('/', findAll)
router.get('/:productId', findById)
router.put('/:productId', isLoggedin, restrictTo('admin'), updateProduct)
router.delete('/:productId', isLoggedin, restrictTo('admin'), deleteProduct)
router.post('/', isLoggedin, restrictTo('admin'), createProduct)

export default router

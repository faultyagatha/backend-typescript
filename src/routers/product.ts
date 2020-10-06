import express from 'express'

import {
  createProduct,
  findById,
  deleteProduct,
  findAll,
  updateProduct,
} from '../controllers/product'
import {
  isLoggedin,
  restrictTo
} from '../middlewares/authHandlers'

const router = express.Router()

router.get('/', findAll)
router.get('/:productId', findById)

//remove for testing
// router.use(isLoggedin)
// router.use(restrictTo('admin'))
router.post('/', createProduct)
router.put('/:productId', updateProduct)
router.delete('/:productId', deleteProduct)

export default router

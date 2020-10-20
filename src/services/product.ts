import Product, { ProductDocument } from '../models/Product'
import User, { UserDocument } from '../models/User'

function create(product: ProductDocument): Promise<ProductDocument> {
  return product.save()
}

async function findAll(): Promise<ProductDocument[]> {
  const products = await Product.find().sort({ name: 1 }).exec()
  if (!products) throw new Error('Products not found')
  return products
}

async function findById(productId: string): Promise<ProductDocument> {
  const product = await Product.findById(productId).exec()
  if (!product) throw new Error(`Product ${productId} not found`)
  return product
}

async function update(
  productId: string,
  update: Partial<ProductDocument>
): Promise<ProductDocument> {
  const product = await Product.findById(productId).exec()
  if (!product) throw new Error(`Product ${productId} not found`)
  if (update.name) product.name = update.name
  if (update.imageCover) product.imageCover = update.imageCover
  if (update.description) product.description = update.description
  if (update.duration) product.duration = update.duration
  if (update.distance) product.distance = update.distance
  if (update.price) product.price = update.price
  return product.save()

}

function deleteProduct(productId: string): Promise<ProductDocument | null> {
  return Product.findByIdAndDelete(productId).exec()
}

async function placeOrder(productId: string, userId: string): Promise<UserDocument> {
  const product = await Product.findById(productId).exec()
  if (!product) throw new Error(`Product ${productId} not found`)
  console.log('PRODUCT _ID: ', product._id)

  const user = await User.findById(userId).exec()
  console.log('USER ID: ', userId)
  if (!user) throw new Error(`User ${userId} not found`)
  user.products.push(product._id)
  return user.save()
}


export default {
  create,
  findById,
  findAll,
  update,
  deleteProduct,
  placeOrder
}

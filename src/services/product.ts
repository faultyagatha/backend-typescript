import Product, { ProductDocument } from '../models/Product'

function create(product: ProductDocument): Promise<ProductDocument> {
  return product.save()
}

function findAll(): Promise<ProductDocument[]> {
  return Product.find().sort({ name: 1 })
    .exec()
    .then((products) => {
      if (!products) throw new Error('Products not found')
      return products
    })
}

function findById(productId: string): Promise<ProductDocument> {
  return Product.findById(productId)
    .exec()
    .then((product) => {
      if (!product) throw new Error(`Product ${productId} not found`)
      return product
    })
}

function update(
  productId: string,
  update: Partial<ProductDocument>
): Promise<ProductDocument> {
  return Product.findById(productId)
    .exec()
    .then((product) => {
      console.log(product)
      if (!product) throw new Error(`Product ${productId} not found`)
      if (update.name) product.name = update.name
      if (update.imageCover) product.imageCover = update.imageCover
      if (update.description) product.description = update.description
      if (update.duration) product.duration = update.duration
      if (update.difficulty) product.difficulty = update.difficulty
      if (update.price) product.price = update.price
      return product.save()
    })
}

function deleteProduct(productId: string): Promise<ProductDocument | null> {
  return Product.findByIdAndDelete(productId).exec()
}

export default {
  create,
  findById,
  findAll,
  update,
  deleteProduct,
}

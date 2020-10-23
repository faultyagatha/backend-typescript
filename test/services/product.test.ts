import Product from '../../src/models/Product'
import ProductService from '../../src/services/product'
import * as dbHelper from '../db-helper'

const nonExistingProductId = '5e57b77b5744fa0b461c7906'

async function createProduct() {
  const product = new Product({
    name: 'Mars',
    imageCover: 'some image',
    description: 'some description',
    duration: 1,
    distance: 'very long',
    price: 10
  })
  return await ProductService.create(product)
}

describe('product service', () => {
  beforeEach(async () => {
    await dbHelper.connect()
  })

  afterEach(async () => {
    await dbHelper.clearDatabase()
  })

  afterAll(async () => {
    await dbHelper.closeDatabase()
  })

  it('should create a product', async () => {
    const product = await createProduct()
    expect(product).toHaveProperty('_id')
    expect(product).toHaveProperty('name', 'Mars')
    expect(product).toHaveProperty('distance', 'very long')
  })

  it('should get a product with id', async () => {
    const product = await createProduct()
    const found = await ProductService.findById(product._id)
    expect(found.name).toEqual(product.name)
    expect(found._id).toEqual(product._id)
  })

  // Check https://jestjs.io/docs/en/asynchronous for more info about
  // how to test async code, especially with error
  it('should not get a non-existing user', async () => {
    expect.assertions(1)
    return ProductService.findById(nonExistingProductId).catch(e => {
      expect(e.message).toMatch(`Product ${nonExistingProductId} not found`)
    })
  })

  it('should update an existing product', async () => {
    const product = await createProduct()
    const update = {
      name: 'Venus',
      duration: 5
    }
    const updated = await ProductService.update(product._id, update)
    expect(updated).toHaveProperty('_id', product._id)
    expect(updated).toHaveProperty('name', 'Venus')
    expect(updated).toHaveProperty('duration', 5)
  })

  it('should not update a non-existing user', async () => {
    expect.assertions(1)
    const update = {
      name: 'Moon',
      price: 1000
    }
    return ProductService.update(nonExistingProductId, update).catch(e => {
      expect(e.message).toMatch(`Product ${nonExistingProductId} not found`)
    })
  })

  it('should delete an existing product', async () => {
    expect.assertions(1)
    const product = await createProduct()
    await ProductService.deleteProduct(product._id)
    return ProductService.findById(product._id).catch(e => {
      expect(e.message).toBe(`Product ${product._id} not found`)
    })
  })
})

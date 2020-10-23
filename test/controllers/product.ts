import request from 'supertest'

import { ProductDocument } from '../../src/models/Product'
import app from '../../src/app'
import * as dbHelper from '../db-helper'

const nonExistingProductId = '5e57b77b5744fa0b461c7906'

async function createProduct(override?: Partial<ProductDocument>) {
  let product: Partial<ProductDocument> = {
    name: 'Mars',
    imageCover: 'some img',
    description: 'some descr',
    duration: 10,
    distance: '12 bill km',
    price: 10
  }

  if (override) {
    product = { ...product, ...override }
  }

  return await request(app)
    .post('/api/v1/products')
    .send(product)
}

describe('product controller', () => {
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
    const res = await createProduct()
    expect(res.status).toBe(200)
    expect(res.body).toHaveProperty('_id')
    expect(res.body.name).toBe('Mars')
  })

  it('should not create a product with wrong data', async () => {
    const res = await request(app)
      .post('/api/v1/products')
      .send({
        name: 'Mars',
        imageCover: 'some img'
      })
    expect(res.status).toBe(400)
  })

  it('should get back an existing product', async () => {
    let res = await createProduct()
    expect(res.status).toBe(200)

    const productId = res.body._id
    res = await request(app)
      .get(`/api/v1/products/${productId}`)

    expect(res.body._id).toEqual(productId)
  })

  it('should not get back a non-existing product', async () => {
    const res = await request(app)
      .get(`/api/v1/products/${nonExistingProductId}`)
    expect(res.status).toBe(404)
  })

  it('should get back all product', async () => {
    const res1 = await createProduct({
      name: 'Venus',
      imageCover: 'some img'
    })
    const res2 = await createProduct({
      name: 'Saturn',
      imageCover: 'some img'
    })

    const res3 = await request(app)
      .get('/api/v1/products')
    console.log(res1.body)
    console.log(res2.body)
    console.log(res3.body[0])

    expect(res3.body.length).toEqual(2)
    expect(res3.body[1]._id).toEqual(res1.body._id)
    expect(res3.body[0]._id).toEqual(res2.body._id)
  })

  it('should update an existing product', async () => {
    let res = await createProduct()
    expect(res.status).toBe(200)

    const productId = res.body._id
    const update = {
      name: 'Venus',
      imageCover: 'some another img'
    }

    res = await request(app)
      .put(`/api/v1/products/${productId}`)
      .send(update)

    expect(res.status).toEqual(200)
    expect(res.body.name).toEqual('Venus')
    expect(res.body.imageCover).toEqual('some another img')
  })

  it('should delete an existing product', async () => {
    let res = await createProduct()
    expect(res.status).toBe(200)
    const productId = res.body._id

    res = await request(app)
      .delete(`/api/v1/products/${productId}`)

    expect(res.status).toEqual(204)

    res = await request(app)
      .get(`/api/v1/products/${productId}`)
    expect(res.status).toBe(404)
  })
})
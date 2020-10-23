import request from 'supertest'
import 'jest'

import { UserDocument } from '../../src/models/User'
import app from '../../src/app'
import * as dbHelper from '../db-helper'

const nonExistingUserId = '5e57b77b5744fa0b461c7906'

//override gives a possibility to update the key
async function createUser(override?: Partial<UserDocument>) {
  let user = {
    email: 'test@test.com',
    password: '00000000',
    passwordConfirm: '00000000'
  }

  if (override) {
    user = { ...user, ...override }
  }

  return await request(app)
    .post('/api/v1/users/signup')
    .send(user)
}

describe('user controller', () => {
  beforeEach(async () => {
    await dbHelper.connect()
  })

  afterEach(async () => {
    await dbHelper.clearDatabase()
  })

  afterAll(async () => {
    await dbHelper.closeDatabase()
  })

  it('should create a user', async () => {
    const res = await createUser()
    expect(res.status).toBe(201)
    expect(res.body).toHaveProperty('data')
  })

  it('should not create a user with wrong data', async () => {
    const res = await request(app)
      .post('/api/v1/users/signup')
      .send({
        email: ' ',
        password: '00000000',
        passwordConfirm: '00000000'
      })
    expect(res.status).toBe(400)
  })

  it('should get back an existing user', async () => {
    let res = await createUser()
    console.log(res.body)
    expect(res.status).toBe(201)

    const userId = res.body.data.user._id
    res = await request(app)
      .get(`/api/v1/users/${userId}`)

    expect(res.body._id).toEqual(userId)
  })

  it('should not get back a non-existing user', async () => {
    const res = await request(app)
      .get(`/api/v1/users/${nonExistingUserId}`)
    expect(res.status).toBe(404)
  })

  //simulate the test data
  it('should get back all users', async () => {
    const res1 = await createUser({
      email: 'ella@test.com'
    })
    const res2 = await createUser({
      email: 'mila@test.com'
    })

    const res3 = await request(app)
      .get('/api/v1/users')
    expect(res3.body.length).toEqual(2)
    expect(res3.body[0]._id).toEqual(res1.body.data.user._id)
    expect(res3.body[1]._id).toEqual(res2.body.data.user._id)
  })

  it('should update an existing user', async () => {
    let res = await createUser()
    expect(res.status).toBe(201)

    const userId = res.body.data.user._id
    const update = {
      email: 'ellai@test.com'
    }

    res = await request(app)
      .patch(`/api/v1/users/${userId}`)
      .send(update)

    expect(res.status).toEqual(200)
    expect(res.body.data.user.email).toEqual('ellai@test.com')
  })

  it('should delete an existing user', async () => {
    let res = await createUser()
    expect(res.status).toBe(201)
    const userId = res.body.data.user._id

    res = await request(app)
      .delete(`/api/v1/users/${userId}`)

    expect(res.status).toEqual(204)

    res = await request(app)
      .get(`/api/v1/users/${userId}`)
    console.log(res.status)
    expect(res.status).toBe(404)
  })
})

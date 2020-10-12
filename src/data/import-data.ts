import fs from 'fs'
import mongoose from 'mongoose'
import bluebird from 'bluebird'
import dotenv from 'dotenv'

import { MONGODB_URI } from '../util/secrets'
import Product from '../models/Product'
import User from '../models/User'
import users from './users'
import products from './products'

dotenv.config({ path: './config.env' })

const mongoUrl = MONGODB_URI

mongoose.Promise = bluebird
mongoose
  .connect(mongoUrl, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    /** ready to use. The `mongoose.connect()` promise resolves to undefined. */
  })
  .catch((err: Error) => {
    console.log(
      'MongoDB connection error. Please make sure MongoDB is running. ' + err
    )
    process.exit(1)
  })

// READ JSON FILE
// const products = JSON.parse(fs.readFileSync(`${__dirname}/products.json`, 'utf-8'))
// const users = JSON.parse(fs.readFileSync(`${__dirname}/users.json`, 'utf-8'))

// IMPORT DATA INTO DB
export const importData = async () => {
  try {
    await Product.create(products)
    await User.create(users)
    console.log('Data successfully loaded!')
  } catch (err) {
    console.log(err)
  }
  process.exit()
}

// DELETE ALL DATA FROM DB
const deleteData = async () => {
  try {
    await Product.deleteMany({})
    await User.deleteMany({})
    console.log('Data successfully deleted!')
  } catch (err) {
    console.log(err)
  }
  process.exit()
}

if (process.argv[2] === '--import') {
  importData()
} else if (process.argv[2] === '--delete') {
  deleteData()
}
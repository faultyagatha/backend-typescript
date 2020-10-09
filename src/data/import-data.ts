import fs from 'fs'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import Product from '../models/Product'

dotenv.config({ path: './config.env' })

// const DB = process.env.DATABASE.replace(
//   '<PASSWORD>',
//   process.env.DATABASE_PASSWORD
// );

// mongoose
//   .connect(DB, {
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useFindAndModify: false
//   })
//   .then(() => console.log('DB connection successful!'));

// READ JSON FILE
const products = JSON.parse(fs.readFileSync(`${__dirname}/users.json`, 'utf-8'))

// IMPORT DATA INTO DB
export const importData = async () => {
  try {
    await Product.create(products)
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
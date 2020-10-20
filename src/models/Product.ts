import mongoose, { Document } from 'mongoose'

export type ProductDocument = Document & {
  name: string;
  imageCover: string;
  description: string;
  duration: number;
  distance: string;
  price: number;
  users: mongoose.Schema.Types.ObjectId[];
};

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    index: true,
    required: [true, 'A product must have a name'],
    unique: true,
  },
  imageCover: {
    type: String,
    required: [true, 'A product must have a cover image'],
  },
  description: {
    type: String,
    trim: true,
  },
  duration: {
    type: Number,
    required: [true, 'A product must have a duration'],
    min: 1,
  },
  distance: {
    type: String,
    required: [true, 'A product must have a distance']
  },
  price: {
    type: Number,
    required: [true, 'A tour must have a price'],
    min: 0,
  }
})

export default mongoose.model<ProductDocument>('Product', productSchema)

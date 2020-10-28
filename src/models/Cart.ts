import mongoose, { Document } from 'mongoose';

export type CartDocument = Document & {
  products: mongoose.Types.ObjectId[];
  user: mongoose.Types.ObjectId;
};

const cartSchema = new mongoose.Schema({
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Product'
    }
  ],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  }
});

export default mongoose.model<CartDocument>('Order', cartSchema);
import Cart, { CartDocument } from '../models/Cart';
import User, { UserDocument } from '../models/User';
import Product, { ProductDocument } from '../models/Product';
import { nextTick } from 'process';
import { NotFoundError } from '../helpers/apiError';

function create(cart: CartDocument): Promise<CartDocument> {
  return cart.save();
}

async function findAll(): Promise<CartDocument[]> {
  const cartItems = await Cart.find().sort({ name: 1 }).exec();
  if (!cartItems) throw new Error('Cart items are not found');
  return cartItems;
}

async function addItem(productId: string, userId: string): Promise<CartDocument> {
  const product = await Product.findById(productId).exec();
  if (!product) throw new Error(`Product ${productId} not found`);

  const cart = await Cart.findOne({ user: userId });
  if (!cart) {
    throw new NotFoundError('No cart is associated with the current user');
  }
  return cart.save();
}

export default {
  create,
  findAll,
  // update,
  // deleteProduct,
  // placeOrder
};

import mongoose from 'mongoose';

const { Schema } = mongoose;

const CartItemSchema = new Schema({
  product: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  quantity: {
    type: Number,
    required: true
  }
});

const CartSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  items: [CartItemSchema]
});

export const Cart = mongoose.model('Cart', CartSchema);

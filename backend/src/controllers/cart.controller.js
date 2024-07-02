import { Product } from '../models/product.model.js';
import { Cart } from '../models/cart.model.js'
import mongoose from 'mongoose';
const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id }).populate('items.product');
    if (!cart) return res.status(404).json({ message: 'Cart not found' });
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const addItemToCart = async (req, res) => {
  const { productId, quantity } = req.body;

  try {
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    let cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
      cart = new Cart({ user: req.user._id, items: [] });
    }

    const cartItem = cart.items.find(item => item.product.toString() === productId);
    if (cartItem) {
      cartItem.quantity += quantity;
    } else {
      cart.items.push({ product: productId, quantity });
    }

    await cart.save();
    res.status(201).json(cart);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const removeItemFromCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) return res.status(404).json({ message: 'Cart not found' });
    console.log()
    cart.items = cart.items.filter(item =>
      item._id
      !== 
      new mongoose.Types.ObjectId(req.params.id));
    await cart.save();
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export {
  getCart,
  addItemToCart,
  removeItemFromCart
};

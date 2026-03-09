import asyncHandler from 'express-async-handler';
import Cart from '../models/Cart.js';
import Product from '../models/Product.js';

const getOrCreateCart = async (userId) => {
  let cart = await Cart.findOne({ userId }).populate('products.product');
  if (!cart) {
    cart = await Cart.create({ userId, products: [] });
    cart = await cart.populate('products.product');
  }
  return cart;
};

export const getCart = asyncHandler(async (req, res) => {
  const cart = await getOrCreateCart(req.user._id);
  res.json(cart);
});

export const addToCart = asyncHandler(async (req, res) => {
  const { productId, quantity = 1 } = req.body;
  const product = await Product.findById(productId);

  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }

  let cart = await Cart.findOne({ userId: req.user._id });
  if (!cart) {
    cart = await Cart.create({ userId: req.user._id, products: [] });
  }

  const existing = cart.products.find((p) => p.product.toString() === productId);
  if (existing) {
    existing.quantity += Number(quantity);
  } else {
    cart.products.push({ product: productId, quantity: Number(quantity) });
  }

  await cart.save();
  const populated = await cart.populate('products.product');
  res.status(201).json(populated);
});

export const updateCartItem = asyncHandler(async (req, res) => {
  const { quantity } = req.body;
  const cart = await Cart.findOne({ userId: req.user._id });

  if (!cart) {
    res.status(404);
    throw new Error('Cart not found');
  }

  const item = cart.products.find((p) => p.product.toString() === req.params.productId);
  if (!item) {
    res.status(404);
    throw new Error('Item not in cart');
  }

  item.quantity = Number(quantity);
  await cart.save();
  const populated = await cart.populate('products.product');
  res.json(populated);
});

export const removeCartItem = asyncHandler(async (req, res) => {
  const cart = await Cart.findOne({ userId: req.user._id });
  if (!cart) {
    res.status(404);
    throw new Error('Cart not found');
  }

  cart.products = cart.products.filter((p) => p.product.toString() !== req.params.productId);
  await cart.save();
  const populated = await cart.populate('products.product');
  res.json(populated);
});

import asyncHandler from 'express-async-handler';
import Cart from '../models/Cart.js';
import Order from '../models/Order.js';

export const createOrderFromCart = asyncHandler(async (req, res) => {
  const cart = await Cart.findOne({ userId: req.user._id }).populate('products.product');

  if (!cart || !cart.products.length) {
    res.status(400);
    throw new Error('Cart is empty');
  }

  const orderItems = cart.products.map((item) => ({
    product: item.product._id,
    name: item.product.name,
    quantity: item.quantity,
    price: item.product.price,
    imageUrl: item.product.imageUrl
  }));

  const total = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const order = await Order.create({
    userId: req.user._id,
    products: orderItems,
    total,
    status: 'pending'
  });

  cart.products = [];
  await cart.save();

  console.log('Order created:', order._id);
  res.status(201).json(order);
});

export const getUserOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ userId: req.user._id }).sort({ createdAt: -1 });
  res.json(orders);
});

export const getAllOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find().populate('userId', 'name email').sort({ createdAt: -1 });
  res.json(orders);
});

export const updateOrderStatus = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    res.status(404);
    throw new Error('Order not found');
  }

  order.status = req.body.status;
  const updated = await order.save();
  res.json(updated);
});

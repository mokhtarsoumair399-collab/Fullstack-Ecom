import asyncHandler from 'express-async-handler';
import { validationResult } from 'express-validator';
import Product from '../models/Product.js';

const handleValidation = (req) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const err = new Error(errors.array().map((e) => e.msg).join(', '));
    err.statusCode = 400;
    throw err;
  }
};

export const getProducts = asyncHandler(async (req, res) => {
  const { search = '', category = '' } = req.query;
  const query = {};

  if (search) query.name = { $regex: search, $options: 'i' };
  if (category) query.category = category;

  const products = await Product.find(query).sort({ createdAt: -1 });
  res.json(products);
});

export const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }
  res.json(product);
});

export const createProduct = asyncHandler(async (req, res) => {
  handleValidation(req);

  const product = await Product.create({
    name: req.body.name,
    description: req.body.description,
    price: Number(req.body.price),
    category: req.body.category,
    stock: Number(req.body.stock),
    imageUrl: req.file ? `/uploads/${req.file.filename}` : req.body.imageUrl
  });

  console.log('Product created:', product._id);
  res.status(201).json(product);
});

export const updateProduct = asyncHandler(async (req, res) => {
  handleValidation(req);

  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }

  product.name = req.body.name ?? product.name;
  product.description = req.body.description ?? product.description;
  product.price = req.body.price !== undefined ? Number(req.body.price) : product.price;
  product.category = req.body.category ?? product.category;
  product.stock = req.body.stock !== undefined ? Number(req.body.stock) : product.stock;
  if (req.file) product.imageUrl = `/uploads/${req.file.filename}`;

  const updated = await product.save();
  res.json(updated);
});

export const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }

  await product.deleteOne();
  res.json({ message: 'Product removed' });
});

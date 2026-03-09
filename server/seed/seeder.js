import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import connectDB from '../config/db.js';
import Product from '../models/Product.js';
import User from '../models/User.js';
import Cart from '../models/Cart.js';
import Order from '../models/Order.js';

dotenv.config();

const sampleProducts = [
  { name: 'Echo Smart Speaker', description: 'Voice controlled smart speaker with premium sound.', price: 129, category: 'Electronics', stock: 24, imageUrl: 'https://images.unsplash.com/photo-1543512214-318c7553f230?w=800' },
  { name: 'Wireless Headphones', description: 'Noise cancelling over-ear Bluetooth headphones.', price: 199, category: 'Electronics', stock: 42, imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800' },
  { name: 'Modern Desk Lamp', description: 'Dimmable LED desk lamp with USB charging.', price: 49, category: 'Home', stock: 35, imageUrl: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=800' },
  { name: 'Running Shoes', description: 'Lightweight running shoes for daily training.', price: 89, category: 'Fashion', stock: 58, imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800' },
  { name: 'Leather Backpack', description: 'Premium backpack for work and travel.', price: 109, category: 'Fashion', stock: 17, imageUrl: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800' },
  { name: '4K Monitor', description: '27-inch UHD display for creators and gamers.', price: 329, category: 'Electronics', stock: 13, imageUrl: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800' },
  { name: 'Ergonomic Chair', description: 'Breathable mesh office chair with lumbar support.', price: 259, category: 'Home', stock: 11, imageUrl: 'https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=800' },
  { name: 'Coffee Grinder', description: 'Burr grinder with 16 grind settings.', price: 69, category: 'Kitchen', stock: 28, imageUrl: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800' },
  { name: 'Stainless Bottle', description: 'Insulated bottle keeps drinks cold for 24h.', price: 25, category: 'Sports', stock: 70, imageUrl: 'https://images.unsplash.com/photo-1523362628745-0c100150b504?w=800' },
  { name: 'Yoga Mat Pro', description: 'Non-slip yoga mat with extra cushioning.', price: 39, category: 'Sports', stock: 46, imageUrl: 'https://images.unsplash.com/photo-1599447421416-3414500d18a5?w=800' }
];

const importData = async () => {
  try {
    await connectDB();
    await Promise.all([Product.deleteMany(), User.deleteMany(), Cart.deleteMany(), Order.deleteMany()]);

    const adminPassword = await bcrypt.hash('Admin123!', 10);
    await User.create({
      name: 'Admin User',
      email: 'admin@shop.com',
      password: adminPassword,
      role: 'admin'
    });

    await Product.insertMany(sampleProducts);
    console.log('Seed data inserted successfully.');
    process.exit();
  } catch (error) {
    console.error('Seeding failed:', error.message);
    process.exit(1);
  }
};

importData();

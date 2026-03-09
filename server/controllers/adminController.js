import asyncHandler from 'express-async-handler';
import Order from '../models/Order.js';
import Product from '../models/Product.js';
import User from '../models/User.js';

export const getDashboardStats = asyncHandler(async (req, res) => {
  const [orders, userCount, productCount] = await Promise.all([
    Order.find(),
    User.countDocuments(),
    Product.countDocuments()
  ]);

  const totalSales = orders.reduce((sum, order) => sum + order.total, 0);

  const salesByMonth = new Array(12).fill(0);
  orders.forEach((order) => {
    const month = new Date(order.createdAt).getMonth();
    salesByMonth[month] += order.total;
  });

  const categoryAgg = await Product.aggregate([
    { $group: { _id: '$category', count: { $sum: 1 } } },
    { $sort: { count: -1 } }
  ]);

  res.json({
    summary: {
      totalSales,
      userCount,
      orderCount: orders.length,
      productCount
    },
    salesByMonth,
    categories: categoryAgg.map((c) => ({ name: c._id, value: c.count }))
  });
});

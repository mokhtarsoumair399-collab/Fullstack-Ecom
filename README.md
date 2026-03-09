# MERN E-Commerce Dashboard Store

Full-stack MERN e-commerce app with Amazon-style storefront + admin dashboard inspired by Ecommerce Dashboard UI patterns.

## Stack
- Backend: Node.js, Express, MongoDB, Mongoose, JWT, Multer
- Frontend: React (Vite), React Router, Redux Toolkit, Axios, Recharts

## Features
- User auth (register/login/profile) with JWT
- Role-based access (`user`, `admin`)
- Products CRUD with image upload (admin only)
- Cart management (add/update/remove)
- Checkout flow (simulated payment) and order creation
- User orders view
- Admin dashboard stats + charts
- Admin orders/status management
- Admin user listing
- Seed script with 10 products + admin account

## Folder Structure
- `server/` Express API and MongoDB models
- `client/` React app (storefront + admin dashboard)

## Setup
1. Install dependencies:
```bash
npm install
npm run install:all
```
2. Create env files:
- `server/.env` from `server/.env.example`
- `client/.env` from `client/.env.example`

3. Start MongoDB locally (or point `MONGO_URI` to your cluster).

4. Seed data:
```bash
npm run seed
```

5. Run both frontend and backend:
```bash
npm run dev
```

## Default Seed Admin
- Email: `admin@shop.com`
- Password: `Admin123!`

## API Summary
- Users: `/api/users/register`, `/api/users/login`, `/api/users/profile`, `/api/users` (admin)
- Products: `/api/products` (GET all/POST), `/api/products/:id` (GET/PUT/DELETE)
- Cart: `/api/cart` (GET/POST), `/api/cart/:productId` (PUT/DELETE)
- Orders: `/api/orders/checkout`, `/api/orders/my-orders`, `/api/orders` (admin), `/api/orders/:id/status` (admin)
- Admin stats: `/api/admin/stats`

## Notes
- Product upload uses local `server/uploads`.
- For production, swap upload flow to Cloudinary/S3 and add stricter validation/rate-limits.

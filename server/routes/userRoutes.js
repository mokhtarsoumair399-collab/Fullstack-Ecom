import express from 'express';
import { body } from 'express-validator';
import { getProfile, getUsers, loginUser, registerUser } from '../controllers/userController.js';
import { adminOnly, protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post(
  '/register',
  [body('name').notEmpty(), body('email').isEmail(), body('password').isLength({ min: 6 })],
  registerUser
);
router.post('/login', [body('email').isEmail(), body('password').notEmpty()], loginUser);
router.get('/profile', protect, getProfile);
router.get('/', protect, adminOnly, getUsers);

export default router;

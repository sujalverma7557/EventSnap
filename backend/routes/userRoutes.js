import express from 'express';
import {
  authUser,
  editProfile,
  getUserProfile,
  registerUser,
} from '../controllers/userControllers.js';
import { protect } from '../middleware/authMiddleware.js';
import multer from 'multer';

const router = express.Router();
const upload = multer();

router.route('/signUp').post(upload.single('image'), registerUser);
router.post('/login', authUser);
router.route('/profile').get(protect, getUserProfile).put(editProfile);

export default router;

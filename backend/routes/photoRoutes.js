import express from 'express';
import { createPhoto, deletePhoto,getPhotosByUser } from '../controllers/photoControllers.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// All routes require authentication
router.post('/', protect, createPhoto);
router.delete('/:id', protect, deletePhoto);
router.get('/user/:userId', protect, getPhotosByUser);


export default router;

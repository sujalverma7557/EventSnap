import express from 'express';
import {
  createEvent,
  joinEvent,
  getEvents,
  getEventById,
} from '../controllers/eventControllers.js';
import { getPhotosByEvent } from '../controllers/photoControllers.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// All routes require authentication
router.route('/').post(protect, createEvent).get(protect, getEvents);
router.post('/join', protect, joinEvent);
router.get('/:id', protect, getEventById);
router.get('/:id/photos', protect, getPhotosByEvent);

export default router;

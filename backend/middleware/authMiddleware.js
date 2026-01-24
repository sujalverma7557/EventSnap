import jwt from 'jsonwebtoken';
import asyncHandler from './asyncHandler.js';
import User from '../models/userModel.js';
import Event from '../models/eventModel.js';

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id).select('-password');

      if (!req.user) {
        res.status(401);
        throw new Error('Not authorized, user not found');
      }

      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error('Not authorized, token failed');
    }
  } else {
    res.status(401);
    throw new Error('Not authorized, no token');
  }
});

// Helper function to check if user is a member of an event
const checkEventMembership = async (eventId, userId) => {
  try {
    const event = await Event.findById(eventId);
    if (!event) {
      return false;
    }
    return event.isMember(userId);
  } catch (error) {
    return false;
  }
};

// Helper function to check if user is the creator of an event
const checkEventCreator = async (eventId, userId) => {
  try {
    const event = await Event.findById(eventId);
    if (!event) {
      return false;
    }
    return event.isCreator(userId);
  } catch (error) {
    return false;
  }
};

export { protect, checkEventMembership, checkEventCreator };
import asyncHandler from 'express-async-handler';
import Event from '../models/eventModel.js';

// @desc    Create a new event
// @route   POST /api/events
// @access  Private
const createEvent = asyncHandler(async (req, res) => {
  const { name, type } = req.body;

  if (!name || !type) {
    res.status(400);
    throw new Error('Please provide event name and type');
  }


  // Generate unique invite code
  const inviteCode = await Event.generateInviteCode();

  // Create event
  const event = await Event.create({
    name,
    type,
    createdBy: req.user._id,
    inviteCode,
    members: [req.user._id], // Creator is automatically a member
  });

  if (event) {
    res.status(201).json({
      _id: event._id,
      name: event.name,
      type: event.type,
      createdBy: event.createdBy,
      inviteCode: event.inviteCode,
      members: event.members,
      createdAt: event.createdAt,
    });
  } else {
    res.status(400);
    throw new Error('Invalid event data');
  }
});

// @desc    Join an event via invite code
// @route   POST /api/events/join
// @access  Private
const joinEvent = asyncHandler(async (req, res) => {
  const { inviteCode } = req.body;

  if (!inviteCode) {
    res.status(400);
    throw new Error('Please provide an invite code');
  }

  const event = await Event.findOne({ inviteCode });

  if (!event) {
    res.status(404);
    throw new Error('Invalid invite code');
  }

  // Check if user is already a member
  const isAlreadyMember = event.isMember(req.user._id);
  if (isAlreadyMember) {
    res.status(400);
    throw new Error('You are already a member of this event');
  }

  // Add user to members array
  event.members.push(req.user._id);
  await event.save();

  res.status(200).json({
    _id: event._id,
    name: event.name,
    type: event.type,
    createdBy: event.createdBy,
    inviteCode: event.inviteCode,
    members: event.members,
    createdAt: event.createdAt,
  });
});

// @desc    Get all events for the authenticated user
// @route   GET /api/events
// @access  Private
const getEvents = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  // Find events where user is creator or member
  const events = await Event.find({
    $or: [{ createdBy: userId }, { members: userId }],
  })
    .populate('createdBy', 'name email')
    .populate('members', 'name email')
    .sort({ createdAt: -1 });

  res.json(events);
});

// @desc    Get event by ID
// @route   GET /api/events/:id
// @access  Private
const getEventById = asyncHandler(async (req, res) => {
  const event = await Event.findById(req.params.id)
    .populate('createdBy', 'name email image')
    .populate('members', 'name email image');

  if (!event) {
    res.status(404);
    throw new Error('Event not found');
  }

  // Check if user is a member
  if (!event.isMember(req.user._id)) {
    res.status(403);
    throw new Error('Not authorized to view this event');
  }

  res.json(event);
});

export { createEvent, joinEvent, getEvents, getEventById };

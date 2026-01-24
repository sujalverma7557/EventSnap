import Photo from '../models/photoModel.js';
import Event from '../models/eventModel.js';
import asyncHandler from 'express-async-handler';

// @desc    Create a new photo
// @route   POST /api/photos
// @access  Private
const createPhoto = asyncHandler(async (req, res) => {
  const { eventId, image, blurhash, caption } = req.body;

  if (!eventId || !image || !blurhash) {
    res.status(400);
    throw new Error('Please provide eventId, image, and blurhash');
  }

  // Check if event exists
  const event = await Event.findById(eventId);
  if (!event) {
    res.status(404);
    throw new Error('Event not found');
  }

  // Check if user is a member of the event
  if (!event.isMember(req.user._id)) {
    res.status(403);
    throw new Error('Not authorized to upload photos to this event');
  }

  // Create photo
  const photo = await Photo.create({
    image,
    blurhash,
    caption: caption || '',
    eventId,
    uploadedBy: req.user._id,
  });

  if (photo) {
    res.status(201).json({
      _id: photo._id,
      image: photo.image,
      blurhash: photo.blurhash,
      caption: photo.caption,
      eventId: photo.eventId,
      uploadedBy: photo.uploadedBy,
      createdAt: photo.createdAt,
    });
  } else {
    res.status(400);
    throw new Error('Invalid photo data');
  }
});

// @desc    Get photos by event ID
// @route   GET /api/events/:id/photos
// @access  Private
const getPhotosByEvent = asyncHandler(async (req, res) => {
  const eventId = req.params.id;

  // Check if event exists
  const event = await Event.findById(eventId);
  if (!event) {
    res.status(404);
    throw new Error('Event not found');
  }

  // Check if user is a member of the event
  if (!event.isMember(req.user._id)) {
    res.status(403);
    throw new Error('Not authorized to view photos for this event');
  }

  // Get photos for this event
  const photos = await Photo.find({ eventId })
    .populate('uploadedBy', 'name email image')
    .sort({ createdAt: -1 });

  res.json(photos);
});

// @desc    Delete a photo
// @route   DELETE /api/photos/:id
// @access  Private
const deletePhoto = asyncHandler(async (req, res) => {
  const photo = await Photo.findById(req.params.id).populate('eventId');

  if (!photo) {
    res.status(404);
    throw new Error('Photo not found');
  }

  const event = photo.eventId;

  // Check if user is the photo owner or event creator
  const isOwner = photo.uploadedBy.toString() === req.user._id.toString();
  const isEventCreator = event.isCreator(req.user._id);

  if (!isOwner && !isEventCreator) {
    res.status(403);
    throw new Error('Not authorized to delete this photo');
  }

  await Photo.findByIdAndDelete(req.params.id);

  res.json({ message: 'Photo deleted successfully' });
});

// @desc    Get photos uploaded by a user
// @route   GET /api/photos/user/:userId
// @access  Private
const getPhotosByUser = asyncHandler(async (req, res) => {
  const photos = await Photo.find({ uploadedBy: req.params.userId })
    .populate('uploadedBy', 'name image')
    .sort({ createdAt: -1 });

  res.json(photos);
});


export { createPhoto, getPhotosByEvent, deletePhoto, getPhotosByUser };

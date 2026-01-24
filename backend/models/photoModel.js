import mongoose from 'mongoose';

const photoSchema = mongoose.Schema(
  {
    image: {
      type: String,
      required: true,
    },
    blurhash: {
      type: String,
      required: true,
    },
    caption: {
      type: String,
      default: '',
    },
    eventId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Event',
      index: true,
    },
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

const Photo = mongoose.model('Photo', photoSchema);

export default Photo;

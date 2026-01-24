import mongoose from 'mongoose';
import crypto from 'crypto';

const eventSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    type: {
      type: String,
      required: true,
      trim: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    inviteCode: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Static method to generate unique invite code
eventSchema.statics.generateInviteCode = async function () {
  let inviteCode;
  let isUnique = false;

  while (!isUnique) {
    // Generate 8-character alphanumeric code
    inviteCode = crypto.randomBytes(4).toString('hex').toUpperCase();
    
    // Check if code already exists
    const existingEvent = await this.findOne({ inviteCode });
    if (!existingEvent) {
      isUnique = true;
    }
  }

  return inviteCode;
};

// Method to check if user is a member
eventSchema.methods.isMember = function (userId) {
  return (
    this.createdBy.toString() === userId.toString() ||
    this.members.some(
      (memberId) => memberId.toString() === userId.toString()
    )
  );
};

// Method to check if user is the creator
eventSchema.methods.isCreator = function (userId) {
  return this.createdBy.toString() === userId.toString();
};

const Event = mongoose.model('Event', eventSchema);

export default Event;

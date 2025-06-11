import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    googleId: {
      // assign from profile.id
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      match: /.+@.+\..+/, // Basic email pattern
      trim: true,
    },
    role: {
      type: String,
      required: true,
      enum: ['admin', 'cashier', 'manager'],
      default: 'cashier',
    },
    lastLogin: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }, // for automatic createdAt and updatedAt fields
);

export default mongoose.model('User', userSchema);

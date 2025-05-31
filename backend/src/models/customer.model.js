import mongoose from 'mongoose';

const customerSchema = new mongoose.Schema({
  firstName: {
    type: String,
    default: 'unknown',
    trim: true,
  },
  lastName: {
    type: String,
    default: 'unknown',
    trim: true,
  },
  email: {
    type: String,
    required: true,
    match: /.+@.+\..+/, // Basic email pattern
    trim: true,
  },
  phone: {
    type: String,
    match: /^[0-9+\-()\s]{7,20}$/, // Basic phone format
    required: true,
    trim: true,
  },
  address: {
    type: String,
    required: false,
    trim: true,
  },
  registeredAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

export default mongoose.model('Customer', customerSchema);

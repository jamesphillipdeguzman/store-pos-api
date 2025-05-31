import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    sku: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    price: {
      type: Number,
      required: true,
      default: 0,
      min: [0, 'Price must be a non-negative number'],
    },
    stock: {
      type: Number,
      required: true,
      default: 0,
      min: [0, 'Stock must be a non-negative number'],
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    supplier: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }, // for automatic createdAt and updatedAt fields
);

export default mongoose.model('Product', productSchema);

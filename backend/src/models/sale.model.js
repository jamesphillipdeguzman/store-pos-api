import mongoose from 'mongoose';

const saleSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Customer',
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    priceAtSale: {
      type: Number,
      required: true,
      default: 0,
      min: [0, 'Price at sale must be a non-negative number'],
    },
    quantity: {
      type: Number,
      required: true,
      default: 0,
      min: [0, 'Quantity must be a non-negative number'],
    },
    totalAmount: {
      type: Number,
      required: true,
      default: 0,
      min: [0, 'Total amount must be a non-negative number'],
    },
    saleDate: {
      type: Date,
      required: true,
      default: Date.now,
    },
    paymentMethod: {
      type: String,
      required: true,
      default: 'cash',
      enum: ['cash', 'credit', 'debit', 'paypal', 'gcash'],
    },
  },
  { timestamps: true }, // for automatic createdAt and updatedAt fields
);

export default mongoose.model('Sale', saleSchema);

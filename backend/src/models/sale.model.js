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
      required: false, // TODO: Change to true once Customer model is working
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: false, // TODO: Change to true once User model is working
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
    cashierName: {
      type: String,
      required: true,
      default: 'unknown',
    },
    paymentMethod: {
      type: String,
      required: true,
      default: 'cash',
      enum: ['cash', 'credit', 'debit', 'paypal', 'gcash'],
    },
  },
  { timestamps: true },
);

const Sale = mongoose.model('Sale', saleSchema);

export default Sale;

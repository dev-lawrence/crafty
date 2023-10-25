import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
  {
    reference: { type: String },
    product: [
      {
        name: { type: String },
        price: { type: String },
        quantity: { type: String },
        image: { type: String },
      },
    ],
    total: { type: Number, required: true },
    delivery_status: { type: String, default: 'pending' },
    payment_status: { type: String, required: true },
  },
  { timestamps: true }
);

const Order = mongoose.model('order', orderSchema);

export default Order;

// paystackOrder.collection.drop((error) => {
//   if (error) {
//     console.error('Error dropping reviews collection:', error);
//   } else {
//     console.log('PaystackOrder collection dropped successfully.');
//   }
// });

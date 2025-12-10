import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  products: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
      quantity: { type: Number, required: true, min: 1 },
    },
  ],
  totalAmount: { type: Number, required: true },
  shippingAddress: {    // ✅ FIXED TO OBJECT
    name: { type: String, required: true },
    phone: { type: String, required: true },
    street: { type: String, required: true },
    city: { type: String, required: true },
    postalCode: { type: String, required: true },
  },
  paymentStatus: {
    type: String,
    default: 'pending',
    enum: ['pending', 'paid', 'failed'],
  },
  orderStatus: {
    type: String,
    default: 'processing',
    enum: ['processing', 'shipped', 'delivered', 'cancelled'],
  },
}, { timestamps: true });


const Order = mongoose.model('Order', orderSchema);
export default Order

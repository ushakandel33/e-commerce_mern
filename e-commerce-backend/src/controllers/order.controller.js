import Order from '../models/Order.js';
import Cart from '../models/Cart.js';

// 🛒 Place Order
export const placeOrder = async (req, res) => {
  const { shippingAddress } = req.body;
  const userId = req.user._id;

  try {
    const cart = await Cart.findOne({ user: userId }).populate('items.product');
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: 'Cart is empty' });
    }

    const products = cart.items.map(item => ({
      product: item.product._id,
      quantity: item.quantity
    }));

    const totalAmount = cart.items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

    const newOrder = await Order.create({
      user: userId,
      products,
      totalAmount,
      shippingAddress
    });

    await Cart.findOneAndDelete({ user: userId });

    res.status(201).json({ success: true, order: newOrder });
  } catch (error) {
    console.error('Order creation failed:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// 👤 Get User's Orders
export const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).populate('products.product');
    res.status(200).json({ success: true, orders });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

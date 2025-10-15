const Order = require('../models/Order');

// create new order
exports.createOrder = async (req, res) => {
  try {
    const { items, shippingAddress, paymentMethod, totalPrice } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: "No Order Items FOUND!" });
    }

    const newOrder = await Order.create({
      user: req.user._id,
      items,
      shippingAddress,
      paymentMethod,
      totalPrice
    });

    res.status(201).json(newOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// get all orders by admin
exports.getAllOrders = async (req, res) => {
  try {
    
  } catch (error) {
    
  }
}
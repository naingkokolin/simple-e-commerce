const Order = require("../models/Order");

// * create new order
exports.createOrder = async (req, res) => {
  try {
    const { items, shippingAddress, paymentMethod, totalPrice } = req.body;

    if (!items || items.length === 0) {
      console.log("no items found");
      return res.status(400).json({ message: "No Order Items FOUND!" });
    }

    const newOrder = await Order.create({
      user: req.user._id,
      items,
      shippingAddress,
      paymentMethod,
      totalPrice,
    });

    res.status(201).json(newOrder);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

// * get all orders by admin
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("user", "username email");
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// * get orders by user
exports.getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// * get order by id
exports.getOrderById = async (req, res) => {
  const orderId = req.params.id;
  try {
    const order = await Order.findById(orderId)
      .populate("user", "username email")
      .populate("items.product", "title price category");

    if (!order) return res.status(404).json({ message: "No order found" });
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// * update order status by Admin
exports.updateOrderStatus = async (req, res) => {
  const orderId = req.params.id;
  try {
    const order = await Order.findById(orderId);
    if (!order)
      res.status(404).json({ message: "No order found to be updated!" });
    order.orderStatus = req.body.orderStatus || order.orderStatus;
    let updatedOrder = await order.save();
    // await Order.findByIdAndUpdate(orderId, { orderStatus: "Delivered" });
    res.json(updatedOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// * delete order by admin
exports.deleteOrder = async (req, res) => {
  const orderId = req.params.id;
  try {
    const order = await Order.findByIdAndDelete(orderId);
    if (!order)
      res.status(404).json({ message: "No order found to be deleted!" });
    res.json({ message: "Order deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

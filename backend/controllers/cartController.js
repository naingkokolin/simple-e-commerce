const Cart = require('../models/Cart');

// exports.createCart = async (req, res) => {
//   try {
//     const { items } = req.body;

//     if (!items || items.length === 0) {
//       return res.status(400).json({ message: "NO item in Cart!" });
//     }

//     const newCart = await Cart.create({
//       user: req.user._id,
//       items
//     });

//     res.status(201).json(newCart);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

exports.getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id }).populate('items.product', 'title price image remainingItem');
    if (!cart) {
      return res.status(200).json({ user: req.user._id, items: [] });
    }
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateCart = async (req, res) => {
  const { productId, quantity } = req.body;
  const userId = req.user._id;

  try {
    let cart = await Cart.findById(userId);
    if (!cart) {
      cart = Cart.create({user: userId, items: [{ product: productId, quantity }]});
      res.status(201).json(cart);
    }
    const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);
    if (itemIndex > -1) {
      cart.items[itemIndex].quantity = quantity;
    } else {
      cart.items.push({ product: productId, quantity });
    }
    await cart.save();
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

exports.removeItemFromCart = async (req, res) => {
  const { productId } = req.body;
  const userId = req.user._id;

  try {  
    let cart = await Cart.findById(userId);
    if (!cart) res.status(400).json({ message: "No cart is Found!" });
    cart.items = cart.items.filter(item => item.product.toString() !== productId);
    await cart.save();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
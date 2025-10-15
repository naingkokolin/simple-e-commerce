const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  remainingItem: {
    type: Number,
    required: true
  },
  inStock: {
    type: Boolean,
    required: true
  }
}, {timestamps: true});

module.exports = mongoose.model('Product', productSchema);
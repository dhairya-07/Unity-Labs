const { Schema, model, default: mongoose } = require('mongoose');

const productSchema = new Schema({
  name: {
    type: String,
    required: [true, 'A product should have a name'],
  },
  price: {
    type: Number,
    required: [true, 'A product should have a price'],
  },
});

const Product = model('Product', productSchema);

module.exports = Product;

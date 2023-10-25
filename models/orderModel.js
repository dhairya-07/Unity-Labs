const { Schema, model, default: mongoose } = require('mongoose');

const orderSchema = new Schema({
  buyer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  products: Array,
  // products: [
  //   {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: 'Product',
  //     required: true,
  //     quantity: Number,
  //   },
  // ],
});

const Order = model('Order', orderSchema);

module.exports = Order;

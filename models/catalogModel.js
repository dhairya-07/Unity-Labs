const { Schema, model, default: mongoose } = require('mongoose');

const catalogSchema = new Schema({
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
    },
  ],
});

const Catelog = model('Catelog', catalogSchema);

module.exports = Catelog;

const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    type: {
      type: String,
      enum: ['Pure-veg', 'Non-veg', 'Eggitarian'],
      required: true
    },
    taste: {
      type: String
    },
    is_Drink: {
      type: Boolean,
      default: false
    },
    ingredients: {
      type: [String],
      default: []
    },
    num_sales: {
      type: Number,
      required: true
    }
  },
  { timestamps: true }
);

const Menu = mongoose.model('Menu', menuSchema);
module.exports = Menu;

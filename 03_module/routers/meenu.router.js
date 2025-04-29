const express = require('express');
const router = express.Router();
const Menu = require('../models/menu.model');

router.post('/', async (req, res) => {
  try {
    const { name, price, taste, type, is_Drink, ingredients, num_sales } = req.body;
    const menu = new Menu({ name, price, taste, type, is_Drink, ingredients, num_sales });
    await menu.save();
    res.status(201).json({ message: 'Menu added successfully', data: menu });
  } catch (error) {
    res.status(500).json({ message: 'Error adding menu', error: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const data = await Menu.find();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching menu', error: error.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const updatedMenu = await Menu.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedMenu) {
      return res.status(404).json({ message: 'Menu not found' });
    }
    res.status(200).json({ message: 'Menu updated', data: updatedMenu });
  } catch (error) {
    res.status(500).json({ message: 'Error updating menu', error: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deletedMenu = await Menu.findByIdAndDelete(req.params.id);
    if (!deletedMenu) {
      return res.status(404).json({ message: 'Menu not found' });
    }
    res.status(200).json({ message: 'Menu deleted', data: deletedMenu });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting menu', error: error.message });
  }
});

router.get('/:type', async (req, res) => {
  try {
    const menuType = req.params.type;
    const validTypes = ['Pure-veg', 'Non-veg', 'Eggitarian'];

    if (!validTypes.includes(menuType)) {
      return res.status(400).json({ message: 'Invalid menu type' });
    }

    const items = await Menu.find({ type: menuType });
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching menu by type', error: error.message });
  }
});

module.exports = router;

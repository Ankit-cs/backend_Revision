const express = require('express');
const router = express.Router();
const Person = require('../models/person.models');

router.post('/', async (req, res) => {
  try {
    const { name, age, work, mobile, email, address, salary } = req.body;
    const newPerson = new Person({ name, age, work, mobile, email, address, salary });
    await newPerson.save();
    res.status(201).json({ message: 'Person added successfully', data: newPerson });
  } catch (error) {
    res.status(500).json({ message: 'Error adding person', error: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const data = await Person.find();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching persons', error: error.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const updatedPerson = await Person.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedPerson) {
      return res.status(404).json({ message: 'Person not found' });
    }
    res.status(200).json({ message: 'Person updated', data: updatedPerson });
  } catch (error) {
    res.status(500).json({ message: 'Error updating person', error: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deletedPerson = await Person.findByIdAndDelete(req.params.id);
    if (!deletedPerson) {
      return res.status(404).json({ message: 'Person not found' });
    }
    res.status(200).json({ message: 'Person deleted', data: deletedPerson });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting person', error: error.message });
  }
});


router.get('/:work', async (req, res) => {
  try {
    const worktype = req.params.work;
    if (['chef', 'manager', 'waiter'].includes(worktype)) {
      const response = await Person.find({ work: worktype });
      res.status(200).json(response);
    } else {
      res.status(404).json({ error: 'Invalid work type' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;

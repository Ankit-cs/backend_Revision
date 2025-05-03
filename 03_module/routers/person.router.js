const express = require("express");
const router = express.Router();
const Person = require("../models/person.models");
const { generateToken, jwtAuth } = require("../middleware/jwtAuth");
router.post("/signup", async (req, res) => {
  try {
    const {
      name,
      age,
      work,
      mobile,
      email,
      address,
      salary,
      username,
      password,
    } = req.body;
    const newPerson = new Person({
      name,
      age,
      work,
      mobile,
      email,
      address,
      salary,
      username,
      password,
    });
    await newPerson.save();

    const payload = {
      id: newPerson.id,
      username,
    };

    console.log(JSON.stringify(payload));
    const token = generateToken(payload);
    console.log("Token is:", token);
    res.status(201).json({ person: newPerson, token });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error adding person", error: error.message });
  }
});
//login route for token to be expires
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await Person.findOne({ username });
    
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    const payload = {
      id: user.id,
      username: user.username
    };

    const token = generateToken(payload);
    res.json({ token });
    
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/profile',jwtAuth, async (req, res) => {
  try {
    const userData = req.userPayload;  // Corrected this line
    console.log("User Data:", userData);
    const userId = userData.id;
    const user = await Person.findById(userId);
    res.status(200).json({ user });
    
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});


router.get("/", jwtAuth,async (req, res) => {
  try {
    const data = await Person.find();
    res.status(200).json(data);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching persons", error: error.message });
  }
});
router.put("/:id", async (req, res) => {
  try {
    const updatedPerson = await Person.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedPerson) {
      return res.status(404).json({ message: "Person not found" });
    }
    res.status(200).json({ message: "Person updated", data: updatedPerson });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating person", error: error.message });
  }
});
router.delete("/:id", async (req, res) => {
  try {
    const deletedPerson = await Person.findByIdAndDelete(req.params.id);
    if (!deletedPerson) {
      return res.status(404).json({ message: "Person not found" });
    }
    res.status(200).json({ message: "Person deleted", data: deletedPerson });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting person", error: error.message });
  }
});
router.get("/:work", async (req, res) => {
  try {
    const worktype = req.params.work;
    if (["chef", "manager", "waiter"].includes(worktype)) {
      const response = await Person.find({ work: worktype });
      res.status(200).json(response);
    } else {
      res.status(404).json({ error: "Invalid work type" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});
module.exports = router;

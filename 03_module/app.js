const express = require("express");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const PORT = 3000;
const db = require("./models/db.model");
const person = require("./models/person.models");
const meenu=require('./models/menu.model')

app.post("/person", async (req, res) => {
  try {
    const { name, age, work, mobile, email, address, salary } = req.body;

    const newPerson = new person({
      name,
      age,
      work,
      mobile,
      email,
      address,
      salary,
    });

    await newPerson.save();
    res
      .status(201)
      .json({ message: "Person added successfully", data: newPerson });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error adding person", error: error.message });
  }
});


app.post("/createMenu", async (req, res) => {
  try {
    const { name, price, taste, type, is_Drink, ingredients, num_sales } = req.body;

    const menu = new meenu({
      name,
      price,
      type,
      taste,
      is_Drink,
      ingredients,
      num_sales,
    });

    await menu.save();
    res
      .status(201)
      .json({ message: "Menu added successfully", data: menu });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error adding Menu", error: error.message });
  }
});

app.get("/fullMenu", async (req, res) => {
  try {
    const data = await meenu.find();
    res.status(200).json(data);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error adding person", error: error.message });
  }
});


app.get("/getAll", async (req, res) => {
  try {
    const data = await person.find();
    res.status(200).json(data);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error adding person", error: error.message });
  }
});

app.get("/", (req, res) => {
  res.send("Hey it's me your server");
});
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});

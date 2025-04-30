const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000 ;
const db = require("./models/db.model");
const personRoutes = require('./routers/person.router');
const menuRoutes = require('./routers/meenu.router');
require('dotenv').config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/person', personRoutes);
app.use('/menu', menuRoutes);

app.get("/",(req,res)=>{
  res.send("Welcome to our Dhabbha......");
})
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});

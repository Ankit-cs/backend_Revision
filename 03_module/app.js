const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000 ;
const db = require("./models/db.model");
const personRoutes = require('./routers/person.router');
const menuRoutes = require('./routers/meenu.router');
const passport = require('./middleware/Oauth');
const bcrypt=require('bcrypt');
const pokie=require('cookie-parser')
const jwt=require('jsonwebtoken');
require('dotenv').config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//middleware function -->requesti intialted hoteu hi call karega
const localtime = (req, res, next) => {
  console.log(`[${new Date().toLocaleString()}] Request made to: ${req.originalUrl}`);
  next();//-->function callback
};
// app.use(localtime);//->now it will work for requst i willmade
app.use(passport.initialize());
const localAuth=passport.authenticate('local',{session:false});


app.get("/",(req,res)=>{
  res.send("Welcome to our Dhabbha......");
})


app.use('/person',personRoutes);
app.use('/menu', menuRoutes);


app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});

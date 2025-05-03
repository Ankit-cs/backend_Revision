const person = require("../models/person.models");
const passport = require("passport");
const Strategy = require("passport-local").Strategy;

passport.use(
  new Strategy(async (username, password, done) => {
    try {
      const user = await person.findOne({ username: username });
      if (!user) {
        return done(null, false, { message: "Incorrect username." });
      }

      const isCorrect =await  user.comparePassword(password);
      if (!isCorrect) {
        return done(null, false, { message: "Incorrect password" });
      }

      return done(null, user);
    } catch (err) {
      return done(err);
    }
  })
);
module.exports = passport;

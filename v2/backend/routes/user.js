const express = require("express");
const router = express.Router();
const User = require("../database/models/users");
const passport = require("../passport");

router.post("/", (req, res) => {
  console.log("user signup");

  const { username, password } = req.body;
  console.log("username", username);
  // ADD VALIDATION
  User.findOne({ username: username }, (err, user) => {
    if (err) {
      console.log("User.js post error: ", err);
    } else if (user) {
      console.log("already exists");
      res.json({
        error: `Sorry, already a user with the username: ${username}`
      });
    } else {
      console.log("reached creation...");
      const newUser = new User({
        username: username,
        password: password
      });
      console.log("newUser", newUser);
      newUser.save((err, savedUser) => {
        if (err) return res.json(err);
        else res.json(savedUser);
      });
    }
  });
});

router.post(
  "/login",
  function(req, res, next) {
    console.log("routes/user.js, login, req.body: ");
    console.log(req.body);
    next();
  },
  passport.authenticate("local"),
  (req, res) => {
    console.log("logged in", req.user);
    var userInfo = {
      username: req.user.username
    };
    res.send(userInfo);
  }
);

router.get("/", (req, res, next) => {
  console.log("===== user!!======");
  console.log(req.user);
  if (req.user) {
    res.json({ user: req.user });
  } else {
    res.json({ user: null });
  }
});

router.post("/logout", (req, res) => {
  if (req.user) {
    req.logout();
    res.send({ msg: "logging out" });
  } else {
    res.send({ msg: "no user to log out" });
  }
});

module.exports = router;

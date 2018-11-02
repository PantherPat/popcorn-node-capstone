const { User } = require("../models/users");
const express = require("express");
const router = express.Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");

router.post("/signup", (req, res) => {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;

  User.create({
    email: req.body.email,
    username: req.body.username,
    password: req.body.password
  })
    .then(user => {
      const body = user.serialize();
      // Generate jwt with the contents of user object
      const token = jwt.sign(body, JWT_SECRET);
      return res.json({ token });
    })
    .catch(err => {
      if (err.code === 11000) {
        return res.status(400).json({ error: "User already exists." });
      }
    });
});

router.post("/login", function(req, res, next) {
  passport.authenticate("login", { session: false }, (err, user, info) => {
    if (err || !user) {
      res.statusMessage = info.message;
      return res.status(400).json(res.statusMessage);
    }

    req.login(user, { session: false }, err => {
      if (err) {
        res.status(400).json(err);
      }

      const body = user.serialize();
      // Generate jwt with the contents of user object
      const token = jwt.sign(body, JWT_SECRET);
      return res.json({ token });
    });
  })(req, res);
});

module.exports = router;

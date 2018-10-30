"use strict";

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    trim: true,
    unique: true,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    trime: true,
    required: true
  }
});

// pre-hook to hash password
UserSchema.pre("save", async function(next) {
  console.log(this, "users.js, line 26");

  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;
  // return back to route /signup
  next();
});

UserSchema.methods.validatePassword = async function (password) {
    console.log("users.js, line 35");
    const user = this;
    // wait for the Promise to resolve
    const compare = await bcrypt.compare(password, user.password);
    return compare;
};

// when we call validatePassword, we can chain .catch()

const User = mongoose.model("User", UserSchema);

exports.User = User;

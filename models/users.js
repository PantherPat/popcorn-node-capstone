'use strict';

const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        trim: true,
        unique: true,
        required: true
    },
    email:  {
        type: String,
        required: true
    },
    password: {
        type: String,
        trime: true,
        required: true
    }
});



const User = mongoose.model('User', UserSchema);

exports.User = User;

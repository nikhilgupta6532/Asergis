const mongoose = require('mongoose');
const { Schema } = mongoose;
const validator = require('validator');

const userSchema = new Schema({
  fullName: {
    type: String,
    required: true,
    minLength: 1,
    trim: true
  },
  emailId: {
    type: String,
    required: true,
    minLength: 1,
    trim: true,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: '{value} is not a valid email'
    }
  },
  userName: {
    type: String,
    required: true,
    minLength: 1,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minLength: 1,
    trim: true
  }
});

mongoose.model('users', userSchema);

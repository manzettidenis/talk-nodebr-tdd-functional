const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
  active: {
    type: Boolean,
    default: true
  },
  username: {
    type: String, 
    lowercase: true, 
    unique: true,
    required: [true, "can't be blank"], 
    match: [/\S+@\S+\.\S+/, 'is invalid'], 
    index: true 
  },
  password: {
      type: String,
      required: [true, "can't be blank"]
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
  deleted_at: {
    type: Date,
    default: Date.now,
  }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
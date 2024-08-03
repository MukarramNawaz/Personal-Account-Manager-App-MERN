// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  accountBalance: { type: Number, default: 0 },
  income: { type: Number, default: 0 },
  expenses: { type: Number, default: 0 },
  transactions: [
    {
      text: String,
      amount: Number,
      
    },
  ],
});

const User = mongoose.model('User', userSchema);

module.exports = User;

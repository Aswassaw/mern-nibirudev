const mongoose = require("mongoose");

const TokenScheme = new mongoose.Schema({
  token: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  type: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

const Token = mongoose.model("token", TokenScheme);

module.exports = Token;

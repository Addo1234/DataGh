const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  phone: String,
  password: String,
  role: { type: String, default: "user" },
  balance: { type: Number, default: 0 },
  referralCode: String,
  referredBy: String
});

module.exports = mongoose.model("User", userSchema);

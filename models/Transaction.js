const mongoose = require("mongoose");

const txSchema = new mongoose.Schema({
  userId: String,
  network: String,
  phone: String,
  amount: Number,
  status: String,
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Transaction", txSchema);

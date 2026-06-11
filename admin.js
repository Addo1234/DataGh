const router = require("express").Router();
const User = require("../models/User");
const Transaction = require("../models/Transaction");

// GET USERS
router.get("/users", async (req, res) => {
  const users = await User.find();
  res.json(users);
});

// GET TRANSACTIONS
router.get("/transactions", async (req, res) => {
  const tx = await Transaction.find();
  res.json(tx);
});

module.exports = router;

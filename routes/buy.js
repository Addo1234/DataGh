const router = require("express").Router();
const Transaction = require("../models/Transaction");

router.post("/airtime", async (req, res) => {
  const { userId, network, phone, amount } = req.body;

  const tx = await Transaction.create({
    userId,
    network,
    phone,
    amount,
    status: "success"
  });

  res.json({
    message: "Airtime purchased successfully",
    tx
  });
});

module.exports = router;

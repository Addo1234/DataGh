DataGh 
package.json {
  "name": "vtu-app",
  "version": "1.0.0",
  "main": "server.js",
  "dependencies": {
    "bcryptjs": "^2.4.3",
    "cors": "^2.8.5",
    "dotenv": "^16.0.0",
    "express": "^4.18.0",
    "jsonwebtoken": "^9.0.0",
    "mongoose": "^7.0.0"
  }
}
env PORT=5000
MONGO_URI=your_mongodb_url
JWT_SECRET=secret123
server.js const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

app.use("/auth", require("./routes/auth"));
app.use("/buy", require("./routes/buy"));

app.listen(process.env.PORT, () => {
  console.log("Server running on port " + process.env.PORT);
}); User.js const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  phone: String,
  password: String,
  balance: { type: Number, default: 0 }
});

module.exports = mongoose.model("User", userSchema);⸻

Transaction.jsconst mongoose = require("mongoose");

const schema = new mongoose.Schema({
  phone: String,
  network: String,
  amount: Number,
  status: String,
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Transaction", schema);routes/auth.jsconst router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// REGISTER
router.post("/register", async (req, res) => {
  const { name, phone, password } = req.body;

  const hashed = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    phone,
    password: hashed
  });

  res.json(user);
});

// LOGIN
router.post("/login", async (req, res) => {
  const { phone, password } = req.body;

  const user = await User.findOne({ phone });
  if (!user) return res.json({ error: "User not found" });

  const ok = await bcrypt.compare(password, user.password);
  if (!ok) return res.json({ error: "Wrong password" });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

  res.json({ token, user });
});

module.exports = router;buy.jsconst router = require("express").Router();
const Transaction = require("../models/Transaction");

// SIMPLE AIRTIME SYSTEM (MOCK)
router.post("/airtime", async (req, res) => {
  const { phone, network, amount } = req.body;

  const tx = await Transaction.create({
    phone,
    network,
    amount,
    status: "success"
  });

  res.json({ message: "Airtime sent", tx });
});

module.exports = router;<!DOCTYPE html>
<html>
<head>
  <title>VTU APP</title>
</head>
<body>

  <h1>VTU SYSTEM</h1>

  <h2>Register</h2>
  <input id="rname" placeholder="Name">
  <input id="rphone" placeholder="Phone">
  <input id="rpass" placeholder="Password">
  <button onclick="register()">Register</button>

  <h2>Login</h2>
  <input id="lphone" placeholder="Phone">
  <input id="lpass" placeholder="Password">
  <button onclick="login()">Login</button>

  <h2>Buy Airtime</h2>
  <input id="phone" placeholder="Phone">
  <input id="amount" placeholder="Amount">
  <button onclick="buy()">Buy</button>

  <script src="app.js"></script>
</body>
</html> public/app.jsconst API = "http://localhost:5000";

// REGISTER
async function register() {
  await fetch(API + "/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: rname.value,
      phone: rphone.value,
      password: rpass.value
    })
  });

  alert("Registered");
}

// LOGIN
async function login() {
  const res = await fetch(API + "/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      phone: lphone.value,
      password: lpass.value
    })
  });

  const data = await res.json();
  localStorage.setItem("user", JSON.stringify(data.user));

  alert("Logged in");
}

// BUY AIRTIME
async function buy() {
  await fetch(API + "/buy/airtime", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      phone: phone.value,
      network: "MTN",
      amount: amount.value
    })
  });

  alert("Airtime sent");
}Backendnpm install
node server.js Open websitehttp://localhost:5000

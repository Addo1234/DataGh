import { useState } from "react";
import axios from "axios";

export default function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [network, setNetwork] = useState("MTN");
  const [phone, setPhone] = useState("");
  const [amount, setAmount] = useState("");

  const buy = async () => {
    await axios.post("http://localhost:5000/buy/airtime", {
      userId: user._id,
      network,
      phone,
      amount
    });

    alert("Airtime sent!");
  };

  return (
    <div>
      <h2>Welcome {user.name}</h2>

      <select onChange={e => setNetwork(e.target.value)}>
        <option>MTN</option>
        <option>AirtelTigo</option>
        <option>Telecel</option>
      </select>

      <input placeholder="Phone" onChange={e => setPhone(e.target.value)} />
      <input placeholder="Amount" onChange={e => setAmount(e.target.value)} />

      <button onClick={buy}>Buy Airtime</button>
    </div>
  );
}

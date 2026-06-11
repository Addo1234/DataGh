import { useState } from "react";
import axios from "axios";

export default function Login() {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    const res = await axios.post("http://localhost:5000/auth/login", {
      phone,
      password
    });

    localStorage.setItem("user", JSON.stringify(res.data.user));
    alert("Login successful");
  };

  return (
    <div>
      <h2>Login</h2>

      <input placeholder="Phone" onChange={e => setPhone(e.target.value)} />
      <input placeholder="Password" type="password" onChange={e => setPassword(e.target.value)} />

      <button onClick={login}>Login</button>
    </div>
  );
}

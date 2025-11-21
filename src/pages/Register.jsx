import { useState } from "react";
import { registerUser, setToken } from "../api";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const nav = useNavigate();

  async function handleRegister() {
    try {
      const data = await registerUser({ username, password });
      setToken(data.token);
      nav("/"); // go to decks page
    } catch (err) {
      alert("Registration failed");
    }
  }

  return (
    <div>
      <h1>Register</h1>

      <input
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      /><br />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      /><br />

      <button onClick={handleRegister}>Register</button>
      <Link to={"/login"}>Login</Link>
    </div>
  );
}

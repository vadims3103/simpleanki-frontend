import { useState } from "react";
import { loginUser, setToken } from "../api";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const nav = useNavigate();

  async function handleLogin() {
    try {
      const data = await loginUser({ username, password });
      setToken(data.token);
      nav("/");
    } catch (err) {
      alert("Login failed");
    }
  }

  return (
    <div>
      <h1>Login</h1>

      <input
        placeholder="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      /><br />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      /><br />

      <button onClick={handleLogin}>Login</button>
      <Link to={"/register"}>Register</Link>
    </div>
  );
}

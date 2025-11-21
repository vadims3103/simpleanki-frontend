import React from "react";
import { useNavigate } from "react-router-dom";
import { getToken, setToken } from "../api";

export default function Header() {
  const navigate = useNavigate();

  const handleLogout = () => {
    setToken(""); // remove token
    navigate("/login"); // redirect to login page
  };

  const token = getToken();
  const isLoggedIn = !!token;

  return (
    <header style={{ padding: "1rem", borderBottom: "1px solid #ccc", marginBottom: "1rem" }}>
      <h1 style={{ display: "inline", marginRight: "2rem" }}>SimpleAnki</h1>
      {isLoggedIn && <button onClick={handleLogout}>Logout</button>}
    </header>
  );
}

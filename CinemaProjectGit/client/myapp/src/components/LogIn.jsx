import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { login, checkAuthenticated } from "./authService";
import "../CSS/LogIn.css";
export default function LogIn() {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [flag, setFlag] = useState(false);

  useEffect(() => {
    if (checkAuthenticated()) {
      navigate("/EnteryPage/movies/all");
    }
  }, []);

  const Login = async (e) => {
    try {
      e.preventDefault();

      let resp = await axios.get("http://localhost:3000/user");
      let users = resp.data;

      let index = users.findIndex((item) => item.UserName == user.UserName);
      if (index < 0) {
        alert("user name is incorrect or doesn't exist");
        return;
      }
      if (users[index].PassWord != user.PassWord) {
        alert("password is incorrect");
        return;
      }
      localStorage["Name"] = users[index].FullName;
      login();
      navigate("/EnteryPage/movies/all");
    } catch (error) {
      console.error("Error logging in:", error);
      setFlag(true);
    }
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      <form className="login-form" onSubmit={Login}>
        <input
          type="text"
          required
          placeholder="Username"
          onChange={(e) => setUser({ ...user, UserName: e.target.value })}
        />
        <input
          type="password"
          required
          placeholder="Password"
          onChange={(e) => setUser({ ...user, PassWord: e.target.value })}
        />
        <input type="submit" value="Login" />
      </form>
      {flag && (
        <h3 className="error-message">
          Error: Please check your internet connection.
        </h3>
      )}
    </div>
  );
}

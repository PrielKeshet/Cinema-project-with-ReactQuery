import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { login, checkAuthenticated } from "./authService";

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
    <>
      <h1>LogIn</h1> <br />
      <form onSubmit={Login}>
        <input
          type="text"
          required
          placeholder="userName"
          onChange={(e) => setUser({ ...user, UserName: e.target.value })}
        />
        <br />
        <br />
        <input
          type="number"
          required
          placeholder="password"
          onChange={(e) => setUser({ ...user, PassWord: +e.target.value })}
        />
        <br />
        <br />
        <input type="submit" value="LogIn" />
      </form>
      {flag && (
        <h3>Error in network connection, please connect to the internet</h3>
      )}
    </>
  );
}

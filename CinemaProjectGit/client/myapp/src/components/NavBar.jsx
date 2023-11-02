import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "./authService";
export default function NavBar() {
  const navigate = useNavigate();

  function Logout() {
    logout();
    navigate("/");
  }

  return (
    <>
      <nav
        className="nav justify-content-evenly"
        style={{ backgroundColor: "AliceBlue", height: "60px" }}
      >
        <p style={{ fontSize: "20px", lineHeight: "40px" }}>MoviesAndSubs:</p>

        <Link
          className="nav-link"
          style={{ fontSize: "20px", lineHeight: "40px" }}
          to={"/EnteryPage/movies/all"}
        >
          Movies
        </Link>

        <Link
          className="nav-link"
          style={{ fontSize: "20px", lineHeight: "40px" }}
          to={"/EnteryPage/members/all"}
        >
          Members
        </Link>

        <Link
          className="nav-link"
          style={{ fontSize: "20px", lineHeight: "40px" }}
          to={"/"}
          onClick={Logout}
        >
          Log Out
        </Link>
      </nav>
    </>
  );
}

import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "./authService";
import "../CSS/NavBar.css";
export default function NavBar() {
  const navigate = useNavigate();

  function Logout() {
    logout();
    navigate("/");
  }

  return (
    <>
      <nav className="navbar-container">
        <p className="brand-name">MoviesAndSubs:</p>

        <Link className="nav-link movie-link" to={"/EnteryPage/movies/all"}>
          Movies
        </Link>

        <Link className="nav-link member-link" to={"/EnteryPage/members/all"}>
          Members
        </Link>

        <Link className="nav-link logout-link" to={"/"} onClick={Logout}>
          Log Out
        </Link>
      </nav>
    </>
  );
}

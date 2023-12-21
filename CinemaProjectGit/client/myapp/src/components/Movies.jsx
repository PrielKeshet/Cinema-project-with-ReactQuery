import React from "react";
import { Outlet, Link } from "react-router-dom";
import "../CSS/Movies.css";
export default function Movies() {
  return (
    <div className="movies-container">
      <h2>Movies:</h2>

      <nav className="nav">
        <Link to={"/EnteryPage/movies/all"} className="nav-link">
          All Movies
        </Link>

        <Link to={"/EnteryPage/movies/add"} className="nav-link">
          Add Movie
        </Link>
      </nav>

      <Outlet />
    </div>
  );
}

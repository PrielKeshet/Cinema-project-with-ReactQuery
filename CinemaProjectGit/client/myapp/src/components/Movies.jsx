import React from "react";
import { Outlet, Link } from "react-router-dom";

export default function Movies() {
  return (
    <>
      <h2>Movies:</h2>

      <nav
        className="nav d-flex flex-row"
        style={{ backgroundColor: "Cornsilk" }}
      >
        <Link to={"/EnteryPage/movies/all"} className="nav-link">
          All Movies
        </Link>

        <Link to={"/EnteryPage/movies/add"} className="nav-link">
          Add Movie
        </Link>
      </nav>

      <Outlet />
    </>
  );
}

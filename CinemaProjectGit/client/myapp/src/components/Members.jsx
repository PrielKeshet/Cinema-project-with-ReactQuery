import React from "react";
import { Outlet, Link } from "react-router-dom";

export default function Members() {
  return (
    <>
      <h2>Members:</h2>

      <nav
        className="nav d-flex flex-row"
        style={{ backgroundColor: "DarkSalmon" }}
      >
        <Link to={"/EnteryPage/members/all"} className="nav-link">
          All Members
        </Link>

        <Link to={"/EnteryPage/members/add"} className="nav-link">
          Add Member
        </Link>
      </nav>

      <Outlet />
    </>
  );
}

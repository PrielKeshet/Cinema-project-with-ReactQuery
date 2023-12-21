import React from "react";
import { Outlet, Link } from "react-router-dom";
import "../CSS/Members.css";
export default function Members() {
  return (
    <>
      <div className="members-container">
        <h2 className="members-heading">Members:</h2>

        <nav className="members-nav">
          <Link to={"/EnteryPage/members/all"} className="members-link">
            All Members
          </Link>
          <Link to={"/EnteryPage/members/add"} className="members-link">
            Add Member
          </Link>
        </nav>

        <Outlet />
      </div>
    </>
  );
}

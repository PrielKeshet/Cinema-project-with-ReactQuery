import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { checkAuthenticated } from "./authService";

export default function EnteryPage() {
  const name = localStorage["Name"];
  const navigate = useNavigate();

  useEffect(() => {
    if (!checkAuthenticated()) {
      navigate("/");
    }
  }, []);

  const { error: moviesError } = useQuery(["movies"], async () => {
    const response = await axios.get("http://localhost:3000/movie");
    return response.data;
  });

  const { error: subsError } = useQuery(["subs"], async () => {
    const response = await axios.get("http://localhost:3000/sub");
    return response.data;
  });

  const { error: membersError } = useQuery(["members"], async () => {
    const response = await axios.get("http://localhost:3000/member");
    return response.data;
  });

  if (moviesError || subsError || membersError) {
    return (
      <>
        <NavBar />
        {name}
        <h2>Error fetching data. Please try to connect to the internet</h2>
      </>
    );
  }

  return (
    <>
      <NavBar />
      {name}
      <br />
      <br />
      <Outlet />
    </>
  );
}

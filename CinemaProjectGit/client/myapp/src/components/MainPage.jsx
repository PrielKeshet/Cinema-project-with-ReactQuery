import React from "react";
import { Routes, Route } from "react-router-dom";
import LogIn from "./LogIn";
import EnteryPage from "./EnteryPage";
import Movies from "./Movies";
import AllMovies from "./AllMovies";
import AddMovie from "./AddMovie";
import EditMovie from "./EditMovie";
import Members from "./Members";
import AllMembers from "./AllMembers";
import AddMember from "./AddMember";
import EditMember from "./EditMember";

export default function MainPage() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LogIn />} />

        <Route path="/EnteryPage" element={<EnteryPage />}>
          <Route path="movies" element={<Movies />}>
            <Route path="all" element={<AllMovies />} />
            <Route path="add" element={<AddMovie />} />
            <Route path="edit/:id" element={<EditMovie />} />
          </Route>

          <Route path="members" element={<Members />}>
            <Route path="all" element={<AllMembers />} />
            <Route path="add" element={<AddMember />} />
            <Route path="edit/:id" element={<EditMember />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

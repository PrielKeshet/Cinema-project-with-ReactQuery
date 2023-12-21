import React, { useEffect, useState } from "react";
import Movie from "./Movie";
import { useQuery } from "@tanstack/react-query";
import "../CSS/AllMovies.css";
export default function AllMovies() {
  const [search, setSearch] = useState("");
  const [copy, setCopy] = useState([]);

  const { isLoading, data, error } = useQuery(["movies"], {
    enabled: false,
  });

  useEffect(() => {
    if (data) {
      setCopy(data);
    }
  }, [data]);

  //search by name
  function Find() {
    setCopy(data.filter((item) => item.Name.includes(search)));
  }

  if (isLoading) {
    return <h3>Loading...</h3>;
  }
  if (error) {
    return <h3 className="error-message">There is an error: {error}</h3>;
  }

  return (
    <div className="container">
      <div className="search-section">
        <p>Search:</p>
        <input
          type="text"
          className="search-input"
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
        <button className="search-button" onClick={() => Find()}>
          Find movie
        </button>
      </div>
      <br />
      {copy.map((item) => {
        return <Movie key={item._id} movie={item} />;
      })}
      {copy.length === 0 && (
        <p className="no-movies">No movies under that name</p>
      )}
    </div>
  );
}

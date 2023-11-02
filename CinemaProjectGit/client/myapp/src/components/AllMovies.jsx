import React, { useEffect, useState } from "react";
import Movie from "./Movie";
import { useQuery } from "@tanstack/react-query";

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
    return <h3>there is an error: {error}</h3>;
  }

  return (
    <>
      <div>
        <p>Search:</p>
        <input
          type="text"
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
        <button onClick={() => Find()}>find movie</button>
      </div>
      <br />
      {copy.map((item) => {
        return <Movie key={item._id} movie={item} />;
      })}
      {copy.length == 0 && <p>no movies under that name</p>}
    </>
  );
}

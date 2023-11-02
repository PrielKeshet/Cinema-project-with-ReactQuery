import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
export default function AddMovie() {
  const [movie, setMovie] = useState({ Geners: [] });
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const genersArray = [
    "Action",
    "Comedy",
    "Drama",
    "Fantasy",
    "Horror",
    "Mystery",
    "Romance",
    "Thriller",
    "Western",
  ];

  const AddMovie = useMutation({
    mutationFn: async (newMovie) => {
      try {
        const response = await axios.post(
          "http://localhost:3000/movie",
          newMovie
        );
        return response.data;
      } catch (error) {
        throw error;
      }
    },
    onSuccess: (data) => {
      queryClient.setQueriesData(["movies"], (prevData) => {
        return [...prevData, data];
      });
    },
    onError: (Error) => {
      console.error(Error);
    },
  });

  //add movie and vaildition
  const Add = async (e) => {
    e.preventDefault();

    //checkboxs vaildition
    if (movie.Geners.length === 0) {
      alert("select geners.");
      return;
    }

    AddMovie.mutate(movie);

    navigate("/EnteryPage/movies/all");
  };

  // change geners for movie geners
  const ChngeGeners = (Gener) => {
    if (movie.Geners.includes(Gener)) {
      setMovie({ ...movie, Geners: movie.Geners.filter((g) => g !== Gener) });
    } else {
      setMovie({ ...movie, Geners: [...movie.Geners, Gener] });
    }
  };

  return (
    <>
      <form onSubmit={Add}>
        <div style={{ border: "2px solid pink" }}>
          <p>Name:</p>
          <input
            type="text"
            required
            onChange={(e) => setMovie({ ...movie, Name: e.target.value })}
          />
          <p>Genres:</p>
          {genersArray.map((item) => {
            return (
              <label key={item}>
                <input type="checkbox" onChange={() => ChngeGeners(item)} />
                {item}
              </label>
            );
          })}
          <br />
          <p>Img:</p>
          <input
            type="text"
            required
            onChange={(e) => setMovie({ ...movie, ImgUrl: e.target.value })}
          />
          <p>Year:</p>
          <input
            type="number"
            min="1900"
            max={new Date().getFullYear()}
            required
            onChange={(e) => setMovie({ ...movie, Year: +e.target.value })}
          />{" "}
          <br />
          <br />
          <input type="submit" value="Add Movie" />
          <button
            type="button"
            onClick={() => navigate("/EnteryPage/movies/all")}
          >
            Cancel
          </button>
        </div>
      </form>
    </>
  );
}

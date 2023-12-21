import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import "../CSS/EditMovie.css";
export default function EditMovie() {
  const id = useParams().id;
  const navigate = useNavigate();
  const [movie, setMovie] = useState({ Geners: [] });
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

  const { isLoading, isError, data, error } = useQuery(["movies"], {
    enabled: false,
  });

  //get movie info by id
  useEffect(() => {
    if (data) {
      setMovie(data.find((item) => item._id === id));
    }
  }, [data]);

  // change gener for movie
  const ChngeGeners = (Gener) => {
    if (movie.Geners.includes(Gener)) {
      setMovie({ ...movie, Geners: movie.Geners.filter((g) => g !== Gener) });
    } else {
      setMovie({ ...movie, Geners: [...movie.Geners, Gener] });
    }
  };

  //update movie + checkBoxs validity
  const Update = async (e) => {
    e.preventDefault();

    //checkBoxs validity
    if (movie.Geners.length == 0) {
      alert("enter genre");
      return;
    }

    updateMovie.mutate(movie);

    navigate("/EnteryPage/movies/all");
  };

  const updateMovie = useMutation({
    mutationFn: async (newMovie) => {
      try {
        const response = await axios.put(
          `http://localhost:3000/movie/${id}`,
          newMovie
        );
        return response.data;
      } catch (error) {
        throw error;
      }
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["movies"], (prevData) => {
        const updatedMovies = prevData.map((m) =>
          m._id === data._id ? data : m
        );
        return updatedMovies;
      });
    },
    onError: (error) => {
      console.error(error);
      return <h3>there has been an error</h3>;
    },
  });

  if (isLoading) {
    return <h3>loading....</h3>;
  }

  if (isError) {
    console.error(error);
    return <h3>there has been an error: {error}</h3>;
  }

  return (
    <>
      <form onSubmit={Update}>
        <div className="edit-container">
          <p>Name:</p>
          <input
            type="text"
            required
            value={movie.Name || ""}
            onChange={(e) => setMovie({ ...movie, Name: e.target.value })}
          />
          <p>Geners:</p>
          {genersArray.map((item) => {
            return (
              <label key={item}>
                <input
                  type="checkbox"
                  checked={movie?.Geners && movie?.Geners.includes(item)}
                  onChange={() => ChngeGeners(item)}
                />
                {item}
              </label>
            );
          })}
          <br />
          <p>Img Url:</p>
          <input
            type="text"
            required
            value={movie.ImgUrl || ""}
            onChange={(e) => setMovie({ ...movie, ImgUrl: e.target.value })}
          />
          <p>Year:</p>
          <input
            type="number"
            required
            min="1900"
            max={new Date().getFullYear()}
            value={movie.Year || ""}
            onChange={(e) => setMovie({ ...movie, Year: +e.target.value })}
          />{" "}
          <br />
          <br />
          <input type="submit" value="update" />
          <button
            id="CancelBtn"
            type="button"
            onClick={() => navigate("/EnteryPage/movies/all")}
          >
            cancel
          </button>
        </div>
      </form>
    </>
  );
}

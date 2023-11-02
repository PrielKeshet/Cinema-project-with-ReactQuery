import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export default function Movie(props) {
  const {
    isLoading: isLoadingSubs,
    data: dataSubs,
    error: errorSubs,
  } = useQuery(["subs"], {
    enabled: false,
  });
  const {
    isLoading: isLoadingMembers,
    data: dataMembers,
    error: errorMembers,
  } = useQuery(["members"], {
    enabled: false,
  });

  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const mySubs = dataSubs?.filter((item) => item.MovieId == props.movie._id);

  const DeleteMovie = useMutation({
    mutationFn: async (movieId) => {
      try {
        const response = await axios.delete(
          `http://localhost:3000/movie/${movieId}`
        );
        return response.data;
      } catch (error) {
        throw error;
      }
    },
    onMutate: (deletedMovieId) => {
      queryClient.setQueriesData(["movies"], (data) => {
        return data.filter((movie) => movie._id !== deletedMovieId);
      });
    },
    onError: (error, deletedMovieId) => {
      console.error(`Error deleting movie with ID ${deletedMovieId}`, error);
    },
  });

  const DeleteSubs = useMutation({
    mutationFn: async () => {
      try {
        await Promise.all(
          mySubs.map(async (sub) => {
            await axios.delete(`http://localhost:3000/sub/${sub._id}`);
          })
        );
      } catch (error) {
        throw error;
      }
    },
    onMutate: () => {
      queryClient.setQueriesData(["subs"], (data) => {
        return data.filter((sub) => !mySubs.includes(sub));
      });
    },
    onError: (error) => {
      console.error(`Error deleting mySubs`, error);
    },
  });
  const Delete = () => {
    if (confirm("are you sure you want to delete this movie?")) {
      DeleteSubs.mutate();
      DeleteMovie.mutate(props.movie._id);
    }
  };

  return (
    <>
      <div style={{ height: "30%", width: "50%", border: "2px solid blue" }}>
        <img
          src={props.movie.ImgUrl}
          alt={props.movie.Name}
          style={{ width: "400px", height: "500px" }}
        />
        <h5>
          {props.movie.Name}, {props.movie.Year}
        </h5>
        <p>Geners:</p>
        <ul>
          {props.movie.Geners?.map((item) => {
            return <li key={item}>{item}</li>;
          })}
        </ul>
        {/* subs */}
        {errorMembers || (errorSubs && <h3>error loading movie's subs</h3>)}
        {isLoadingMembers || isLoadingSubs ? (
          <h3>loading movie's subs</h3>
        ) : (
          <div style={{ marginLeft: "20px" }}>
            <p>subs:</p>
            <ul>
              {mySubs?.map((item) => {
                return (
                  <li key={item._id}>
                    <Link to={`/EnteryPage/members/edit/${item.MemberId}`}>
                      {
                        dataMembers?.find((mem) => mem._id === item.MemberId)
                          ?.Name
                      }
                    </Link>{" "}
                    , {item.Date}
                  </li>
                );
              })}
            </ul>
          </div>
        )}
        <br />
        <button
          onClick={() => navigate(`/EnteryPage/movies/edit/${props.movie._id}`)}
        >
          Edit
        </button>{" "}
        <button onClick={() => Delete()}>Delete movie</button>
      </div>
    </>
  );
}

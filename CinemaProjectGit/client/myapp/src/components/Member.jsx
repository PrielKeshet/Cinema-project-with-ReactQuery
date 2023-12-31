import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import "../CSS/Member.css";
export default function Member(props) {
  const {
    isLoading: isLoadingSubs,
    data: dataSubs,
    error: errorSubs,
  } = useQuery(["subs"], {
    enabled: false,
  });
  const {
    isLoading: isLoadingMovies,
    data: dataMovies,
    error: errorMovies,
  } = useQuery(["movies"], {
    enabled: false,
  });
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const mySubs = dataSubs?.filter((item) => item.MemberId == props.member._id);
  const [flag, setFlag] = useState(false);
  const [newSub, setNewSub] = useState({ MemberId: props.member._id });

  //delete member and his subs
  async function Delete() {
    if (confirm("are you sure you want to delete this member??")) {
      DeleteSubs.mutate();
      DeleteMember.mutate(props.member._id);
    }
  }

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
  const DeleteMember = useMutation({
    mutationFn: async (memberId) => {
      try {
        await axios.delete(`http://localhost:3000/member/${memberId}`);
      } catch (error) {
        throw error;
      }
    },
    onMutate: (deletedMemberId) => {
      queryClient.setQueriesData(["members"], (data) => {
        return data.filter((mem) => mem._id !== deletedMemberId);
      });
    },
    onError: (error, deletedMemberId) => {
      console.error(`Error deleting member with ID ${deletedMemberId}`, error);
    },
  });

  //return all the movies that member didn't watch yet
  function filterMovies() {
    const filteredMovies = dataMovies.filter((movie) => {
      return !mySubs.some((sub) => sub.MovieId === movie._id);
    });
    return filteredMovies;
  }

  const AddSub = useMutation({
    mutationFn: async (newSub) => {
      try {
        const response = await axios.post("http://localhost:3000/sub", newSub);
        return response.data;
      } catch (error) {
        throw error;
      }
    },
    onSuccess: (data) => {
      queryClient.setQueriesData(["subs"], (prevData) => {
        return [...prevData, data];
      });
    },
    onError: (Error) => {
      console.error(Error);
    },
  });

  //add new sub to member
  async function Add(e) {
    e.preventDefault();
    AddSub.mutate(newSub);
    setFlag(false);
  }

  return (
    <>
      <div className="member-container">
        <h3>Member Details:</h3>
        <p className="member-detail">Name: {props.member.Name}</p>
        <p className="member-detail">Email: {props.member.Email}</p>
        <p className="member-detail">City: {props.member.City}</p>

        {(errorSubs || errorMovies) && (
          <h3 className="error">Error in subs: {errorSubs}</h3>
        )}
        {isLoadingSubs || isLoadingMovies ? (
          <h3>Loading subs...</h3>
        ) : (
          <div className="subs-section">
            <p className="subs-title">My Subs:</p>
            <ul className="subs-list">
              {mySubs.map((item) => {
                return (
                  <li key={item._id} className="subs-item">
                    <Link
                      to={`/EnteryPage/movies/edit/${item.MovieId}`}
                      className="subs-link"
                    >
                      {
                        dataMovies.find((movie) => movie._id === item.MovieId)
                          ?.Name
                      }
                    </Link>
                    ,{item.Date}
                  </li>
                );
              })}
            </ul>
            <button
              className="add-subscription-btn"
              onClick={() => setFlag(!flag)}
            >
              Add Subscription
            </button>

            {/* Add sub div */}
            {flag && (
              <div className="add-sub-section">
                <form onSubmit={(e) => Add(e)}>
                  <p>Add new subscription:</p>
                  <select
                    name="movies"
                    required
                    defaultValue={""}
                    id="movies"
                    onFocus={(e) =>
                      setNewSub({ ...newSub, MovieId: e.target.value })
                    }
                    onChange={(e) =>
                      setNewSub({ ...newSub, MovieId: e.target.value })
                    }
                  >
                    <option value="" disabled>
                      Movies:
                    </option>
                    {filterMovies().map((item) => {
                      return (
                        <option value={item._id} key={item._id}>
                          {item.Name}
                        </option>
                      );
                    })}
                  </select>
                  <input
                    type="date"
                    required
                    onChange={(e) =>
                      setNewSub({ ...newSub, Date: e.target.value })
                    }
                  />
                  <input type="submit" />
                </form>
              </div>
            )}
          </div>
        )}
        <br />
        <button
          className="edit-member-btn"
          onClick={() =>
            navigate(`/EnteryPage/members/edit/${props.member._id}`)
          }
        >
          Edit member
        </button>
        <button className="delete-member-btn" onClick={() => Delete()}>
          Delete member
        </button>
      </div>
    </>
  );
}

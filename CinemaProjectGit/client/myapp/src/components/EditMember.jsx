import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import "../CSS/EditMember.css";
export default function EditMember() {
  const navigate = useNavigate();
  const id = useParams().id;
  const [member, setMember] = useState({});
  const queryClient = useQueryClient();
  const { isLoading, isError, data, error } = useQuery(["members"], {
    enabled: false,
  });

  //get member info by id
  useEffect(() => {
    if (data) {
      setMember(data.find((item) => item._id === id));
    }
  }, [data]);

  //update member to db
  const Update = async (e) => {
    e.preventDefault();
    updateMember.mutate(member);
    navigate("/EnteryPage/members/all");
  };

  const updateMember = useMutation({
    mutationFn: async (newMember) => {
      try {
        const response = await axios.put(
          `http://localhost:3000/member/${id}`,
          newMember
        );
        return response.data;
      } catch (error) {
        throw error;
      }
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["members"], (prevData) => {
        const updatedMembers = prevData.map((m) =>
          m._id === data._id ? data : m
        );
        return updatedMembers;
      });
    },
    onError: (error) => {
      console.error(error);
      return <h3>there has been an error</h3>;
    },
  });

  if (isLoading) {
    return <h3>loading...</h3>;
  }

  if (isError) {
    console.error(error);
    return <h3>there has been an error: {error}</h3>;
  }

  return (
    <>
      <form className="edit-member-form" onSubmit={Update}>
        <label htmlFor="name">Name:</label>
        <input
          id="name"
          type="text"
          required
          value={member.Name || ""}
          onChange={(e) => setMember({ ...member, Name: e.target.value })}
        />
        <br />

        <label htmlFor="email">Email:</label>
        <input
          id="email"
          type="text"
          required
          value={member.Email || ""}
          onChange={(e) => setMember({ ...member, Email: e.target.value })}
        />
        <br />

        <label htmlFor="city">City:</label>
        <input
          id="city"
          type="text"
          required
          value={member.City || ""}
          onChange={(e) => setMember({ ...member, City: e.target.value })}
        />
        <br />

        <input className="submit-btn" type="submit" value="Update" />
        <br />

        <button
          className="cancel-btn"
          type="button"
          onClick={() => navigate("/EnteryPage/members/all")}
        >
          Cancel
        </button>
      </form>
    </>
  );
}

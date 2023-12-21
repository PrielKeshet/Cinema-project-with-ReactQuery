import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import "../css/AddMember.css";
export default function AddMember() {
  const navigate = useNavigate();
  const [member, setMember] = useState({});
  const queryClient = useQueryClient();

  const AddMember = useMutation({
    mutationFn: async (newMember) => {
      try {
        const response = await axios.post(
          "http://localhost:3000/member",
          newMember
        );
        return response.data;
      } catch (error) {
        throw error;
      }
    },
    onSuccess: (data) => {
      queryClient.setQueriesData(["members"], (prevData) => {
        return [...prevData, data];
      });
    },
    onError: (Error) => {
      console.error(Error);
    },
  });

  const Add = async (e) => {
    e.preventDefault();
    AddMember.mutate(member);
    navigate("/EnteryPage/members/all");
  };

  return (
    <>
      <br />
      <form className="add-member-form" onSubmit={Add}>
        Name:{" "}
        <input
          className="add-member-input"
          type="text"
          required
          onChange={(e) => setMember({ ...member, Name: e.target.value })}
        />
        <br />
        Email:{" "}
        <input
          className="add-member-input"
          type="text"
          required
          onChange={(e) => setMember({ ...member, Email: e.target.value })}
        />
        <br />
        City:{" "}
        <input
          className="add-member-input"
          type="text"
          required
          onChange={(e) => setMember({ ...member, City: e.target.value })}
        />
        <br />
        <input className="add-member-submit" type="submit" value="Add" />
        <br />
        <button
          className="add-member-cancel"
          type="button"
          onClick={() => navigate("/EnteryPage/members/all")}
        >
          cancel
        </button>
      </form>
    </>
  );
}

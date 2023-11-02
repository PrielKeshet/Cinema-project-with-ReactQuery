import React from "react";
import Member from "./Member";
import { useQuery } from "@tanstack/react-query";
export default function AllMembers() {
  const { isLoading, isError, data, error } = useQuery(["members"], {
    enabled: false,
  });

  if (isLoading) {
    return <h3>loading....</h3>;
  }

  if (isError) {
    console.error(error);
    return <h3>there is an error: {error}</h3>;
  }

  return (
    <>
      <br />
      {data?.map((item) => {
        return (
          <Member
            key={item._id}
            member={item}
            callback={() => {
              GetData();
            }}
          />
        );
      })}
      {data?.length === 0 && <h3>we're sorry, no members found</h3>}
    </>
  );
}

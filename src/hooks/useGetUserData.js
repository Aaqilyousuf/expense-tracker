import React from "react";

const useGetUserData = () => {
  const { name, userID, isAuth } =
    JSON.parse(localStorage.getItem("auth")) || {};
  return { name, userID, isAuth };
};

export default useGetUserData;

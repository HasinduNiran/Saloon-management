import React from "react";
import { useSelector } from "react-redux";

function Home() {
  const { user } = useSelector((state) => state.auth);
  return (
    <>
      <div>Home</div>
      <p>{user.name}</p>
      <p>{user._id}</p>
    </>
  );
}

export default Home;

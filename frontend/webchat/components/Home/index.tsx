import React from "react";
import Rooms from "../RoomsList";
import CreateRoom from "../CreateRoom";

const Home = () => {
  return (
    <div className="flex flex-col gap-8">
      <CreateRoom />
      <Rooms />
    </div>
  );
};

export default Home;

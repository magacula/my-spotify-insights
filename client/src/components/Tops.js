import React, { useState, useEffect } from "react";
import Tabs from "./Tabs";
import "../styles/App.css";

const Tops = () => {
  // gets the data from the JSON file
  const [userInfo, setUserInfo] = useState("");

  useEffect(() => {
    fetch("user.json")
      .then((res) => res.json())
      .then((data) => {
        setUserInfo(data);
      });
  }, []);

  return (
    <div>
      <h1>Top Lists</h1>
      <Tabs>
        <div label="Tracks">work in progress</div>
        <div label="Artists">Work in progress</div>
        <div label="Albums">Work in progress</div>
        <div label="Genres">Work in progress</div>
        <div label="Playlists">Work in progress</div>
      </Tabs>
    </div>
  );
};

export default Tops;

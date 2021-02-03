import React, { useState, useEffect } from "react";
import styled from "styled-components";

// const Tracks = ({ tracks }) => {
//   return <li style={{ marginLeft: "150px" }}>{tracks}</li>;
// };

const Tracks = styled.li``;

const RecentlyPlayed = () => {
  const [recentlyPlayed, setRecentlyPlayed] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/user/recently_played_tracks", {
      credentials: "include",
      headers: {
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setRecentlyPlayed(data.recent_tracks);
      });

    // TESTING ENDPOINT
    // fetch("/user/recently_played_tracks", {
    //   credentials: "include",
    //   //fetch("http://127.0.0.1:5000/user/test",{
    //   //mode: 'cors'
    // })
    //   .then((res) => res.text())
    //   .then((data) => console.log(data));
  }, []);

  return (
    <ol>
      {recentlyPlayed.map((track, index) => {
        return (
          <Tracks
            key={index}
            tracks={recentlyPlayed}
            {...track}
            style={{ marginLeft: "150px" }}>
            {track}
          </Tracks>
        );
      })}
    </ol>
  );
};

export default RecentlyPlayed;

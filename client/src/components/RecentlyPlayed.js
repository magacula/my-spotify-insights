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
      //credentials: 'include',
      //referrerPolicy: 'no-referrer-when-downgrade
      headers: {
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setRecentlyPlayed(data.recent_tracks);
      });
  }, []);

  return (
    <React.Fragment>
      <h1>Your Recently Played Tracks</h1>
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
    </React.Fragment>
  );
};

export default RecentlyPlayed;

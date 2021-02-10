import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Track from "./Track";

// TODO: Create separate track component later to allow a clickable for
// more info
// const Track = styled.li``;

const RecentlyPlayed = () => {
  const [recentlyPlayed, setRecentlyPlayed] = useState([]);

  useEffect(() => {
    fetch("/user/recently_played_tracks", {
      credentials: "include",
      //credentials: 'include',
      //referrerPolicy: 'no-referrer-when-downgrade
      headers: {
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.recent_tracks);
        setRecentlyPlayed(data.recent_tracks);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <React.Fragment>
      <h1>Your Recently Played Tracks</h1>
      <ul style={{ marginLeft: "160px" }}>
        {recentlyPlayed.map((track, index) => {
          return (
            <Track key={index} track={track} style={{ marginLeft: "150px" }} />
          );
        })}
      </ul>
    </React.Fragment>
  );
};

export default RecentlyPlayed;

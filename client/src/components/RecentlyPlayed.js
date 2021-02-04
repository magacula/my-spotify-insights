import React, { useState, useEffect } from "react";
import styled from "styled-components";

// TODO: Create separate track component later to allow a clickable for
// more info
const Track = styled.li``;

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
        setRecentlyPlayed(data);
      });
  }, []);

  return (
    <React.Fragment>
      <h1>Your Recently Played Tracks</h1>
      <ol>
        {Object.values(recentlyPlayed).map((trackName, index) => {
          return (
            <Track
              key={index}
              tracks={recentlyPlayed}
              {...trackName}
              style={{ marginLeft: "150px" }}>
              {trackName}
            </Track>
          );
        })}
      </ol>
    </React.Fragment>
  );
};

export default RecentlyPlayed;

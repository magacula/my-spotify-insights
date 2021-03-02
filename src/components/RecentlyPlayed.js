import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Track from "./Track";
import Loader from "./Loader";
import themes from "../styles/themes";
const { colors } = themes;

// TODO: Create separate track component later to allow a clickable for more info

const RecentlyPlayed = () => {
  const [recentlyPlayed, setRecentlyPlayed] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
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
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  }, []);

  return (
    <React.Fragment>
      <h1>Your Recently Played Tracks</h1>
      <ul style={{ marginLeft: "220px" }}>
        {recentlyPlayed.map((track, index) => {
          return (
            <Track key={index} track={track} style={{ marginLeft: "150px" }} />
          );
        })}
      </ul>
      {/* uses conditional rendering to render our loading component */}
      {loading && <Loader />}
    </React.Fragment>
  );
};

export default RecentlyPlayed;

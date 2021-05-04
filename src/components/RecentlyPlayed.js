import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Track from "./Track";
import Loader from "./Loader";
import themes from "../styles/themes";
import breakpoints from "../styles/breakpoints";
const { colors } = themes;

const PageContent = styled.ul`
  margin-left: 150px;

  @media only screen and (${breakpoints.device.med}) {
    margin-left: 100px;
  }

  @media only screen and (${breakpoints.device.sm}) {
    margin-left: 70px;
  }
`;

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

  // Retrieves ids from each object in the recentPlayed array and saves the value to the ids array
  const ids = recentlyPlayed.map((item) => item.id);

  // Filters through the recentlyPlayed array removing duplicates with the same id by comparing items with the destructed id from each object with the ids from the id array.
  let filtered = recentlyPlayed.filter(
    ({ id }, index) => !ids.includes(id, index + 1)
  );
  console.log(filtered);

  return (
    <React.Fragment>
      <h1 id="accent">Your Recently Played Tracks</h1>
      <PageContent>
        {filtered.map((track, index) => {
          return (
            <Track key={index} track={track} style={{ marginLeft: "150px" }} />
          );
        })}
      </PageContent>
      {/* uses conditional rendering to render our loading component */}
      {loading && <Loader />}
    </React.Fragment>
  );
};

export default RecentlyPlayed;

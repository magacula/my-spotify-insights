import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Track from "./Track";
import themes from "../styles/themes";
import { NavLink } from "react-router-dom";
const { colors } = themes;

// TODO: Create separate track component later to allow a clickable for
// more info
// const Track = styled.li``;

const ButtonContainer = styled.div`
  margin-left: 110px;
  display: flex;
  space: 2;
`;

const Button = styled.button`
  margin-top: 2rem;
  display: inline-block;
  background: ${colors.lightBlue};
  padding: 0.75rem 2.5rem;
  border-radius: 1.5rem;
  border-style: none;

  margin-right: 2rem;
  outline: none;
  color: ${colors.white};
  font-weight: bold;
  cursor: pointer;

  &:hover {
    transition: 0.35s;
    background: ${colors.pink};
  }
`;

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

    const handleClick = () => {

    };

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

      <h1>Your Recently Played Playlists</h1>

      <ButtonContainer>
          <Button onClick={async() => {

              try {

              } catch (error) {
                  console.log(error);
              }

          }}> Load Playlists</Button>

          {/* Load user's recent playlists */}

        </ButtonContainer>

    </React.Fragment>
  );







};

export default RecentlyPlayed;

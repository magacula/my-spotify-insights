import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Track from "./Track";
import Playlist from "./Playlist";

import themes from "../styles/themes";
import { NavLink } from "react-router-dom";
const { colors } = themes;

// TODO: Create separate track component later to allow a clickable for
// more info

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
  const [recentPlaylists] = useState([]);

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

  const handleClick = () => {};

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

      <h1>Your Playlists</h1>
      <ButtonContainer>
        <Button
          onClick={async () => {
            try {
              const response = await fetch(`/user/playlists`, {
                method: "GET",
                credentials: "include",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  name: "Recently Played Playlists",
                  public: "True",
                  //tracks: trackURIS,
                }),
              });
              console.log(response);

              if (response.ok) {
                console.log("successful");
              }
            } catch (error) {
              console.log(error);
            }
          }}>
          Load Playlists
        </Button>
        <ul style={{ marginLeft: "12rem" }}>
          {recentPlaylists.map((playlist, index) => {
            return (
              <Playlist
                key={index}
                playlist={playlist}
                style={{ marginLeft: "150px" }}
              />
            );
          })}
        </ul>
      </ButtonContainer>
    </React.Fragment>
  );
};

export default RecentlyPlayed;

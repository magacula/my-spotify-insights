import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Playlist from "./Playlist";
import themes from "../styles/themes";
const { colors } = themes;

const PlaylistsContainer = styled.div`
  margin-left: 110px;
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

const Playlists = () => {
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    fetch("/user/playlists")
      .then((res) => res.json())
      .then((data) => {
        console.log(data.playlists);
        setPlaylists(data.playlists);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <React.Fragment>
      <h1>Your Playlists</h1>

      <PlaylistsContainer style={{ marginLeft: "12rem" }}>
        {playlists.map((playlist, index) => {
          return (
            <Playlist
              key={index}
              playlist={playlist}
              style={{ marginLeft: "150px" }}
            />
          );
        })}
      </PlaylistsContainer>
    </React.Fragment>
  );
};

export default Playlists;

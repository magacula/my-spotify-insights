import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import themes from "../styles/themes";
const { colors } = themes;

const PlaylistContainer = styled(Link)`
  color: ${colors.white};
  text-align: center;
  justify-content: center;
  align-items: center;
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

const PlaylistItem = styled.li`
  margin-top: 2rem;
  margin-bottom: 1rem;
`;

const PlaylistImage = styled.img`
  width: 35%;
  margin-left: 4rem;
`;

const PlaylistInfo = styled.div`
  width: 80%;
`;

const PlaylistName = styled.h4``;

const Playlist = ({ playlist }) => {
  return (
    <PlaylistItem>
      <PlaylistContainer to={`/playlist/${playlist.id}`}>
        <PlaylistImage src={playlist.image.url} />
        <PlaylistInfo>
          <PlaylistName>{playlist.name}</PlaylistName>
        </PlaylistInfo>
      </PlaylistContainer>
    </PlaylistItem>
  );
};

export default Playlist;

import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import themes from "../styles/themes";
const { colors } = themes;

const PlaylistContainer = styled(Link)`
  color: ${colors.white};
  text-align: center;
  align-items: center;
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 100%;

  &:hover {
    transition: 0.2s ease-in;
  }
`;

const PlaylistItem = styled.div`
  width: 100%;
  height: 100%;
  display: flex;

  &:hover {
    transition: 0.2s ease-in;
    filter: brightness(105%);
    cursor: pointer;
    background-color: rgba(23, 23, 23, 0.8);
  }
`;

const PlaylistImage = styled.img`
  width: 20vw;
  height: 20vw;
  object-fit: cover;
`;

const PlaylistInfo = styled.div`
  width: 80%;
`;

const PlaylistName = styled.h4``;

const Playlist = ({ playlist }) => {
  return (
    <PlaylistItem>
      <PlaylistContainer
        to={{
          pathname: `/playlist/${playlist.id}`,
          state: {
            id: `${playlist.id}`,
            name: `${playlist.name}`,
            cover: `${playlist.images[0].url}`,
            total: `${playlist.tracks.total}`,
            uri: `${playlist.uri}`,
            owner: `${playlist.owner.display_name}`,
            description: `${playlist.description}`,
          },
        }}>
        <PlaylistImage src={playlist.images[0].url} />
        <PlaylistInfo>
          <PlaylistName>{playlist.name}</PlaylistName>
        </PlaylistInfo>
      </PlaylistContainer>
    </PlaylistItem>
  );
};

export default Playlist;

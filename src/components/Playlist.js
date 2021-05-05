import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import themes from "../styles/themes";
import { BiLockAlt, BiLockOpenAlt } from "react-icons/bi";

const { colors } = themes;

const Locked = styled(BiLockAlt)`
  fill: white;
  color: white;
  font-size: 2.5rem;
  width: 30px;
  position: absolute;
  background-color: black;
`;

const Unlocked = styled(BiLockOpenAlt)`
  fill: white;
  color: white;
  font-size: 2.5rem;
  width: 30px;
  position: absolute;
  background-color: black;
`;

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

const Playlist = ({
  playlist,
  userID,
  index,
  lock_to_unlock,
  unlock_to_lock,
}) => {
  //console.log(playlist_array);
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
          },
        }}>
        <PlaylistImage src={playlist.images[0].url} />
        <PlaylistInfo>
          <PlaylistName>{playlist.name}</PlaylistName>
        </PlaylistInfo>
      </PlaylistContainer>
      {userID == playlist.owner.id ? (
        <div style={{ position: "absolute" }}>
          {playlist.public == false ? (
            <Locked
              onClick={() => {
                console.log("Lock was pressed");
                fetch("/user/set_playlist", {
                  method: "POST",
                  credentials: "include",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    playlistID: playlist.id,
                    privacy: "private",
                    user: userID,
                  }),
                })
                  .then((response) => response.json())
                  .then((data) => console.log(data))
                  .catch((err) => console.log(err));

                lock_to_unlock(index);
              }}
            />
          ) : (
            <Unlocked
              onClick={() => {
                console.log("Lock was pressed");
                fetch("/user/set_playlist", {
                  method: "POST",
                  credentials: "include",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    playlistID: playlist.id,
                    privacy: "public",
                    user: userID,
                  }),
                })
                  .then((response) => response.json())
                  .then((data) => console.log(data))
                  .catch((err) => console.log(err));

                unlock_to_lock(index);
              }}
            />
          )}
        </div>
      ) : (
        <label
          style={{
            backgroundColor: "black",
            fontFamily: "Arial",
            fontSize: "1.2",
            position: "absolute",
          }}>
          Not Owned
        </label>
      )}
    </PlaylistItem>
  );
};

export default Playlist;

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import themes from "../styles/themes";
import { HiPlay } from "react-icons/hi";
import { Howl } from "howler";
const { colors } = themes;

// TODO:
// Component that gets all track info for a single track
// Need to fetch from (/main/track_details/<track_id>)

const PlayButton = styled(HiPlay)`
  fill: grey;
  color: white;
  font-size: 3rem;
  margin: 1rem;
  width: 65%;
  height: 90px;

  &:hover {
    fill: #65d36e;
    transition: 0.35s;
  }
`;

const TrackContainer = styled(Link)`
  color: ${colors.white};
  text-align: center;
  justify-content: center;
  align-items: center;
  display: flex;
  grid-template-columns: 1fr 1fr;

  &:hover {
    transition: 0.2s ease-in;
    cursor: pointer;
    background-color: rgba(23, 23, 23, 0.8);
  }
`;

const EditButton = styled.button`
  display: inline-block;
  background: ${colors.lightBlue};
  color: ${colors.white};
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  border-color: transparent;
  text-transform: capitalize;
  font-size: 1rem;
  letter-spacing: 0.1rem;
  margin-top: 2rem;
  margin-left: 120px;
  margin-right: 0.5rem;
  transition: all 0.3s linear;
  cursor: pointer;

  &:hover {
    transition: 0.35s;
    background: ${colors.pink};
  }
`;

const TrackItem = styled.li`
  margin-top: 2rem;
  margin-bottom: 1rem;
`;

const TrackImage = styled.img`
  width: 25%;
`;

const TrackInfo = styled.div`
  width: 80%;
`;

const TrackName = styled.h4``;

const ArtistName = styled.p``;

const AlbumName = styled.p``;

var sound;
let soundPlay = (src) => {
  sound = new Howl({
    src,
    html5: true,
  });
  sound.play();
  sound.fade(0.0, 1.0, 5000);
};

const Track = ({ track }) => {
  return (
    <TrackItem>
      <EditButton> Edit </EditButton>
      <TrackContainer
        to={{
          pathname: `/track/${track.id}`,
          state: {
            fromRecentlyPlayed: true,
            id: `${track.id}`,
            name: `${track.name}`,
            artist: `${track.artists[0].name}`,
            cover: `${track.album.images[1].url}`,
            duration_ms: `${track.duration_ms}`,
            popularity: `${track.popularity}`,
            release_date: `${track.release_date}`,
            genre: `${track.genre}`,
          },
        }}>
        <TrackImage src={track.album.images[0].url} />
        <TrackInfo>
          <TrackName>{track.name}</TrackName>
          <ArtistName>{track.artists[0].name}</ArtistName>
          <AlbumName>{track.album.name}</AlbumName>
        </TrackInfo>
        {track.preview_url == null ? (
          <div></div>
        ) : (
          <PlayButton
            onMouseEnter={() => soundPlay(track.preview_url)}
            onMouseLeave={() => {
              sound.stop();
            }}></PlayButton>
        )}
      </TrackContainer>
    </TrackItem>
  );
};

export default Track;

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

const EDIT_TRACK = "/EditTrack";

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

const EditButton = styled.button`
  display: none;
  z-index: 0;
  background: ${colors.lightBlue};
  color: ${colors.white};
  padding: 0.25rem 0.75rem;
  border-radius: 0.25rem;
  border-color: transparent;
  text-transform: capitalize;
  font-size: 1rem;
  letter-spacing: 0.1rem;
  transition: all 0.3s linear;
  cursor: pointer;
  margin: 0.25rem 0;
  position: absolute;
  transform: translate(-0%, -110%);

  &:hover {
    transition: 0.35s;
    background: ${colors.pink};
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

const TrackItem = styled.li`
  margin-top: 2rem;
  margin-bottom: 1rem;

  &:hover ${EditButton} {
    display: inline-block;
    z-index: 100;
    transition: 0.2s ease-in;
  }
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
        <TrackContainer
            to={{
              pathname: `/track/${track.id}`,
              state: {
                id: `${track.id}`,
                name: `${track.name}`,
                artist: `${track.artists[0].name}`,
                cover: `${track.album.images[1].url}`,
                duration_ms: `${track.duration_ms}`,
                popularity: `${track.popularity}`,
                release_date: `${track.release_date}`,
                genre: `${track.genre}`,
                fromRecentlyPlayed: true,
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

        <EditButton href={EDIT_TRACK}>Edit</EditButton>

      </TrackItem>
  );
};

export default Track;

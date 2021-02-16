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
`;

const TrackContainer = styled(Link)`
  color: ${colors.white};
  text-align: center;
  justify-content: center;
  align-items: center;
  display: flex;
  grid-template-columns: 1fr 1fr;
`;

const TrackItem = styled.li`
  margin-top: 2rem;
  margin-bottom: 1rem;
`;

const TrackImage = styled.img`
  width: 25%;
  margin-left: 4rem;
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
      <TrackContainer to={`/track/${track.id}`}>
        <TrackImage src={track.album.images[0].url} />
        <TrackInfo>
          <TrackName>{track.name}</TrackName>
          <ArtistName>{track.artists[0].name}</ArtistName>
          <AlbumName>{track.album.name}</AlbumName>
        </TrackInfo>
        <PlayButton
          onMouseEnter={() => soundPlay(track.preview_url)}
          onMouseLeave={() => {
            sound.stop();
          }}></PlayButton>
      </TrackContainer>
    </TrackItem>
  );
};

export default Track;

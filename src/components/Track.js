import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import themes from "../styles/themes";
const { colors } = themes;

// TODO:
// Component that gets all track info for a single track
// Need to fetch from (/main/track_details/<track_id>)

const TrackContainer = styled(Link)`
  color: ${colors.white};
  text-align: center;
  justify-content: center;
  align-items: center;
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

const TrackItem = styled.li`
  margin-top: 2rem;
  margin-bottom: 1rem;
`;

const TrackImage = styled.img`
  width: 35%;
  margin-left: 4rem;
`;

const TrackInfo = styled.div`
  width: 80%;
`;

const TrackName = styled.h4``;

const ArtistName = styled.p``;

const AlbumName = styled.p``;

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
      </TrackContainer>
    </TrackItem>
  );
};

export default Track;

import React, { useState, useEffect } from "react";
import styled from "styled-components";

const TrackContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  align-content: center;
  justify-items: center;
`;

const TrackTitle = styled.div`
  width: 100%;
  display: grid;
  align-items: center;
  align-content: right;
`;

const TrackCover = styled.img`
  width: 500px;
  margin-left: 8rem;
`;

const Track = styled.h1`
  font-size: 5rem;
  margin-top: 2rem;
  margin-left: 0;
`;

const Artist = styled.h2`
  font-size: 1.5rem;
  margin-left: 2.5rem;
  margin-top: 0.5rem;
`;

const TrackInfo = styled.div`
  margin-top: 2.5rem;
  width: 100%;
  display: grid;
  align-items: center;
  align-content: center;
  justify-items: center;
`;

const Duration = styled.p`
  font-size: 2.5rem;
  font-weight: 600;
`;

const Popularity = styled.p`
  font-size: 2.5rem;
  font-weight: 600;
`;

const TrackItem = (props) => {
  const trackId = props.location.state["id"];
  const name = props.location.state["name"];
  const artist = props.location.state["artist"];
  const imageUrl = props.location.state["cover"];
  const duration_ms = props.location.state["duration_ms"];
  const popularity = props.location.state["popularity"];

  console.log(props);

  function convertMillisecs(duration_ms) {
    let minutes = Math.floor(duration_ms / 60000);
    let seconds = ((duration_ms % 60000) / 1000).toFixed(0);
    return minutes + " min " + (seconds < 10 ? "0" : "") + seconds + " secs";
  }

  return (
    <React.Fragment>
      <div style={{ marginLeft: "100px", marginTop: "100px" }}>
        <TrackContainer>
          <TrackCover src={imageUrl} alt="" />
          <TrackTitle>
            <Track style={{ marginLeft: "2rem" }}>{name}</Track>
            <Artist>{artist}</Artist>
          </TrackTitle>
        </TrackContainer>

        <TrackInfo>
          <Duration>{`Duration: ${convertMillisecs(duration_ms)}`}</Duration>
          <Popularity>{`Popularity: ${popularity} / 100`}</Popularity>
        </TrackInfo>
      </div>
    </React.Fragment>
  );
};

export default TrackItem;

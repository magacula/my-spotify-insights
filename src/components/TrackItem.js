import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import themes from "../styles/themes";
import Loader from "./Loader";
import { NavLink } from "react-router-dom";
import TrackAudioFeatures from "./TrackAudioFeatures";
const { colors } = themes;

const Button = styled(NavLink)`
  display: inline-block;
  position: absolute;
  right: 0;
  top: 0;
  background: ${colors.lightBlue};
  color: ${colors.white};
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  border-color: transparent;
  text-transform: capitalize;
  font-size: 1rem;
  letter-spacing: 0.1rem;
  margin-top: 2rem;
  margin-top: 2rem;
  margin-right: 2rem;
  transition: all 0.3s linear;
  cursor: pointer;

  &:hover {
    transition: 0.35s;
    background: ${colors.pink};
  }
`;

const TrackContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const TrackTitle = styled.div`
  width: 100%;
  display: grid;
  align-items: center;
  align-content: center;
  margin-left: 2rem;
  margin-right: 8rem;
`;

const ImageContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-left: 8rem;
`;

const TrackCover = styled.img`
  width: 400px;
`;

const TrackName = styled.p`
  font-size: 3rem;
  margin-top: 2rem;
  font-weight: 600;
  margin-left: 2rem;
  max-width: 500px;
`;

const Artist = styled.p`
  font-size: 1.5rem;
  margin-left: 2.5rem;
  margin-top: 0.5rem;
`;

const TrackInfo = styled.div`
  margin-top: 4rem;
  width: 100%;
  display: grid;
  align-items: center;
  align-content: center;
  justify-items: center;
`;

const Duration = styled.p`
  font-size: 2rem;
  font-weight: 600;
`;

const Popularity = styled.p`
  font-size: 2rem;
  font-weight: 600;
`;

const Tempo = styled.p`
  font-size: 1.5rem;
  font-weight: 600;
`;

const Beats = styled.p`
  font-size: 1.5rem;
  font-weight: 600;
`;

const Bars = styled.p`
  font-size: 1.5rem;
  font-weight: 600;
`;

const TrackItem = (props) => {
  const {
    id,
    name,
    artist,
    cover,
    duration_ms,
    popularity,
    fromRecentlyPlayed,
    fromPlaylists,
    fromTops,
  } = props.location.state;
  console.log(props);

  const [beats, setBeats] = useState("");
  const [bars, setBars] = useState("");
  const [tempo, setTempo] = useState("");
  const [loading, setLoading] = useState(false);
  const [audioFeatures, setAudioFeatures] = useState({});

  useEffect(() => {
    setLoading(true);
    fetch(`/user/track_audio_analysis/${id}`, {
      credentials: "include",
      headers: {
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.track_audio_analysis);
        setBeats(data.track_audio_analysis.beats.length);
        setBars(data.track_audio_analysis.bars.length);
        setTempo(data.track_audio_analysis.track.tempo);
        setLoading(false);
      });

    fetch(`/user/track_audio_features/${id}`, {
      credentials: "include",
      headers: {
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.track_audio_features[0]);
        setAudioFeatures(data.track_audio_features[0]);
      });
  }, []);

  function convertMillisecs(duration_ms) {
    let minutes = Math.floor(duration_ms / 60000);
    let seconds = ((duration_ms % 60000) / 1000).toFixed(0);
    return minutes + " min " + (seconds < 10 ? "0" : "") + seconds + " secs";
  }

  return (
    <React.Fragment>
      {/* Use state value to go back to RecentlyPlayed */}
      {fromRecentlyPlayed && <Button to="/RecentlyPlayed">Go Back</Button>}
      {/* Use state value to go back to Tops */}
      {fromTops && <Button to="/Tops">Go Back</Button>}
      {/* Use state value to go back to Playlists */}
      {fromPlaylists && <Button to="/Playlists">Go Back</Button>}

      {loading ? (
        <Loader />
      ) : (
        <div style={{ marginLeft: "100px", marginTop: "4rem" }}>
          <TrackContainer>
            <ImageContainer>
              <TrackCover src={cover} alt="" />
            </ImageContainer>
            <TrackTitle>
              <TrackName>{name}</TrackName>
              <Artist>{artist}</Artist>
            </TrackTitle>
          </TrackContainer>
          <TrackInfo>
            <Duration>{`Duration: ${convertMillisecs(duration_ms)}`}</Duration>
            <Popularity>{`Popularity: ${popularity} / 100`}</Popularity>
            <Beats>{`Beats: ${beats}`}</Beats>
            <Bars>{`Bars: ${bars}`}</Bars>
            <Tempo>{`Tempo: ${Math.round(tempo)} BPM`}</Tempo>
          </TrackInfo>

          <TrackAudioFeatures features={audioFeatures} />
        </div>
      )}
    </React.Fragment>
  );
};

// Used for typechecking props of TrackItem. Ensures the data received is valid
TrackItem.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  artist: PropTypes.string,
  cover: PropTypes.string,
  duration_ms: PropTypes.string,
  popularity: PropTypes.string,
};

export default TrackItem;

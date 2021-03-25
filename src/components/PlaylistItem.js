import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import themes from "../styles/themes";
import Loader from "./Loader";
import { NavLink } from "react-router-dom";
import TrackAudioFeatures from "./TrackAudioFeatures";
import Track from "./Track";
import PlaylistTrack from "./PlaylistTrack";
const { colors } = themes;

const Button = styled(NavLink)`
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

const PlaylistTrackList = styled.ul`
  display: grid;
  justify-content: center;
`;

const PlaylistItem = (props) => {
  const { id, name, cover, total, uri } = props.location.state;
  console.log(props);

  const [playlist, setPlaylist] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(`/user/playlist/${id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data.playlist_tracks);
        setPlaylist(data.playlist_tracks);
        setLoading(false);
      });
  }, []);

  return (
    <React.Fragment>
      <Button to="/Playlists">Go Back</Button>
      {loading ? (
        <Loader />
      ) : (
        <div style={{ marginLeft: "110px", marginTop: "4rem" }}>
          <PlaylistTrackList>
            {playlist.map(({ track }, index) => {
              return <PlaylistTrack track={track} key={index} />;
            })}
          </PlaylistTrackList>

          {/* <TrackAudioFeatures features={audioFeatures} /> */}
        </div>
      )}
    </React.Fragment>
  );
};

// Used for typechecking props of TrackItem. Ensures the data received is valid
PlaylistItem.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  cover: PropTypes.string,
  total: PropTypes.number,
  uri: PropTypes.string,
};

export default PlaylistItem;

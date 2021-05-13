import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import themes from "../styles/themes";
import Loader from "./Loader";
import { NavLink } from "react-router-dom";
import TrackAudioFeatures from "./TrackAudioFeatures";
import PlaylistTrack from "./PlaylistTrack";
import breakpoints from "../styles/breakpoints";
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
  margin-top: 1rem;
  margin-top: 2rem;
  margin-right: 2rem;
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
  margin-right: 2rem;
  margin-left: 2rem;

  @media only screen and (${breakpoints.device.sm}) {
    margin-right: 1rem;
    margin-left: 0;
  }
`;

const PlaylistContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  align-content: center;
  column-gap: 4rem;
  margin: 0 auto 4rem auto;
  justify-content: center;

  @media only screen and (${breakpoints.device.med}) {
    justify-content: flex-start;
  }

  @media only screen and (${breakpoints.device.sm}) {
    column-gap: 0;
  }
`;

const PlaylistInfo = styled.div`
  display: grid;
  align-items: center;
  align-content: right;
`;

const PlaylistTitle = styled.p`
  font-weight: 600;
  font-size: 3rem;
  margin-left: 2.5rem;
  text-align: center;

  @media only screen and (${breakpoints.device.sm}) {
    font-size: 1.5rem;
    margin-left: 1.5rem;
  }
`;

const PlaylistOwner = styled.p`
  font-size: 1.5rem;
  margin-left: 2.5rem;
  margin-top: 0.5rem;
  margin-bottom: 1.5rem;
  text-align: center;

  @media only screen and (${breakpoints.device.sm}) {
    font-size: 1rem;
    margin-left: 1.5rem;
  }
`;

const PlaylistDescription = styled.p`
  font-size: 1.5rem;
  margin-left: 2.5rem;
  margin-top: 0.5rem;
  max-width: 600px;
  text-align: center;
`;

const PlaylistTotal = styled.p`
  font-size: 1.5rem;
  margin-left: 2.5rem;
  margin-top: 0.5rem;
  text-align: center;

  @media only screen and (${breakpoints.device.sm}) {
    font-size: 1rem;
    margin-left: 1.5rem;
  }
`;

const PlaylistCover = styled.img`
  width: 300px;

  @media only screen and (${breakpoints.device.med}) {
    width: 200px;
  }

  @media only screen and (${breakpoints.device.med}) {
    width: 150px;
  }
`;

const PageContent = styled.div`
  margin-left: 150px;
  margin-top: 4rem;

  @media only screen and (${breakpoints.device.med}) {
    margin-left: 110px;
  }

  @media only screen and (${breakpoints.device.sm}) {
    margin-left: 75px;
  }
`;

const PlaylistItem = (props) => {
  const { id, name, description, owner, cover, total } = props.location.state;
  console.log(props);

  const [playlist, setPlaylist] = useState([]);
  const [loading, setLoading] = useState(false);
  const [playlistAudioFeatures, setPlaylistAudioFeatures] = useState({});

  useEffect(() => {
    setLoading(true);
    fetch(`/user/playlist/${id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data.playlist_tracks);
        setPlaylist(data.playlist_tracks);
        setLoading(false);
      });

    fetch(`/user/playlist_audio_features/${id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(id);
        console.log(data);
        setPlaylistAudioFeatures(data.playlist_audio_features);
      });
  }, []);

  return (
    <React.Fragment>
      <Button to="/Playlists">Go Back</Button>
      {loading ? (
        <Loader />
      ) : (
        <PageContent>
          <PlaylistContainer>
            <PlaylistCover src={cover} alt="" />
            <PlaylistInfo>
              <PlaylistTitle>{name}</PlaylistTitle>
              <PlaylistOwner>{`by ${owner}`}</PlaylistOwner>
              {description && (
                <PlaylistDescription>{description}</PlaylistDescription>
              )}
              <PlaylistTotal>{`total tracks: ${total.toString()}`}</PlaylistTotal>
            </PlaylistInfo>
          </PlaylistContainer>
          <PlaylistTrackList>
            {playlist.map(({ track }, index) => {
              return <PlaylistTrack track={track} key={index} />;
            })}
          </PlaylistTrackList>

          <TrackAudioFeatures features={playlistAudioFeatures} />
        </PageContent>
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
  owner: PropTypes.string,
};

export default PlaylistItem;

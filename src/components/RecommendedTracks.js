import React, { useState, useEffect } from "react";
import Track from "./Track";
import styled from "styled-components";
import themes from "../styles/themes";
import { NavLink } from "react-router-dom";
const { colors } = themes;

const Link = styled(NavLink)`
  color: ${colors.lightBlue};
`;

const SpotifyLink = styled.a`
  margin-top: 2rem;
  display: inline-block;
  background: ${colors.sidePanelGray};
  padding: 0.75rem 2.5rem;
  border-radius: 1.5rem;
  border-style: none;
  margin-right: 2rem;
  outline: none;
  color: ${colors.white};
  font-weight: bold;
  font-size: 0.8rem;
  cursor: pointer;

  &:hover {
    transition: 0.35s;
    background: #65d36e;
  }
`;

const RecommendationPage = styled(NavLink)``;

const ButtonContainer = styled.div`
  margin-left: 110px;
  display: flex;
`;

const Button = styled.button`
  margin-top: 2rem;
  display: inline-block;
  background: ${colors.lightBlue};
  padding: 0.75rem 2.5rem;
  border-radius: 1.5rem;
  border-style: none;
  margin-right: 2rem;
  outline: none;
  color: ${colors.white};
  font-weight: bold;
  cursor: pointer;

  &:hover {
    transition: 0.35s;
    background: ${colors.pink};
  }
`;

const RecommendedTracks = () => {
  const [recommededTracks, setRecommendedTracks] = useState([]);
  const [trackURIS, setTrackURIS] = useState([]);
  const [showButton, setShowButton] = useState(false);
  const [showOpenButton, setShowOpenButton] = useState(false);

  const fetchData = async () => {
    try {
      const response = await fetch("/user/recommended_tracks", {
        credentials: "include",
        //referrerPolicy: 'no-referrer-when-downgrade
        headers: {
          Accept: "application/json",
        },
      });
      const data = await response.json();
      console.log(data.recommended_tracks);
      setRecommendedTracks(data.recommended_tracks);
      console.log(data.uris);
      setTrackURIS(data.uris);
    } catch (error) {
      console.log(error);
    }
  };

  const createPlaylist = async () => {
    try {
      const response = await fetch(`/user/playlists`, {
        method: "POST",
        credentials: "include",
        //referrerPolicy: 'no-referrer-when-downgrade
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: "Recommended Songs Based on Top Tracks",
          public: "True",
          tracks: trackURIS,
        }),
      });
      console.log(response);

      if (response.ok) {
        console.log("response worked!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleClick = () => {
    fetchData();
    setShowButton(true);
  };

  const handleClick2 = () => {
    setShowButton(false);
    setShowOpenButton(true);
  };

  return (
    <React.Fragment>
      <h2>
        Get Recommended Tracks Based on <Link to="/Tops">Your Top Tracks:</Link>
      </h2>
      <h3>Then save tracks to a playlist on Spotify!</h3>

      <ButtonContainer>
        <Button onclick="return false;" onClick={handleClick}>
          Get Recommendations
        </Button>
        {showButton && (
          <Button
            onclick="return false;"
            onClick={() => {
              createPlaylist();
              handleClick2();
            }}>
            Save To Spotify
          </Button>
        )}
        {showOpenButton && (
          <SpotifyLink
            onclick="return false;"
            href="https://open.spotify.com/"
            target="_blank"
            onClick={() => setShowOpenButton(false)}>
            Open to Spotify
          </SpotifyLink>
        )}
      </ButtonContainer>

      <ul style={{ marginLeft: "12rem" }}>
        {recommededTracks.map((track, index) => {
          return (
            <Track key={index} track={track} style={{ marginLeft: "150px" }} />
          );
        })}
      </ul>
    </React.Fragment>
  );
};

export default RecommendedTracks;

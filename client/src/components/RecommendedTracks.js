import React, { useState, useEffect } from "react";
import Track from "./Track";
import styled from "styled-components";
import themes from "../styles/themes";
import { NavLink } from "react-router-dom";
const { colors } = themes;

const Link = styled(NavLink)`
  color: ${colors.lightBlue};
`;

const RecommendationPage = styled(NavLink)``;

const ButtonContainer = styled.div`
  margin-left: 110px;
  display: flex;
  space: 2;
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
  const [showButton, setShowButton] = useState(false);

  const fetchData = async () => {
    try {
      const response = await fetch(
        "http://127.0.0.1:5000/user/recommended_tracks",
        {
          credentials: "include",
          //referrerPolicy: 'no-referrer-when-downgrade
          headers: {
            Accept: "application/json",
          },
        }
      );
      const data = await response.json();
      console.log(data.recommended_tracks);
      setRecommendedTracks(data.recommended_tracks);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClick = () => {
    fetchData();
    setShowButton(true);
  };

  return (
    <React.Fragment>
      <h2>
        Recommended Tracks Based on <Link to="/Tops">Your Top Tracks:</Link>
      </h2>

      <ButtonContainer>
        <Button onClick={handleClick}>Get Recommendations</Button>
        {showButton && (
          <Button
            onClick={async () => {
              try {
                const response = await fetch(
                  `http://127.0.0.1:5000/user/playlists`,
                  {
                    method: "POST",
                    credentials: "include",
                    //referrerPolicy: 'no-referrer-when-downgrade
                    mode: "cors",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                      name: "Playlist Based on Top Tracks",
                      public: "True",
                    }),
                  }
                );

                if (response.ok) {
                  console.log("response worked!");
                }
              } catch (error) {
                console.log(error);
              }
            }}>
            Save Playlist to Spotify
          </Button>
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

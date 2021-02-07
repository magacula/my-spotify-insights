import React, { useState, useEffect } from "react";
import Track from "./Track";
import styled from "styled-components";
import themes from "../styles/themes";
const { colors } = themes;

const ButtonContainer = styled.button`
  margin-top: 2rem;
  display: inline-block;
  background: ${colors.lightBlue};
  padding: 0.75rem 2.5rem;
  border-radius: 1.5rem;
  border-style: none;
  outline: none;
  color: ${colors.white};
  font-weight: bold;
  margin-left: 110px;

  &:hover {
    transition: 0.35s;
    background: ${colors.pink};
  }
`;

const RecommendedTracks = () => {
  const [recommededTracks, setRecommendedTracks] = useState([]);
  const [buttonText, setButtonText] = useState("Get Reccomendations");

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
  };

  return (
    <React.Fragment>
      <h2>Recommended Tracks Based on Your Top Tracks:</h2>
      <ButtonContainer onClick={handleClick}>
        Get Recommendations
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

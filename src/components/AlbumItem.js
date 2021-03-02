import React, { useState, useEffect } from "react";
import styled from "styled-components";
import themes from "../styles/themes";
import { NavLink } from "react-router-dom";
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

const AlbumContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  align-content: center;
  justify-items: center;
`;

const AlbumCover = styled.img`
  width: 400px;
  margin-left: 8rem;
`;

const AlbumDetails = styled.div`
  width: 100%;
  display: grid;
  align-items: center;
  align-content: center;
`;

const AlbumName = styled.h1`
  font-size: 3.25rem;
  margin-top: 2rem;
  margin-left: 2rem;
`;

const Artist = styled.h2`
  font-size: 2.5rem;
  margin-left: 2rem;
  margin-top: 0.75rem;
`;

const ReleaseDate = styled.p`
  font-size: 1.75rem;
  font-weight: 600;
  margin-left: 2rem;
  margin-top: 0.5rem;
`;

const AlbumInfo = styled.div`
  margin-top: 2rem;
  width: 100%;
  display: grid;
  align-items: center;
  align-content: center;
  justify-items: center;
`;

const TotalTracks = styled.p`
  font-size: 2.5rem;
  font-weight: 600;
`;

const AlbumItem = (props) => {
  const {
    id,
    name,
    artist,
    image,
    releaseDate,
    totalTracks,
  } = props.location.state;

  console.log(props);

  return (
    <React.Fragment>
      <Button to="/Tops">Go Back</Button>
      <div style={{ marginLeft: "100px", marginTop: "100px" }}>
        <AlbumContainer>
          <AlbumCover src={image} alt="" />
          <AlbumDetails>
            <AlbumName>{name}</AlbumName>
            <Artist>{artist}</Artist>
            <ReleaseDate>{releaseDate.substring(0, 4)}</ReleaseDate>
          </AlbumDetails>
        </AlbumContainer>

        <AlbumInfo>
          <TotalTracks>{`Total Tracks: ${totalTracks}`}</TotalTracks>
        </AlbumInfo>
      </div>
    </React.Fragment>
  );
};

export default AlbumItem;

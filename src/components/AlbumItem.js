import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import themes from "../styles/themes";
import { NavLink } from "react-router-dom";
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
  margin-top: 2rem;
  margin-right: 2rem;
  transition: all 0.3s linear;
  cursor: pointer;

  &:hover {
    transition: 0.35s;
    background: ${colors.pink};
  }

  @media only screen and (${breakpoints.device.sm}) {
    margin-right: 1rem;
  }
`;

const AlbumContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  align-content: center;
  justify-items: center;

  @media only screen and (${breakpoints.device.sm}) {
    display: grid;
  }
`;

const AlbumCover = styled.img`
  width: 400px;
  margin-left: 8rem;

  @media only screen and (${breakpoints.device.med}) {
    width: 200px;
    margin-left: 4rem;
  }

  @media only screen and (${breakpoints.device.sm}) {
    width: 150px;
    margin-left: 0;
    margin-top: 2rem;
  }
`;

const AlbumDetails = styled.div`
  width: 100%;
  display: grid;
  align-items: center;
  align-content: center;

  @media only screen and (${breakpoints.device.sm}) {
    text-align: center;
  }
`;

const AlbumName = styled.h1`
  font-size: 3.25rem;
  margin-top: 2rem;
  margin-left: 2rem;

  @media only screen and (${breakpoints.device.med}) {
    font-size: 2.5rem;
  }

  @media only screen and (${breakpoints.device.med}) {
    margin-left: 1rem;
  }
`;

const Artist = styled.h2`
  font-size: 2.5rem;
  margin-left: 2rem;
  margin-top: 0.75rem;

  @media only screen and (${breakpoints.device.med}) {
    font-size: 1.5rem;
    margin-left: 1rem;
  }

  @media only screen and (${breakpoints.device.sm}) {
    margin-left: 1rem;
  }
`;

const ReleaseDate = styled.p`
  font-size: 1.75rem;
  margin-left: 2rem;
  margin-top: 0.5rem;

  @media only screen and (${breakpoints.device.med}) {
    font-size: 1rem;
    margin-left: 1rem;
  }
  @media only screen and (${breakpoints.device.sm}) {
    margin-left: 0rem;
  }
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

  @media only screen and (${breakpoints.device.med}) {
    font-size: 2rem;
  }
`;

const PageContent = styled.div`
  margin-left: 100px;
  margin-top: 4rem;

  @media only screen and (${breakpoints.device.med}) {
    margin-left: 70px;
  }

  @media only screen and (${breakpoints.device.sm}) {
    margin-left: 55px;
  }
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
      <Button to="/Tops/Albums">Go Back</Button>
      <PageContent>
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
      </PageContent>
    </React.Fragment>
  );
};

// Used for typechecking props of TrackItem. Ensures the data received is valid
AlbumItem.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  artist: PropTypes.string,
  image: PropTypes.string,
  releaseDate: PropTypes.string,
  totalTracks: PropTypes.string,
};

export default AlbumItem;

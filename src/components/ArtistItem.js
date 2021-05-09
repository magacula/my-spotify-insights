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
  margin-top: 2rem;
  margin-right: 2rem;
  transition: all 0.3s linear;
  cursor: pointer;

  &:hover {
    transition: 0.35s;
    background: ${colors.pink};
  }
`;

const ArtistContainer = styled.div`
  width: 100%;
  display: grid;
  align-items: center;
  align-content: center;
  justify-items: center;
`;

const ArtistImg = styled.img`
  border-radius: 50%;

  @media only screen and (${breakpoints.device.med}) {
    width: 250px;
    height: 250px;
  }

  @media only screen and (${breakpoints.device.sm}) {
    width: 200px;
    height: 200px;
  }
`;

const ArtistName = styled.h2`
  font-size: 4rem;
  margin-top: 2rem;
  margin-left: 0;

  @media only screen and (${breakpoints.device.med}) {
    font-size: 3rem;
  }
`;

const ArtistInfo = styled.div`
  margin-top: 2.5rem;
  width: 100%;
  display: grid;
  align-items: center;
  align-content: center;
  justify-items: center;

  @media only screen and (${breakpoints.device.med}) {
    font-size: 2rem;
  }
`;

const Popularity = styled.p`
  font-size: 2.5rem;
  font-weight: 600;

  @media only screen and (${breakpoints.device.sm}) {
    font-size: 1.5rem;
  }
`;

const Followers = styled.p`
  font-size: 2.5rem;
  font-weight: 600;

  @media only screen and (${breakpoints.device.sm}) {
    font-size: 1.5rem;
  }
`;

const Genres = styled.ul`
  font-size: 1.5rem;
  font-weight: 600;
  margin-top: 2rem;
  text-align: center;
  width: 100%;
  display: grid;
  align-items: center;
  align-content: center;
  justify-items: center;
`;

const GenreType = styled.li`
  font-size: 2.5rem;
  font-weight: 600;

  @media only screen and (${breakpoints.device.med}) {
    font-size: 2rem;
  }

  @media only screen and (${breakpoints.device.sm}) {
    font-size: 1.5rem;
  }
`;

const PageContent = styled.div`
  margin-left: 100px;
  margin-top: 2rem;

  @media only screen and (${breakpoints.device.sm}) {
    margin-left: 50px;
    margin-top: 6rem;
  }
`;

const ArtistItem = (props) => {
  const {
    id,
    name,
    popularity,
    image,
    followers,
    genres,
  } = props.location.state;

  console.log(props);

  return (
    <React.Fragment>
      <Button to="/Tops/Artists">Go Back</Button>
      <PageContent>
        <ArtistContainer>
          <ArtistImg src={image} alt="" />
          <ArtistName>{name}</ArtistName>
        </ArtistContainer>

        <ArtistInfo>
          <Popularity>{`Popularity: ${popularity} / 100`}</Popularity>
          <Followers>{`Followers: ${followers
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}</Followers>
          <Genres>
            Genres:
            {genres.split(",").map((item, index) => {
              console.log(item);
              return <GenreType key={index}>{item}</GenreType>;
            })}
          </Genres>
        </ArtistInfo>
      </PageContent>
    </React.Fragment>
  );
};

// Used for typechecking props of TrackItem. Ensures the data received is valid
ArtistItem.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  popularity: PropTypes.string,
  image: PropTypes.string,
  followers: PropTypes.string,
  genres: PropTypes.string,
};

export default ArtistItem;

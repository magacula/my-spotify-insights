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

const ArtistContainer = styled.div`
  width: 100%;
  display: grid;
  align-items: center;
  align-content: center;
  justify-items: center;
`;

const ArtistImg = styled.img`
  /* width: ; */
  border-radius: 70%;
`;

const ArtistName = styled.h2`
  font-size: 4rem;
  margin-top: 2rem;
  margin-left: 0;
`;

const ArtistInfo = styled.div`
  margin-top: 2.5rem;
  width: 100%;
  display: grid;
  align-items: center;
  align-content: center;
  justify-items: center;
`;

const Popularity = styled.p`
  font-size: 2.5rem;
  font-weight: 600;
`;

const Followers = styled.p`
  font-size: 2.5rem;
  font-weight: 600;
`;

const Genres = styled.ul`
  font-size: 1.5rem;
  font-weight: 600;
  margin-top: 1rem;
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
      <Button to="/Tops">Go Back</Button>
      <div style={{ marginLeft: "100px", marginTop: "75px" }}>
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
      </div>
    </React.Fragment>
  );
};

export default ArtistItem;

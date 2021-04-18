import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import themes from "../styles/themes";
import UserProfile from "./UserProfile";
import Guidelines from "./Guidelines";
import breakpoints from "../styles/breakpoints";
const { colors } = themes;

const LOGOUT_USER = "/auth/logout";

const Button = styled.a`
  display: inline-block;
  background: ${colors.lightBlue};
  color: ${colors.white};
  padding: 0.25rem 0.75rem;
  border-radius: 0.25rem;
  border-color: transparent;
  text-transform: capitalize;
  font-size: 1rem;
  letter-spacing: 0.1rem;
  margin-top: 0.5rem;
  margin-left: 110px;
  margin-right: 0.5rem;
  transition: all 0.3s linear;
  cursor: pointer;

  &:hover {
    transition: 0.35s;
    background: ${colors.pink};
  }
`;

const ContentContainer = styled.div`
  display: grid;
  justify-content: center;
  line-height: 1.3;
  margin-top: 2rem;
  margin-left: 70px;
`;

const WelcomeHeading = styled.h1`
  margin: 0 4rem;
  font-size: 3rem;

  @media only screen and (${breakpoints.device.med}) {
    font-size: 2rem;
  }
`;

const Welcome = styled.p`
  margin: 1.5rem 4rem;
  font-size: 1.25rem;
`;

const HomeDashboard = () => {
  return (
    <React.Fragment>
      <div align="right">
        <Button href={LOGOUT_USER}>Logout</Button>
      </div>

      <UserProfile />
      <ContentContainer>
        <WelcomeHeading id = "accent">Welcome to MySpotifyInsights!</WelcomeHeading>
        <Welcome>
          Navigate through this web application to view your "tops" on Spotify,
          generate a playlist of recommended tracks for you, view your top
          tracks' audio features, view top tracks in the world, and more!
        </Welcome>
        <Guidelines />
      </ContentContainer>
    </React.Fragment>
  );
};

export default HomeDashboard;

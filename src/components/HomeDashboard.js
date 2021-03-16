import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import themes from "../styles/themes";
import UserProfile from "./UserProfile";
import Guidelines from "./Guidelines";
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
  margin-top: 1rem;
  margin-left: 110px;
  margin-right: 0.5rem;
  transition: all 0.3s linear;
  cursor: pointer;

  &:hover {
    transition: 0.35s;
    background: ${colors.pink};
  }
`;

const HomeDashboard = () => {
  return (
    <React.Fragment>
        <div align = "right">
            <Button href={LOGOUT_USER}>Logout</Button>
        </div>

        <div>
            <h1> Home </h1>
            <h3>
                Welcome to the MySpotifyInsights web application! Navigate through this application to view your "tops" on
                Spotify, generate a playlist of recommended tracks for you, view your top tracks' audio features, view top
                tracks in the world, and more!
            </h3>
            <Guidelines />
      </div>
      <UserProfile />
    </React.Fragment>
  );
};

export default HomeDashboard;

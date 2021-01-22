import React, { useState, useEffect } from "react";
import styled from "styled-components";
import themes from "../styles/themes";
const { colors } = themes;

const Login = styled.main`
  width: 100%;
  margin: 0 auto;
  /* max-width: 1400px;
  min-height: 100vh; */
  background-color: ${colors.darkGray};
`;

const LoginContainer = styled.div`
  display: grid;
  justify-items: center;
  align-content: center;
  width: 100%;
  height: 100vh;
  padding: 0 1rem;
`;

const Heading = styled.h1`
  @import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@700&display=swap");

  font-size: 4rem;
  font-family: "Montserrat", sans-serif;
  letter-spacing: 1.8px;
`;

const SubHeading = styled.p`
  margin-top: 0.5rem;
`;

const Credits = styled.p`
  position: absolute;
  right: 0;
  bottom: 0;
  padding: 0 0.5rem 0.5rem 0;
  font-size: 0.8rem;
`;

const LoginButton = styled.a`
  margin-top: 2rem;
  display: inline-block;
  background: ${colors.lightBlue};
  padding: 0.75rem 2.5rem;
  border-radius: 1.5rem;
  transition: 0.3s;
  color: ${colors.white};
  font-weight: bold;
  position: relative;
  z-index: 2;

  &:hover {
    transition: 0.35s;
    background: ${colors.pink};
  }
`;

const LoginPage = () => {
  // const [currentTime, setCurrentTime] = useState(0);
  //  useEffect(() => {
  //   fetch("/time")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setCurrentTime(data.time);
  //     });
  // }, []);

  return (
    <Login>
      <Credits>A project made by Group4: Makoi, Amy, Biao, and Fabian</Credits>
      <LoginContainer>
        <Heading>MySpotifyInsights</Heading>
        <SubHeading>
          A personalized dashboard interface to view your Spotify data
        </SubHeading>
        <LoginButton>Sign In</LoginButton>
        {/* <p>The current time is {currentTime}</p> */}
      </LoginContainer>
    </Login>
  );
};

export default LoginPage;

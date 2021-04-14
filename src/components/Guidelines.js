import React from "react";
import styled from "styled-components";
import breakpoints from "../styles/breakpoints";

const GuidelinesContent = styled.p`
  line-height: 1.3;
  font-size: 1.25rem;
  margin: 1rem 4rem;
`;

const GuidelinesHeader = styled.h1`
  font-size: 2rem;
  margin-top: 4rem;
  margin-right: 2rem;
  margin-left: 4rem;

  @media only screen and (${breakpoints.device.med}) {
    font-size: 1.5rem;
  }
`;

const Guidelines = () => {
  return (
    <React.Fragment>
      <GuidelinesHeader>Community Guidelines</GuidelinesHeader>
      <GuidelinesContent>
        Any content uploaded to the MySpotifyInsights web application is
        expected to follow community guidelines. Uploaded content that threatens
        violence, depicts harm to an individual or group, promotes any form of
        harassment, or incites hate is prohibited. If these guidelines are not
        followed, a MySpotifyInsights moderator has the right to remove the
        content and revoke the user's privileges to use the application.
      </GuidelinesContent>
    </React.Fragment>
  );
};

export default Guidelines;

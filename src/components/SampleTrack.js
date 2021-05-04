import React, { useState, useEffect } from "react";
import styled from "styled-components";
import SampleLyrics from "./SampleLyrics";
import SampleBG from "./SampleBG";
import { FiHelpCircle } from "react-icons/fi";
import themes from "../styles/themes";

const { colors } = themes;

const BACK = "/EditTrack";

const BackButton = styled.a`
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

const SampleContainer = styled.div`
    size: '3em',
    color: 'white',
    margin-top: 400px;
    margin-bottom: 100px;
    margin-left: 90px;
    margin-right: 90px;
`;

const SampleTrack = () => {
    return (
        <React.Fragment>
            <div align="right">
                <BackButton href={BACK}>Back</BackButton>
            </div>
            <SampleContainer>

                <h1 align="left" id = "accent"> Additional Track Information </h1>
                <h3 align="left">
                    You can use our application to add lyrics and background information to your Spotify tracks! Use the
                    "edit track button" on the track page to input lyrics for any of your tracks on Spotify. You can also
                    add any information or additional notes you'd like to keep track of using the background information
                    field for tracks.
                </h3>
            </SampleContainer>

            <SampleContainer>
                <h2 align="left"> Ocean Man by Ween </h2>
                <SampleLyrics />
                <SampleBG />

            </SampleContainer>
        </React.Fragment>
    );
};

export default SampleTrack;
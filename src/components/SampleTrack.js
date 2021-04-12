import React, { useState, useEffect } from "react";
import styled from "styled-components";
import SampleLyrics from "./SampleLyrics";
import SampleBG from "./SampleBG";
import { GiInfo } from "react-icons/gi";

const trackStyle = {

    size: '1em',
    color: 'white',
    padding: '15em'
};

const Info = styled(GiInfo)`
  fill: white;
  color: white;
  font-size: 2.75rem;
  width: 100%;
  margin: 0.25rem 0;
`;

const SampleTrack = () => {
    return (
        <React.Fragment>

            <div style= {trackStyle}>

                <Info />

                <h1> Sample Track </h1>
                <h3>
                    You can use our application to add lyrics and background information to your Spotify tracks! Use the
                    "edit track button" on the track page to input lyrics for any of your tracks on Spotify. You can also
                    add any information or additional notes you'd like to keep track of using the background information
                    field for tracks.
                </h3>

                <h1> Ocean Man by Ween </h1>
                <SampleLyrics />
                <SampleBG />

            </div>
        </React.Fragment>
    );
};

export default SampleTrack;
import React, { useState, useEffect } from "react";
import styled from "styled-components";

const LyricsContainer = styled.div`
    size: '3em',
    color: 'white',
    margin-top: 400px;
    margin-bottom: 80px;
    margin-left: 100px;
    margin-right: 100px;
`;

const SampleLyrics = () => {
    return (
        <React.Fragment>
            <LyricsContainer>
                <h2> Lyrics </h2>
                <h4>
                    <p> Ocean man, take me by the hand </p>
                    <p> Lead me to the land that you understand </p>
                    <p> Ocean man, the voyage to the corner of the globe </p>
                    <p> Is a real trip </p>
                    <p> Ocean man, the crust of a tan man imbibed by the sand </p>
                    <p> Soaking up the thirst of the land </p>
                    <p> Ocean man, can you see through the wonder of amazement </p>
                    <p> At the oberman </p>
                    <p> Ocean man, the crust is elusive when it casts forth </p>
                    <p> To the childlike man </p>
                    <p> Ocean man, the sequence of a life form braised in the sand </p>
                    <p> Soaking up the thirst of the land </p>
                    <p> Ocean man </p>
                    <p> Ocean man </p>
                    <p> Ocean man </p>
                    <p> Ocean man, take me by the hand </p>
                    <p> Lead me to the land that you understand </p>
                    <p> Ocean man, the voyage to the corner of the globe </p>
                    <p> Is a real trip </p>
                    <p> Ocean man, the crust of a tan man imbibed by the sand </p>
                    <p> Soaking up the thirst of the land </p>
                    <p>  Ocean man, can you see through the wonder of amazement </p>
                    <p> At the oberman </p>
                    <p> Ocean man, the crust is elusive when it casts forth </p>
                    <p> To the childlike man </p>
                    <p> Ocean man, the sequence of a life form braised in the sand </p>
                    <p> Soaking up the thirst of the land </p>
                    <p> Ocean Man </p>
                </h4>
            </LyricsContainer>
        </React.Fragment>
    );
};

export default SampleLyrics;
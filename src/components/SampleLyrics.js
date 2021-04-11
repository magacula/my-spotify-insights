import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { GiPencil } from "react-icons/gi";

const lyricStyle = {

    size: '1em',
    color: 'white',
    padding: '10em'
};

const Pencil = styled(GiPencil)`
  fill: white;
  color: white;
  font-size: 2.75rem;
  width: 100%;
  margin: 0.25rem 0;
`;


const SampleLyrics = () => {
    return (
        <React.Fragment>

            <div style= {lyricStyle}>
                <Pencil />
                <h1> Lyrics </h1>
                <h3>
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
                </h3>
            </div>

        </React.Fragment>
    );
};

export default SampleLyrics;
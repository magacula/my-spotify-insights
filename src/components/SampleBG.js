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

const SampleBG = () => {
    return (
        <React.Fragment>
            <LyricsContainer>
                <h2> Background Information </h2>
                <h4>
                    <p> ● recorded in 1995-1996 </p>
                    <p> ● released in 1997 </p>
                    <p> ● written in E Major </p>
                    <p> ● featured in The Spongebob SquarePants Movie </p>
                </h4>
            </LyricsContainer>
        </React.Fragment>
    );
};

export default SampleBG;

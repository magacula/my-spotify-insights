import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { GiMusicalNotes } from "react-icons/gi";

const bgStyle = {

    size: '1em',
    color: 'white',
    padding: '15em'
};

const Notes = styled(GiMusicalNotes)`
  fill: white;
  color: white;
  font-size: 2.75rem;
  width: 100%;
  margin: 0.25rem 0;
`;

const SampleBG = () => {
    return (
        <React.Fragment>

            <div style= {bgStyle}>
                <Notes />
                <h1> Background Information </h1>
                <h3>
                    <p> ● recorded in 1995-1996 </p>
                    <p> ● released in 1997 </p>
                    <p> ● written in E Major </p>
                    <p> ● featured in The Spongebob SquarePants Movie </p>
                </h3>
            </div>

        </React.Fragment>
    );
};

export default SampleBG;

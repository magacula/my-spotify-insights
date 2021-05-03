import React, {useState} from "react";
import styled from "styled-components";
import themes from "../styles/themes";
import { FiHelpCircle } from "react-icons/fi";
import Lyrics from "./Lyrics";
import TrackBG from "./TrackBG";
import {Link} from "react-router-dom";

const {colors} = themes;

const Sample = styled(FiHelpCircle)`
  font-size: 2.5rem;
  margin: 0.8rem;
  color: ${colors.white};
  cursor: pointer;
`;

const EditTrack = () => {
    return (
        <React.Fragment>
            <div align="right">
                <Link to="/SampleTrack">
                    <Sample />
                </Link>
            </div>
            <div align ="left">
                <h1 id="accent">Edit Track Information </h1>
                <Lyrics/>
                <TrackBG/>
            </div>
        </React.Fragment>
    );
};

export default EditTrack;

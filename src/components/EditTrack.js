import React, {useState} from "react";
import styled from "styled-components";
import themes from "../styles/themes";
import { FiHelpCircle } from "react-icons/fi";
import Lyrics from "./Lyrics";
import TrackBG from "./TrackBG";
import {Link} from "react-router-dom";
import Editable from "./Editable";

const {colors} = themes;

const RP = "/RecentlyPlayed";

var lyrics;

var bg;

const getInput = (input) => {
    this.input = input;
}

const Sample = styled(FiHelpCircle)`
  font-size: 2.5rem;
  margin: 0.8rem;
  color: ${colors.white};
  cursor: pointer;
`;

const SaveButton = styled.a`
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

const EditTrack = () => {

    const saveInfo = () => {

        //send input back to track
        this.props.send(getInput(lyrics));
        this.props.send(getInput(bg));
    }

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
            <div align="right">
                <SaveButton href={RP} onClick={saveInfo}>Save</SaveButton>
            </div>
        </React.Fragment>
    );
};

export default EditTrack;

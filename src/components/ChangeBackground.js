import React, { useState, useEffect } from "react";
import styled from "styled-components";
import themes from "../styles/themes";
import { NavLink } from "react-router-dom";
import Track from "./Track";
const { colors } = themes;

//const Background = styled(NavLink)``;

const ButtonContainer = styled.div``;

const ColorButton = styled.button`
  margin-top: 2rem;
  display: inline-block;
  background: ${colors.lightBlue};
  padding: 0.75rem 1.5rem;
  border-radius: 1rem;
  border-style: none;
  margin-right: 1rem;
  outline: none;
  color: ${colors.white};
  font-weight: bold;
  cursor: pointer;

  &:hover {
    transition: 0.35s;
    background: ${colors.pink};
  }
`;

const ChangeBackground = () => {
  const [backgrounds, setBackgrounds] = useState([]);
  const [showButton, setShowButton] = useState(false);

  const fetchData = async () => {
    try {
    } catch (error) {
      console.log(error);
    }
  };

  //default
  const dark = () => {
    document.body.style.background = "#222222";
    document.getElementsByTagName("html")[0].style["background-color"] =
      "#222222";
  };

  const light = () => {
    document.body.style.background = "#d6d6d6";
    document.getElementsByTagName("html")[0].style["background-color"] =
      "#d6d6d6";
  };

  const wine = () => {
    document.body.style.background = "#bc2854";
    document.getElementsByTagName("html")[0].style["background-color"] =
      "#bc2854";
  };

  const mango = () => {
    document.body.style.background = "#ff9952";
    document.getElementsByTagName("html")[0].style["background-color"] =
      "#ff9952";
  };

  const plum = () => {
    document.body.style.background = "#1d1153";
    document.getElementsByTagName("html")[0].style["background-color"] =
      "#1d1153";
  };

  const navy = () => {
    document.body.style.background = "#1f358c";
    document.getElementsByTagName("html")[0].style["background-color"] =
      "#1f358c";
  };

  //FIXME: Make so only accessible with certain rank(s)
  return (
    <React.Fragment>
      <ButtonContainer>
        <ColorButton onClick={dark}>Dark</ColorButton>
        <ColorButton onClick={light}>Light</ColorButton>
        <ColorButton onClick={wine}>Wine</ColorButton>
        <ColorButton onClick={mango}>Mango</ColorButton>
        <ColorButton onClick={plum}>Plum</ColorButton>
        <ColorButton onClick={navy}>Navy</ColorButton>
      </ButtonContainer>
    </React.Fragment>
  );
};

export default ChangeBackground;

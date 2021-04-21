import React, { useState, useEffect } from "react";
import styled from "styled-components";
import themes from "../styles/themes";
const { colors } = themes;

//const Background = styled(NavLink)``;

const ButtonContainer = styled.div`
  display: flex;
  space: 2;
`;

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

const ChangeAccentColor = () => {
  const [backgrounds, setBackgrounds] = useState([]);
  const [showButton, setShowButton] = useState(false);

  const fetchData = async () => {
    try {
    } catch (error) {
      console.log(error);
    }
  };

  //default
  const white = () => {
    document.getElementById("accent").style.color = "white";
  };

  const pink = () => {
    document.getElementById("accent").style.color = "#ec42f5";

    /*
        var accents = document.getElementById("accent")

        for (var i = 0; i < accents.length; i++) {
            accents[i].style.color = "#ec42f5";
        }
        */
  };

  const blue = () => {
    document.getElementById("accent").style.color = "#53cced";
  };

  const purple = () => {
    document.getElementById("accent").style.color = "#a352ff";
  };

  return (
    <React.Fragment>
      <ButtonContainer>
        <ColorButton onClick={white}>White</ColorButton>
        <ColorButton onClick={pink}>Pink</ColorButton>
        <ColorButton onClick={blue}>Blue</ColorButton>
        <ColorButton onClick={purple}>Purple</ColorButton>
      </ButtonContainer>
    </React.Fragment>
  );
};

export default ChangeAccentColor;

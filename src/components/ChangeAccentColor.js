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
        [...document.getElementsByTagName("h1", "h2", "h3", "h4", "a", "p")].forEach(
            (x) => (x.style["color"] = "red")
        );
    };

    const black = () => {
        [...document.getElementsByTagName("h1", "h2", "h3", "h4", "a", "p")].forEach(
            (x) => (x.style["color"] = "black")
        );
    };


    return (
        <React.Fragment>
            <ButtonContainer>
                <ColorButton onClick={black}>Black</ColorButton>
                <ColorButton onClick={white}>White</ColorButton>
            </ButtonContainer>
        </React.Fragment>
    );
};

export default ChangeAccentColor;
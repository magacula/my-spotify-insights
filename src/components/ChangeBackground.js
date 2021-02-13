import React, { useState, useEffect } from "react";
import styled from "styled-components";
import themes from "../styles/themes";
import { NavLink } from "react-router-dom";
import Track from "./Track";
const { colors } = themes;

//const Background = styled(NavLink)``;

const ButtonContainer = styled.div`
  margin-left: 110px;
  display: flex;
  space: 2;
`;

const Button = styled.button`
  margin-top: 2rem;
  display: inline-block;
  background: ${colors.lightBlue};
  padding: 0.75rem 2.5rem;
  border-radius: 1.5rem;
  border-style: none;

  margin-right: 2rem;
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

    const handleClick = () => {
        setShowButton(true);
    };

    const changeLight = () => {
        document.body.style.background = "Gainsboro";
        document.getElementsByTagName('html')[0].style['background-color'] = "Gainsboro";
        [...document.getElementsByTagName('h1', 'h2', 'a', 'p')].forEach(x => x.style['color'] = 'black')
        
    };

    //Default
    const changeDark = () => {
        document.body.style.background = "#222222";
    };

    //FIXME: Make so only accessible with certain rank(s)
    return (
        <React.Fragment>
            <ButtonContainer>
                <Button onClick={handleClick}>Change Background</Button>
                {showButton && (
                    <Button onClick={changeLight}>Light</Button>
                )}
            </ButtonContainer>
        </React.Fragment>
    );



};

export default ChangeBackground;

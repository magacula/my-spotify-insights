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

const ChangeFontColor = () => {
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

        [...document.getElementsByTagName("*")].forEach(
            (x) => (x.style["color"] = "white")
        );
    };

    const black = () => {


        var tags = document.getElementsByTagName("h1");

        for (var i = 0; i < tags.length; i++) {

            tags[i].color = "red";
        }





    };

    const pink = () => {
        //#ec42f5

        [...document.getElementsByTagName("*")].forEach(
            (x) => (x.style["color"] = "#ec42f5")
        );
    };

    const blue = () => {

        [...document.getElementsByTagName("*")].forEach(
            (x) => (x.style["color"] = "#0a78ff")
        );
    };

    const purple = () => {
        //#a352ff

        [...document.getElementsByTagName("*")].forEach(
            (x) => (x.style["color"] = "#a352ff")
        );
    }


    return (
        <React.Fragment>
            <ButtonContainer>
                <ColorButton onClick={white}>White</ColorButton>
                <ColorButton onClick={black}>Black</ColorButton>
                <ColorButton onClick={pink}>Pink</ColorButton>
                <ColorButton onClick={blue}>Blue</ColorButton>
                <ColorButton onClick={purple}>Purple</ColorButton>
            </ButtonContainer>
        </React.Fragment>
    );
};

export default ChangeFontColor;

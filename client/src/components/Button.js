import React from "react";
import styled from "styled-components";
import themes from "../styles/themes";
const { colors } = themes;

const StyledButton = styled.a`
  margin-top: 2rem;
  display: inline-block;
  background: ${colors.lightBlue};
  padding: 0.75rem 2.5rem;
  border-radius: 1.5rem;
  transition: 0.3s;
  color: ${colors.white};
  font-weight: bold;
  position: relative;
  z-index: 100;
  cursor: pointer;

  &:hover {
    transition: 0.35s;
    background: ${colors.pink};
  }
`;

const Button = ({ buttonText }) => {
  return (
    <>
      <StyledButton style={{ marginLeft: "150px" }}>{buttonText}</StyledButton>
    </>
  );
};

export default Button;

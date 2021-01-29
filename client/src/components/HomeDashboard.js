import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import themes from "../styles/themes";
const { colors } = themes;

const LOGOUT = "http://127.0.0.1:5000/auth/logout";

const Button = styled.a`
  display: inline-block;
  background: ${colors.lightBlue};
  color: ${colors.white};
  padding: 0.25rem 0.75rem;
  border-radius: 0.25rem;
  border-color: transparent;
  text-transform: capitalize;
  font-size: 1rem;
  letter-spacing: 0.1rem;
  margin-top: 1rem;
  margin-left: 0.5rem;
  margin-right: 0.5rem;
  transition: all 0.3s linear;
  cursor: pointer;

  &:hover {
    transition: 0.35s;
    background: ${colors.pink};
  }

  a {
    color: ${colors.white};
  }
`;

const HomeDashboard = () => {
  return (
    <div>
      <h1>User Home Page</h1>
      <Button href={LOGOUT}>Logout</Button>
      {/* <Button href={LOGOUT}></Button> */}
    </div>
  );
};

export default HomeDashboard;

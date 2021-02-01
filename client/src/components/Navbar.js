import React, { useState, useEffect } from "react";
import styled from "styled-components";
import themes from "../styles/themes";
import { NavLink } from "react-router-dom";
import { HiHome } from "react-icons/hi";
import { FiStar } from "react-icons/fi";
import { AiFillFire } from "react-icons/ai";
import { IoIosFilm } from "react-icons/io";
import { FaCrown } from "react-icons/fa";
import "../styles/App.css";

const { colors } = themes;

const NavContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  width: 100px;
  background-color: ${colors.sidePanelGray};
  text-align: center;
  z-index: 99;
`;

const NavMenu = styled.ul``;

const NavMenuItem = styled.li`
  padding: 1rem;

  &:hover,
  &:focus {
    color: ${colors.pink};
    background-color: ${colors.pink};
  }
`;

const Home = styled(HiHome)`
  color: white;
  font-size: 3rem;
`;

const Star = styled(FiStar)`
  fill: white;
  color: white;
  font-size: 3rem;
`;

const Fire = styled(AiFillFire)`
  fill: white;
  color: white;
  font-size: 3rem;
`;

const Film = styled(IoIosFilm)`
  fill: white;
  color: white;
  font-size: 3rem;
`;

const Crown = styled(FaCrown)`
  fill: white;
  color: white;
  font-size: 3rem;
`;

const Link = styled(NavLink)`
  color: ${colors.white};

  font-size: 0.25rem;
`;

const Navbar = () => {
  return (
    <NavContainer>
      <NavMenu>
        <NavMenuItem>
          <Link exact to="/home" title="Home" activeClassName="active-navlink">
            <Home />
          </Link>
        </NavMenuItem>
        <NavMenuItem>
          <Link
            exact
            to="/discover"
            title="Discover"
            activeClassName="active-navlink">
            <Star />
          </Link>
        </NavMenuItem>
        <NavMenuItem>
          <Link
            exact
            to="/popular_artists"
            title="Most Popular Artists"
            activeClassName="active-navlink">
            <Fire />
          </Link>
        </NavMenuItem>
        <NavMenuItem>
          <Link
            exact
            to="/film_maker"
            title="Film Maker"
            activeClassName="active-navlink">
            <Film />
          </Link>
        </NavMenuItem>
        <NavMenuItem>
          <Link
            exact
            to="/ranks"
            title="Your Rank"
            activeClassName="active-navlink">
            <Crown />
          </Link>
        </NavMenuItem>
        <NavMenuItem>
          <Link exact to="/Tops">
            <div>Tops</div>
          </Link>
        </NavMenuItem>
      </NavMenu>
    </NavContainer>
  );
};

export default Navbar;

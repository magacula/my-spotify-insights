import React from "react";
import styled from "styled-components";
import themes from "../styles/themes";
import { Link } from "react-router-dom";

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
  margin: 1rem 0;
`;

const NavLink = styled(Link)`
  color: ${colors.white};
`;

const Navbar = () => {
  return (
    <NavContainer>
      <NavMenu>
        <NavMenuItem>
          <NavLink to="/home">
            <div>Home</div>
          </NavLink>
        </NavMenuItem>
        <NavMenuItem>
          <NavLink to="/discover">
            <div>Discover</div>
          </NavLink>
        </NavMenuItem>
        <NavMenuItem>
          <NavLink to="/popular_artists">
            <div>Popular Artists</div>
          </NavLink>
        </NavMenuItem>
        <NavMenuItem>
          <NavLink to="/film_maker">
            <div>Film Maker</div>
          </NavLink>
        </NavMenuItem>
        <NavMenuItem>
          <NavLink to="/ranks">
            <div>Ranks</div>
          </NavLink>
        </NavMenuItem>
        <NavMenuItem>
          <NavLink to="/Tops">
            <div>Tops</div>
          </NavLink>
        </NavMenuItem>
      </NavMenu>
    </NavContainer>
  );
};

export default Navbar;

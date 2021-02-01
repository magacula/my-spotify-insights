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

  &:hover,
  &:focus,
  &.active {
    color: ${colors.pink};
    /* background-color: ${colors.black}; */
    border-left: 5px solid ${colors.pink};
  }

  img {
    padding: 1rem;

    &.active {
      fill: ${colors.pink};
    }
  }
`;

// const NavLink = styled(Link)``;

const isActive = ({ isCurrent }) =>
  isCurrent ? { className: "active" } : null;

const NavLink = (props) => <Link getProps={isActive} {...props} />;

const Navbar = () => {
  return (
    <NavContainer>
      <NavMenu>
        <NavMenuItem>
          <NavLink to="/home">
            <img src="home.png" title="Home" />
          </NavLink>
        </NavMenuItem>
        <NavMenuItem>
          <NavLink to="/discover">
            <img src="discover.png" title="Discover" />
          </NavLink>
        </NavMenuItem>
        <NavMenuItem>
          <NavLink to="/popular_artists">
            <img src="popular.png" title="Most Popular Artists" />
          </NavLink>
        </NavMenuItem>
        <NavMenuItem>
          <NavLink to="/film_maker">
            <img src="film.png" title="Film Maker" />
          </NavLink>
        </NavMenuItem>
        <NavMenuItem>
          <NavLink to="/ranks">
            <img src="ranks.png" title="Your Rank" />
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

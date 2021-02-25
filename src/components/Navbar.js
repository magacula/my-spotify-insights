import React, { useState, useEffect } from "react";
import styled from "styled-components";
import themes from "../styles/themes";
import {NavLink} from "react-router-dom";
import {HiHome, HiUserCircle} from "react-icons/hi";
import {FiStar} from "react-icons/fi";
import {AiFillFire} from "react-icons/ai";
import {IoIosFilm} from "react-icons/io";
import {FaCrown} from "react-icons/fa";
import {HiClock} from "react-icons/hi";
import {BsGraphUp} from "react-icons/bs";
import {SiAudioboom} from "react-icons/si";
import {MdBugReport, MdQueueMusic} from "react-icons/md";
import {AiFillBug} from "react-icons/ai";
import "../styles/App.css";

const {colors} = themes;

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

const NavMenu = styled.ul`
  list-style: none;
`;

const NavMenuItem = styled.li`
  position: relative;
  z-index: 1;
  overflow: hidden;

  &:hover,
  &:focus {
    color: ${colors.pink};
    background-color: ${colors.pink};
    transition: all 0.3s linear;
    cursor: pointer;
  }
`;

const Star = styled(FiStar)`
  fill: white;
  color: white;
  font-size: 3rem;
  margin: 1rem 0;
  width: 100%;
`;

const Fire = styled(AiFillFire)`
  fill: white;
  color: white;
  font-size: 3rem;
  margin: 1rem 0;
  width: 100%;
`;

const Film = styled(IoIosFilm)`
  fill: white;
  color: white;
  font-size: 3rem;
  margin: 1rem 0;
  width: 100%;
`;

const Crown = styled(FaCrown)`
  fill: white;
  color: white;
  font-size: 2.5rem;
  margin: 1rem 0;
  width: 100%;
`;

const Clock = styled(HiClock)`
  fill: white;
  color: white;
  font-size: 3rem;
  margin: 1rem 0;
  width: 100%;
`;

const GraphUp = styled(BsGraphUp)`
  fill: white;
  color: white;
  font-size: 3rem;
  margin: 1rem 0;
  width: 100%;
`;

const AudioFeatures = styled(SiAudioboom)`
  fill: white;
  color: white;
  font-size: 3rem;
  margin: 1rem 0;
  width: 100%;
`;

const Playlists = styled(MdQueueMusic)`
  fill: white;
  color: white;
  font-size: 3rem;
  margin: 1rem 0;
  width: 100%;
`;

const Bug = styled(AiFillBug)`
  color: white;
  font-size: 3rem;
  margin: 1rem 0rem;
  width: 100%;
`;

const Home = styled(HiHome)`
  color: white;
  font-size: 3rem;
  margin: 1rem 0rem;
  width: 100%;
`;

const Link = styled(NavLink)`
  color: ${colors.white};
`;

const Navbar = () => {
  return (
      <NavContainer>
        <NavMenu>

        <NavMenuItem>
          <Link to="/home" title="Home" activeClassName="active-navlink">
            <Home />
          </Link>
        </NavMenuItem>

        <NavMenuItem>
          <Link to="/discover" title="Discover" activeClassName="active-navlink">
            <Star/>
          </Link>
        </NavMenuItem>

        <NavMenuItem>
          <Link to="/popular_artists" title="Most Popular Artists" activeClassName="active-navlink">
            <Fire/>
          </Link>
        </NavMenuItem>

        <NavMenuItem>
          <Link to="/film_maker" title="Film Maker" activeClassName="active-navlink">
            <Film/>
          </Link>
        </NavMenuItem>

        <NavMenuItem>
          <Link to="/ranks" title="Your Rank" activeClassName="active-navlink">
            <Crown />
          </Link>
        </NavMenuItem>

        <NavMenuItem>
          <Link to="/Tops" activeClassName="active-navlink">
            <GraphUp />
          </Link>
        </NavMenuItem>

        <NavMenuItem>
          <Link to="/RecentlyPlayed" activeClassName="active-navlink">
            <Clock />
          </Link>
        </NavMenuItem>

        <NavMenuItem>
          <Link to="/TopTracksGraph" activeClassName="active-navlink">
            <AudioFeatures/>
          </Link>
        </NavMenuItem>

          <NavMenuItem>
            <Link to="/Playlists" activeClassName="active-navlink">
              <Playlists/>
            </Link>
          </NavMenuItem>

          <NavMenuItem>
              <a href="mailto:myspotifyinsights@gmail.com?&subject=Spotify%20Insights%20Bug%20Report&body=Hello,%20I%20was%20using%20your%20site%20when%20I%20encountered%20a%20bug.%0D%0A%0AHere%20is%20what%20happened%3A%0D%0A"
                 target="_top">
                  <Bug/>
              </a>
          </NavMenuItem>

        </NavMenu>
    </NavContainer>
  );
};

export default Navbar;

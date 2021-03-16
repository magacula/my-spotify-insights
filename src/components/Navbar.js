import React, { useState, useEffect } from "react";
import styled from "styled-components";
import themes from "../styles/themes";
import { NavLink } from "react-router-dom";
import { HiHome, HiUserCircle } from "react-icons/hi";
import { FiStar } from "react-icons/fi";
import { AiFillFire } from "react-icons/ai";
import { IoIosFilm } from "react-icons/io";
import { FaCrown } from "react-icons/fa";
import { HiClock } from "react-icons/hi";
import { BsGraphUp } from "react-icons/bs";
import { SiAudioboom } from "react-icons/si";
import { MdBugReport, MdQueueMusic } from "react-icons/md";
import { AiFillBug } from "react-icons/ai";
import { AiFillGithub } from "react-icons/ai";
import "../styles/App.css";
import logo from "../styles/MSI-logo.png";

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
  font-size: 2.75rem;
  width: 100%;
  margin: 0.25rem 0;
`;

const Fire = styled(AiFillFire)`
  fill: white;
  color: white;
  font-size: 2.75rem;
  width: 100%;
  margin: 0.25rem 0;
`;

const Film = styled(IoIosFilm)`
  fill: white;
  color: white;
  font-size: 2.75rem;
  width: 100%;
  margin: 0.25rem 0;
`;

const Crown = styled(FaCrown)`
  fill: white;
  color: white;
  font-size: 2.75rem;
  width: 100%;
  margin: 0.25rem 0;
`;

const Clock = styled(HiClock)`
  fill: white;
  color: white;
  font-size: 2.75rem;
  width: 100%;
  margin: 0.25rem 0;
`;

const GraphUp = styled(BsGraphUp)`
  fill: white;
  color: white;
  font-size: 2.75rem;
  width: 100%;
  margin: 0.25rem 0;
`;

const AudioFeatures = styled(SiAudioboom)`
  fill: white;
  color: white;
  font-size: 2.75rem;
  width: 100%;
  margin: 0.25rem 0;
`;

const Playlists = styled(MdQueueMusic)`
  fill: white;
  color: white;
  font-size: 2.75rem;
  width: 100%;
  margin: 0.25rem 0;
`;

const Bug = styled(AiFillBug)`
  color: white;
  font-size: 2.75rem;
  width: 100%;
  margin: 0.25rem 0;
`;

const Link = styled(NavLink)`
  color: ${colors.white};
`;

const Logo = styled.img`
  font-size: 3rem;
  width: 100%;
`;

const GitHub = styled(AiFillGithub)`
  color: white;
  font-size: 2.75rem;
  width: 100%;
  margin: 0.25rem 0;
`;

const NavText = styled.p`
  font-size: 0.75rem;
  text-align: center;
  margin: 0.25rem;
  color: ${colors.white};
`;

const Navbar = () => {
  return (
    <NavContainer>
      <NavMenu>
        <NavMenuItem>
          <Link to="/home" title="Home" activeClassName="active-navlink">
            <Logo src={logo} alt="My Spotify Insights Logo" />
            <NavText>Home</NavText>
          </Link>
        </NavMenuItem>

        <NavMenuItem>
          <Link
            to="/discover"
            title="Discover"
            activeClassName="active-navlink">
            <Star />
            <NavText>Discover</NavText>
          </Link>
        </NavMenuItem>

        <NavMenuItem>
          <Link
            to="/popular_artists"
            title="Most Popular Artists"
            activeClassName="active-navlink">
            <Fire />
            <NavText>Top 50</NavText>
          </Link>
        </NavMenuItem>

        <NavMenuItem>
          <Link
            to="/track_lyrics"
            title="Lyrics"
            activeClassName="active-navlink">
            <Film />
            <NavText>Lyrics</NavText>
          </Link>
        </NavMenuItem>

        <NavMenuItem>
          <Link to="/ranks" title="Your Rank" activeClassName="active-navlink">
            <Crown />
            <NavText>Rank</NavText>
          </Link>
        </NavMenuItem>

        <NavMenuItem>
          <Link to="/Tops" activeClassName="active-navlink">
            <GraphUp />
            <NavText>Tops</NavText>
          </Link>
        </NavMenuItem>

        <NavMenuItem>
          <Link to="/RecentlyPlayed" activeClassName="active-navlink">
            <Clock />
            <NavText>Recent</NavText>
          </Link>
        </NavMenuItem>

        <NavMenuItem>
          <Link to="/TopTracksGraph" activeClassName="active-navlink">
            <AudioFeatures />
            <NavText>Features</NavText>
          </Link>
        </NavMenuItem>

        <NavMenuItem>
          <Link to="/Playlists" activeClassName="active-navlink">
            <Playlists />
            <NavText>Playlists</NavText>
          </Link>
        </NavMenuItem>

        <NavMenuItem>
          <a
            href="mailto:myspotifyinsights@gmail.com?&subject=Spotify%20Insights%20Bug%20Report&body=Hello,%20I%20was%20using%20your%20site%20when%20I%20encountered%20a%20bug.%0D%0A%0AHere%20is%20what%20happened%3A%0D%0A"
            target="_top">
            <Bug />
            <NavText>Bugs</NavText>
          </a>
        </NavMenuItem>

        <NavMenuItem>
          <a href="https://github.com/magacula/my-spotify-insights">
            <GitHub />
          </a>
        </NavMenuItem>
      </NavMenu>
    </NavContainer>
  );
};

export default Navbar;

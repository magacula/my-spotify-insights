import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Playlist from "./Playlist";
import Loader from "./Loader";
import themes from "../styles/themes";
import breakpoints from "../styles/breakpoints";
const { colors } = themes;

const PlaylistsContainer = styled.div`
  margin-left: 150px;
  margin-top: 2rem;
  margin-bottom: 2rem;
  display: grid;
  justify-content: center;
  justify-items: center;
  grid-template-columns: 1fr 1fr;
  grid-row-gap: 1.5rem;

  @media only screen and (${breakpoints.device.med}) {
    margin-left: 100px;
  }

  @media only screen and (${breakpoints.device.sm}) {
    margin-left: 80px;
  }
`;

const Playlists = () => {
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userID, setUserID] = useState([]);

  // function that switches from a locked state to an unlocked state
  const lock_to_unlock = (index) => {
    let newarray = [...playlists];

    newarray[index].public = true;
    console.log(newarray[index]);
    console.log(playlists[index].public);
    setPlaylists(newarray);
  };

  // function that switches from a unlocked state to an locked state
  const unlock_to_lock = (index) => {
    let newarray = [...playlists];

    newarray[index].public = false;

    setPlaylists(newarray);
  };
  useEffect(() => {
    setLoading(true);
    fetch("/user/playlists")
      .then((res) => res.json())
      .then((data) => {
        console.log(data.playlists);
        setPlaylists(data.playlists);
      })
      .catch((error) => console.log(error));

    fetch("/user/my_profile")
      .then((res) => res.json())
      .then((data) => {
        //console.log(data.user);
        setUserID(data.user);
        setLoading(false);
      })
      .catch((error) => console.log(error));
  }, []);

  //playlists[12].public = true;
  return (
    <React.Fragment>
      <h1 id="accent">Your Playlists</h1>
      <PlaylistsContainer>
        {playlists.map((playlist, index) => {
          return userID[0].id != null ? (
            <Playlist
              key={index}
              playlist={playlist}
              userID={userID[0].id}
              index={index}
              lock_to_unlock={lock_to_unlock}
              unlock_to_lock={unlock_to_lock}
            />
          ) : (
            {}
          );
        })}
      </PlaylistsContainer>
      {/* uses conditional rendering to render our loading component */}
      {loading && <Loader />}
    </React.Fragment>
  );
};

export default Playlists;

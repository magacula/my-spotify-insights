import React, { useState, useEffect } from "react";
import Tabs from "./Tabs";
import "../styles/App.css";
import styled from "styled-components";

const Tracks = styled.li``;

const Tops = () => {
  const [topTracks, setTopTracks] = useState([]);
  const [topAlbums, setTopAlbums] = useState([]);
  const [topArtists, setTopArtists] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/user/top_tracks", {
      credentials: "include",
      headers: {
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setTopTracks(data);
      });

    fetch("http://127.0.0.1:5000/user/top_albums", {
      credentials: "include",
      headers: {
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setTopAlbums(data);
      });

    fetch("http://127.0.0.1:5000/user/top_artists", {
      credentials: "include",
      headers: {
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setTopArtists(data);
      });
  }, []);

  return (
    <div>
      <h1>Top Lists</h1>
      <Tabs>
        <div label="Tracks">
          <ol>
            {Object.values(topTracks).map((trackName, index) => {
              return (
                <Tracks
                  key={index}
                  tracks={trackName}
                  {...trackName}
                  style={{ marginLeft: "25px" }}>
                  {trackName}
                </Tracks>
              );
            })}
          </ol>
        </div>
        <div label="Artists">
          <ol>
            {Object.values(topArtists).map((artistName, index) => {
              return (
                <Tracks
                  key={index}
                  tracks={artistName}
                  {...artistName}
                  style={{ marginLeft: "25px" }}>
                  {artistName}
                </Tracks>
              );
            })}
          </ol>
        </div>
        <div label="Albums">
          <ol>
            {Object.values(topAlbums).map((albumName, index) => {
              return (
                <Tracks
                  key={index}
                  tracks={albumName}
                  {...albumName}
                  style={{ marginLeft: "25px" }}>
                  {albumName}
                </Tracks>
              );
            })}
          </ol>
        </div>
      </Tabs>
    </div>
  );
};

export default Tops;

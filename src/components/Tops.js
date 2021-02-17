import React, { useState, useEffect } from "react";
import Tabs from "./Tabs";
import Loader from "./Loader";
import "../styles/App.css";
import styled from "styled-components";

const Tracks = styled.li``;

const Tops = () => {
  const [topTracks, setTopTracks] = useState([]);
  const [topAlbums, setTopAlbums] = useState([]);
  const [topArtists, setTopArtists] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch("/user/top_tracks", {
      credentials: "include",
      headers: {
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.top_tracks);
        setTopTracks(data.top_tracks);
        setLoading(false);
      });

    fetch("/user/top_artists", {
      credentials: "include",
      headers: {
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.top_artists);
        setTopArtists(data.top_artists);
      });

    fetch("/user/top_albums", {
      credentials: "include",
      headers: {
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.top_albums);
        setTopAlbums(data.top_albums);
      });
  }, []);

  return (
    <div>
      <h1>Top Lists</h1>
      <Tabs>
        <div label="Tracks">
          <ol>
            {topTracks.map((track, index) => {
              return (
                <Tracks key={index} style={{ marginLeft: "25px" }}>
                  {track.name}
                </Tracks>
              );
            })}
          </ol>
          {loading && <Loader />}
        </div>
        <div label="Artists">
          <ol>
            {topArtists.map((artist, index) => {
              return (
                <Tracks key={index} style={{ marginLeft: "25px" }}>
                  {artist.name}
                </Tracks>
              );
            })}
          </ol>
        </div>
        <div label="Albums">
          <ol>
            {topAlbums.map((album, index) => {
              return (
                <Tracks key={index} style={{ marginLeft: "25px" }}>
                  {album.name}
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

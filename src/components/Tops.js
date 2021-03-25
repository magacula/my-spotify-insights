import React, { useState, useEffect } from "react";
import Tabs from "./Tabs";
import Loader from "./Loader";
import "../styles/App.css";
import styled from "styled-components";
import { Link } from "react-router-dom";
import themes from "../styles/themes";
const { colors } = themes;

const TracksContainer = styled.div`
  margin-top: 2rem;
  margin-bottom: 1.5rem;
  margin-right: 100px;
  margin-left: 100px;
  display: grid;
  gap: 3rem;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
`;

const TrackWrapper = styled(Link)`
  width: 100%;
  color: ${colors.white};
`;

const Track = styled.div`
  filter: brightness(100%);

  &:hover {
    transition: 0.2s ease-in;
    filter: brightness(65%);
    cursor: pointer;
  }
`;

const TrackCover = styled.img`
  width: 200px;
`;

const TrackInfo = styled.div`
  width: 100%;
`;

const TrackName = styled.p`
  font-weight: 500;
  font-size: 1.25rem;
  width: 100%;
`;

const ArtistContainer = styled.div`
  margin-top: 2rem;
  margin-bottom: 1.5rem;
  margin-left: 2rem;
  display: grid;
  gap: 5rem;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  justify-content: center;
`;

const Artist = styled.div`
  filter: brightness(80%);

  &:hover {
    transform: scale(1.1);
    transition: 0.2s ease-in;
    filter: brightness(100%);
    cursor: pointer;
  }
`;

const ArtistWrapper = styled(Link)`
  width: 100%;
  color: ${colors.white};
`;

const ArtistInfo = styled.div`
  max-width: 350px;
  width: 100%;
  justify-content: center;
  display: grid;
`;

const ArtistName = styled.p`
  margin-top: 1rem;
  font-size: 1.5rem;
  width: 100%;
  text-align: center;
`;

const ArtistPic = styled.img`
  border-radius: 100%;
  object-fit: cover;
  width: 250px;
  height: 250px;
  text-align: center;
  display: inline-flex;
  justify-content: center;
`;

const AlbumContainer = styled.div`
  margin-top: 4rem;
  margin-bottom: 2rem;
  display: grid;
  gap: 4rem;
  grid-template-rows: repeat(auto-fit, minmax(280px, 1fr));
  justify-content: center;
`;

const Album = styled.div`
  filter: brightness(80%);

  &:hover {
    transform: scale(1.1);
    transition: 0.2s ease-in;
    filter: brightness(100%);
    cursor: pointer;
    background-color: rgba(23, 23, 23, 0.8);
  }
`;

const AlbumWrapper = styled(Link)`
  width: 100%;
  display: flex;
  justify-content: center;
  color: ${colors.white};
`;

const AlbumInfo = styled.div`
  width: 100%;
  display: grid;
  align-content: center;
  justify-content: center;
`;

const ArtistTitle = styled.p`
  font-size: 1.1rem;
  width: 100%;
  text-align: center;
  display: flex;
  justify-content: center;
`;

const AlbumName = styled.p`
  font-size: 1.75rem;
  width: 100%;
  text-align: center;
  display: flex;
  justify-content: center;
`;

const AlbumCover = styled.img``;

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
      <h1>Your Top Lists</h1>
      <Tabs>
        <div label="Tracks">
          <TracksContainer>
            {topTracks.map((track, index) => {
              return (
                <Track key={index} track={track} style={{ marginLeft: "25px" }}>
                  <TrackWrapper
                    to={{
                      pathname: `/track/${track.id}`,
                      state: {
                        id: `${track.id}`,
                        name: `${track.name}`,
                        artist: `${track.artists[0]["name"]}`,
                        cover: `${track.album.images[1].url}`,
                        duration_ms: `${track.duration_ms}`,
                        popularity: `${track.popularity}`,
                        fromTops: "true",
                      },
                    }}>
                    <TrackInfo>
                      <TrackName>
                        {index + 1}) {track.name}
                      </TrackName>
                    </TrackInfo>
                    <TrackCover src={track.album.images[1].url} alt="" />
                  </TrackWrapper>
                </Track>
              );
            })}
          </TracksContainer>
          {loading && <Loader />}
        </div>
        <div label="Artists">
          <ArtistContainer>
            {topArtists.map((artist, index) => {
              return (
                <Artist key={index}>
                  <ArtistWrapper
                    to={{
                      pathname: `/artist/${artist.id}`,
                      state: {
                        id: `${artist.id}`,
                        image: `${artist.images[1].url}`,
                        name: `${artist.name}`,
                        followers: `${artist.followers.total}`,
                        popularity: `${artist.popularity}`,
                        genres: `${artist.genres}`,
                      },
                    }}>
                    <ArtistInfo>
                      <ArtistPic
                        src={artist.images[artist.images.length - 2].url}
                      />
                      <ArtistName>{artist.name}</ArtistName>
                    </ArtistInfo>
                  </ArtistWrapper>
                </Artist>
              );
            })}
          </ArtistContainer>
        </div>
        <div label="Albums">
          <AlbumContainer>
            {topAlbums.map((album, index) => {
              return (
                <Album key={index}>
                  <AlbumWrapper
                    to={{
                      pathname: `/album/${album.id}`,
                      state: {
                        id: `${album.id}`,
                        image: `${album.images[1].url}`,
                        name: `${album.name}`,
                        artist: `${album.artists[0].name}`,
                        releaseDate: `${album.release_date}`,
                        totalTracks: `${album.total_tracks}`,
                      },
                    }}>
                    <AlbumInfo>
                      <AlbumName>{album.name}</AlbumName>
                      <ArtistTitle>{album.artists[0].name}</ArtistTitle>
                    </AlbumInfo>
                    <AlbumCover src={album.images[1].url} />
                  </AlbumWrapper>
                </Album>
              );
            })}
          </AlbumContainer>
        </div>
      </Tabs>
    </div>
  );
};

export default Tops;

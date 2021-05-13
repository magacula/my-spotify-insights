import React, { useState, useEffect } from "react";
import Tabs from "./Tabs";
import Loader from "./Loader";
import "../styles/App.css";
import styled from "styled-components";
import { Link } from "react-router-dom";
import themes from "../styles/themes";
import breakpoints from "../styles/breakpoints";

import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";

const { colors } = themes;

const TracksContainer = styled.div`
  margin-top: 2rem;
  margin-bottom: 1.5rem;
  margin-right: 100px;
  margin-left: 100px;
  display: grid;
  gap: 3rem;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));

  @media only screen and (${breakpoints.device.med}) {
    margin-left: 50px;
  }
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
  margin-top: 2rem;
  margin-bottom: 2rem;
`;

const Album = styled.div`
  filter: brightness(80%);
  display: grid;
  margin: 2rem 6rem;

  &:hover {
    transform: scale(1.1);
    transition: 0.2s ease-in;
    filter: brightness(100%);
    cursor: pointer;
    background-color: rgba(23, 23, 23, 0.8);
  }
  @media only screen and (${breakpoints.device.med}) {
    &:hover {
      transform: scale(1);
      filter: brightness(100%);
      cursor: pointer;
      background-color: rgba(23, 23, 23, 0.8);
    }

    @media only screen and (${breakpoints.device.med}) {
      margin: 1rem 3rem;
    }
  }
`;

const AlbumWrapper = styled(Link)`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  color: ${colors.white};
`;

const AlbumInfo = styled.div`
  width: 100%;
  height: 100%;
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

  @media only screen and (${breakpoints.device.med}) {
    font-size: 1rem;
  }

  @media only screen and (${breakpoints.device.sm}) {
    font-size: 0.75rem;
  }
`;

const AlbumName = styled.p`
  font-size: 1.75rem;
  width: 100%;
  text-align: center;
  display: flex;
  justify-content: center;

  @media only screen and (${breakpoints.device.med}) {
    font-size: 1.5rem;
  }

  @media only screen and (${breakpoints.device.sm}) {
    font-size: 1rem;
  }
`;

const AlbumCoverWrapper = styled.div`
  display: grid;
  align-content: center;
`;

const AlbumCover = styled.img`
  width: 100%;

  @media only screen and (${breakpoints.device.sm}) {
    width: 90%;
    padding-left: 2.5rem;
  }
`;

const TimeFrame = styled.div`
  margin-left: 150px;

  @media only screen and (${breakpoints.device.sm}) {
    margin-left: 100px;
  }
`;

const Tops = () => {
  const [radio, setRadio] = useState("Last 4 Weeks");

  const [topTracksShort, setTopTracksShort] = useState([]);
  const [topTracksMedium, setTopTracksMedium] = useState([]);
  const [topTracksLong, setTopTracksLong] = useState([]);

  const [topAlbums, setTopAlbums] = useState([]);
  const [topAlbumsMedium, setTopAlbumsMedium] = useState([]);
  const [topAlbumsShort, setTopAlbumsShort] = useState([]);

  const [topArtists, setTopArtists] = useState([]);
  const [topArtistsMedium, setTopArtistsMedium] = useState([]);
  const [topArtistsShort, setTopArtistsShort] = useState([]);

  const [currentTopTracks, setCurrentTopTracks] = useState([]);
  const [currentTopArtists, setCurrentTopArtists] = useState([]);
  const [currentTopAlbums, setCurrentTopAlbums] = useState([]);

  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    setRadio(event.target.value);

    if (event.target.value == "Last 4 Weeks") {
      setCurrentTopTracks(topTracksShort);
      setCurrentTopArtists(topArtistsShort);
      setCurrentTopAlbums(topAlbumsShort);
    }

    if (event.target.value == "Last 6 Months") {
      setCurrentTopTracks(topTracksMedium);
      setCurrentTopArtists(topArtistsMedium);
      setCurrentTopAlbums(topAlbumsMedium);
    }

    if (event.target.value == "All-Time") {
      setCurrentTopTracks(topTracksLong);
      setCurrentTopArtists(topArtists);
      setCurrentTopAlbums(topAlbums);
    }
  };

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
        //console.log(data.top_tracks);
        setTopTracksLong(data.top_tracks);
        setLoading(false);
      });

    fetch("/user/top_tracks_medium", {
      credentials: "include",
      headers: {
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        //console.log(data.top_tracks);
        setTopTracksMedium(data.top_tracks);
      });
    fetch("/user/top_tracks_short", {
      credentials: "include",
      headers: {
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        //console.log(data.top_tracks);
        setTopTracksShort(data.top_tracks);
        setCurrentTopTracks(data.top_tracks);
      });

    fetch("/user/top_artists", {
      credentials: "include",
      headers: {
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        //console.log(data.top_artists);
        setTopArtists(data.top_artists);
      });

    fetch("/user/top_artists_medium", {
      credentials: "include",
      headers: {
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        //console.log(data.top_artists);
        setTopArtistsMedium(data.top_artists);
      });

    fetch("/user/top_artists_short", {
      credentials: "include",
      headers: {
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        //console.log(data.top_artists);
        setTopArtistsShort(data.top_artists);
        setCurrentTopArtists(data.top_artists);
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

    fetch("/user/top_albums_medium", {
      credentials: "include",
      headers: {
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.top_albums_medium);
        setTopAlbumsMedium(data.top_albums_medium);
      });

    fetch("/user/top_albums_short", {
      credentials: "include",
      headers: {
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.top_albums_short);
        setTopAlbumsShort(data.top_albums_short);
        setCurrentTopAlbums(data.top_albums_short);
      });
  }, []);

  return (
    <div>
      <h1 id="accent">Your Top Lists</h1>

      <h2>{radio}</h2>
      <TimeFrame>
        <FormControl>
          <RadioGroup value={radio} onChange={handleChange} row>
            <FormControlLabel
              value="Last 4 Weeks"
              control={<Radio />}
              label="4 weeks"
            />
            <FormControlLabel
              value="Last 6 Months"
              control={<Radio />}
              label="6 months"
            />
            <FormControlLabel
              value="All-Time"
              control={<Radio />}
              label="All-Time"
            />
          </RadioGroup>
        </FormControl>
      </TimeFrame>

      <Tabs>
        <div label="Tracks">
          <TracksContainer>
            {currentTopTracks.map((track, index) => {
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
            {currentTopArtists.map((artist, index) => {
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
            {currentTopAlbums.map((album, index) => {
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
                    <AlbumCoverWrapper>
                      <AlbumCover src={album.images[1].url} />
                    </AlbumCoverWrapper>
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

import React from "react";
import themes from "../styles/themes";
import styled from "styled-components";
import breakpoints from "../styles/breakpoints";
import { Link } from "react-router-dom";
import { HiPlay } from "react-icons/hi";
import { Howl } from "howler";
const { colors } = themes;

const TrackLeft = styled.span`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding-right: 1px;
`;

const TrackRight = styled.div`
  display: flex;
  align-items: center;
`;

const TrackArtwork = styled.div`
  display: inline-block;
  position: relative;
  min-width: 50px;
  margin-right: 20px;
`;

const TrackImage = styled.img`
  width: 100%;
  max-width: 100%;
  vertical-align: middle;
`;

const Mask = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  color: ${colors.white};
  opacity: 0;
  transition: all 0.25s cubic-bezier(0.3, 0, 0.4, 1);
  svg {
    width: 25px;
  }
`;
const TrackContainer = styled(Link)`
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: center;
  margin-bottom: 30px;
  color: ${colors.white};

  &:hover,
  &:focus {
    ${Mask} {
      opacity: 1;
    }
  }
`;

const TrackMeta = styled.div`
  display: grid;
  grid-template-columns: 1fr max-content;
  grid-gap: 10px;
`;

const TrackName = styled.span`
  margin-bottom: 5px;
  border-bottom: 1px solid transparent;
  font-size: 1.25rem;
  &:hover,
  &:focus {
    border-bottom: 1px solid ${colors.white};
  }
`;

const TrackAlbum = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding-right: 1px;
  color: ${colors.lightGrey};
  margin-top: 3px;
  font-size: 1rem;
`;

const TrackDuration = styled.div`
  color: ${colors.lighterGrey};
  font-size: 14px;
`;

const PlayButton = styled(HiPlay)`
  fill: grey;
  color: white;
  height: 50px;
  font-size: 3rem;
  margin-left: 1.5rem;

  &:hover {
    fill: #65d36e;
    transition: 0.35s;
  }
`;

// Format milliseconds into MM:SS
const formatDuration = (millis) => {
  const minutes = Math.floor(millis / 60000);
  const seconds = ((millis % 60000) / 1000).toFixed(0);

  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
};

// Play track in the browser
var sound;
let soundPlay = (src) => {
  sound = new Howl({
    src,
    html5: true,
  });
  sound.play();
  sound.fade(0.0, 1.0, 5000);
};

const PlaylistTrack = ({ track }) => (
  <li>
    <TrackContainer
      to={{
        pathname: `/track/${track.id}`,
        state: {
          id: `${track.id}`,
          name: `${track.name}`,
          artist: `${track.artists[0].name}`,
          cover: `${track.album.images[1].url}`,
          duration_ms: `${track.duration_ms}`,
          popularity: `${track.popularity}`,
          release_date: `${track.release_date}`,
          genre: `${track.genre}`,
          fromPlaylists: true,
        },
      }}>
      <div>
        <TrackArtwork>
          {track.album.images.length && (
            <TrackImage src={track.album.images[2].url} alt="Album Artwork" />
          )}
          <Mask>
            <svg
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="45.999px"
              height="45.999px"
              viewBox="0 0 45.999 45.999"
              fill="#fff"
              xmlSpace="preserve">
              <path d="M39.264,6.736c-8.982-8.981-23.545-8.982-32.528,0c-8.982,8.982-8.981,23.545,0,32.528c8.982,8.98,23.545,8.981,32.528,0 C48.245,30.281,48.244,15.719,39.264,6.736z M25.999,33c0,1.657-1.343,3-3,3s-3-1.343-3-3V21c0-1.657,1.343-3,3-3s3,1.343,3,3V33z M22.946,15.872c-1.728,0-2.88-1.224-2.844-2.735c-0.036-1.584,1.116-2.771,2.879-2.771c1.764,0,2.88,1.188,2.917,2.771 C25.897,14.648,24.746,15.872,22.946,15.872z"></path>
            </svg>
          </Mask>
        </TrackArtwork>
      </div>
      <TrackMeta>
        <TrackLeft>
          {track.name && <TrackName>{track.name}</TrackName>}
          {track.artists && track.album && (
            <TrackAlbum>
              {track.artists &&
                track.artists.map(({ name }, i) => (
                  <span key={i}>
                    {name}
                    {track.artists.length > 0 && i === track.artists.length - 1
                      ? ""
                      : ","}
                    &nbsp;
                  </span>
                ))}
              &nbsp;&middot;&nbsp;&nbsp;
              {track.album.name}
            </TrackAlbum>
          )}
        </TrackLeft>
        <TrackRight>
          {track.duration_ms && (
            <TrackDuration>{formatDuration(track.duration_ms)}</TrackDuration>
          )}
          {track.preview_url == null ? (
            <div></div>
          ) : (
            <PlayButton
              onMouseEnter={() => soundPlay(track.preview_url)}
              onMouseLeave={() => {
                sound.stop();
              }}></PlayButton>
          )}
        </TrackRight>
      </TrackMeta>
    </TrackContainer>
  </li>
);

export default PlaylistTrack;

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Loader from "./Loader";
import breakpoints from "../styles/breakpoints";

const TrackContainer = styled.div`
  text-align: center;
  justify-content: left;
  align-items: left;
  display: flex;
  grid-template-columns: 1fr 1fr;
  border-bottom: 1px solid grey;
  border-top: 1px solid grey;
`;

const TrackList = styled.ol`
  background-color: black;
  justify-content: space-evenly;
`;

const TrackImage = styled.img`
  width: 60px;
  height: 100%;
`;

const IndexStyling = styled.p`
  font-weight: bold;
  padding-top: 19px;
  padding-left: 25px;
  padding-right: 25px;

  @media only screen and (${breakpoints.device.sm}) {
    padding-left: 15px;
    padding-right: 15px;
    font-size: 0.8rem;
  }
`;

const TextItem = styled.p`
  padding-top: 19px;
  display: flex;
  justify-content: space-evenly;

  @media only screen and (${breakpoints.device.med}) {
    font-size: 0.9rem;
  }

  @media only screen and (${breakpoints.device.sm}) {
    font-size: 0.75rem;
  }
`;

const PageContent = styled.div`
  margin-left: 100px;
  margin-top: 30px;

  @media only screen and (${breakpoints.device.med}) {
    margin-left: 70px;
  }

  @media only screen and (${breakpoints.device.sm}) {
    margin-left: 50px;
  }
`;

const PopularArtists = () => {
  const [popularTracks, setPopularTracks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch("/main/playlist_details/37i9dQZEVXbMDoHDwVN2tF")
      .then((res) => res.json())
      .then((data) => {
        console.log(data.tracks.items);
        setPopularTracks(data.tracks.items);
        setLoading(false);
      })
      .catch((error) => console.log(error));
  }, []);

  var TrackString = "";

  return (
    <div>
      <h1 id="accent">50 Most Popular Songs</h1>
      {loading ? (
        <Loader />
      ) : (
        <PageContent>
          <div style={{ display: "flex" }}>
            <h4 style={{ marginLeft: "165px", padding: "5px 5px" }}>Track</h4>
          </div>

          <div style={{ borderBottom: "1px solid grey" }}></div>
          {popularTracks.map((track, index) => {
            return (
              <div>
                <TrackList>
                  <TrackContainer key={index} track={track}>
                    <div>{console.log(track)}</div>
                    <TrackImage src={track.track.album.images[0].url} />
                    <IndexStyling>{index + 1}</IndexStyling>
                    <TextItem>
                      <strong>{track.track.name} &nbsp;</strong>

                      <p>by {track.track.artists[0].name}</p>
                    </TextItem>
                  </TrackContainer>
                </TrackList>
              </div>
            );
          })}
        </PageContent>
      )}
    </div>
  );
};

export default PopularArtists;

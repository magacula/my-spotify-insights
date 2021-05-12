import React, { useState, useEffect } from "react";
import styled from "styled-components";
import breakpoints from "../styles/breakpoints";
import { Line, Circle } from "rc-progress";

const Margin = styled.div`
  border-top: 2px solid grey;
`;

const P = styled.p`
  font-family: Arial, Helvetica, sans-serif;
  padding-top: 15px;
  padding-bottom: 15px;
`;

const Container = styled.div`
  position: fixed;
  left: 400;

  z-index: 9999;
`;

const CurrentPlayingContainer = styled.div`
  margin-top: 2rem;
`;

const Caption = styled.div`
  margin-left: 110px;

  @media only screen and (${breakpoints.device.med}) {
    margin-left: 90px;
  }

  @media only screen and (${breakpoints.device.sm}) {
    margin-left: 70px;
  }
`;

const TrackCover = styled.img`
  width: 400px;

  @media only screen and (${breakpoints.device.med}) {
    width: 250px;
  }
`;

const PageContent = styled.div`
  margin-left: 150px;

  @media only screen and (${breakpoints.device.sm}) {
    margin-left: 90px;
  }
`;

const ProgressBar = styled(Line)`
  width: 300px;
  padding-top: 15px;

  @media only screen and (${breakpoints.device.sm}) {
    padding-right: 30px;
  }
`;

const CurrentlyPlaying = () => {
  const [currentlyPlaying, setCurrentlyPlaying] = useState([]);
  const [temp, setTemp] = useState(0);
  useEffect(() => {
    setInterval(() => {
      setTemp((prevTemp) => prevTemp + 1);
    }, 1000);
  }, []);

  useEffect(() => {
    fetch("/user/current_playback")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setCurrentlyPlaying(data);
      })
      .catch((error) => console.log(error));
  }, [temp]);

  return (
    <Margin>
      {!Object.keys(currentlyPlaying).length ||
      currentlyPlaying.is_playing == false ? (
        <Caption>Play some music on your spotify app...</Caption>
      ) : (
        <PageContent>
          {currentlyPlaying != null ? (
            <CurrentPlayingContainer>
              <TrackCover
                src={currentlyPlaying.playback_json.item.album.images[0].url}
              />
              <Container>
                <P style={{ fontWeight: "bold" }}>
                  {currentlyPlaying.playback_json.item.name}
                </P>
                <P>{currentlyPlaying.playback_json.item.album.name}</P>
                <P>
                  {currentlyPlaying.playback_json.item.album.artists[0].name}
                </P>
                <div>
                  {console.log(
                    (currentlyPlaying.progress /
                      currentlyPlaying.total_length) *
                      100
                  )}
                  <ProgressBar
                    percent={
                      (currentlyPlaying.progress /
                        currentlyPlaying.total_length) *
                      100
                    }
                    strokeWidth="3"
                    strokeColor="#3be3e3"
                  />
                </div>
              </Container>
            </CurrentPlayingContainer>
          ) : (
            {}
          )}
        </PageContent>
      )}
    </Margin>
  );
};

export default CurrentlyPlaying;

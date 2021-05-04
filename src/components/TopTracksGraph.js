import React from "react";
import styled from "styled-components";
import AudioFeatureChart from "./AudioFeaturesChart";
import AudioFeatureDescriptions from "./AudioFeatureDescriptions";
import breakpoints from "../styles/breakpoints";

const ChartContainer = styled.div`
  padding: 30px;
  margin-bottom: 100px;
  max-width: 1000px;
  margin: 0 auto;

  @media only screen and (${breakpoints.device.lg}) {
    margin-left: 110px;
  }

  @media only screen and (${breakpoints.device.med}) {
    margin-left: 80px;
  }

  @media only screen and (${breakpoints.device.sm}) {
    margin-left: 70px;
  }

  @media only screen and (${breakpoints.device.xs}) {
    margin-left: 60px;
  }
`;

const FeatureDescription = styled.div`
  padding: 30px;
  margin-bottom: 100px;
  font-size: 1.3em;
  margin-left: 110px;

  @media only screen and (${breakpoints.device.med}) {
    margin-left: 80px;
  }

  @media only screen and (${breakpoints.device.sm}) {
    margin-left: 70px;
  }

  @media only screen and (${breakpoints.device.xs}) {
    margin-left: 60px;
  }
`;

const TopTracksGraph = () => {
  return (
    <React.Fragment>
      <h1 id="accent">Audio Features from Top Tracks</h1>

      <ChartContainer>
        <AudioFeatureChart />
      </ChartContainer>

      <FeatureDescription>
        <AudioFeatureDescriptions />
      </FeatureDescription>
    </React.Fragment>
  );
};

export default TopTracksGraph;

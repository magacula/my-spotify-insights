import React from "react";
import styled from "styled-components";
import AudioFeatureChart from "./AudioFeaturesChart";
import AudioFeatureDescriptions from "./AudioFeatureDescriptions";

const ChartContainer = styled.div`
  padding: 30px;
  margin-bottom: 100px;
  max-width: 1200px;
  margin: 0 auto;
`;

const FeatureDescription = styled.div`
  padding: 30px;
  margin-bottom: 100px;
  font-size: 1.3em;
  margin-left: 110px;
  /* text-align: left; */
`;

const TopTracksGraph = () => {
  return (
    <React.Fragment>
      <h1>Audio Features from Top Tracks</h1>

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

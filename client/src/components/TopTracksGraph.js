import React from "react";
import styled from "styled-components";
import AudioFeatureChart from "./AudioFeaturesChart";

const ChartContainer = styled.div`
  padding: 2rem;
`;

const TopTracksGraph = () => {
  return (
    <React.Fragment>
      <h1>Top Tracks Graph</h1>
      <ChartContainer>
        <AudioFeatureChart />
      </ChartContainer>
    </React.Fragment>
  );
};

export default TopTracksGraph;

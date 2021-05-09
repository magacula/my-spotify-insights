import React, { useState, useEffect } from "react";
import styled from "styled-components";
import RecommendedTracks from "./RecommendedTracks";

const Discover = () => {
  return (
    <React.Fragment>
      <h1 id="accent">Discover New Music</h1>
      <RecommendedTracks />
    </React.Fragment>
  );
};

export default Discover;

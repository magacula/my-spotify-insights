import React from "react";
import CurrentlyPlaying from "./CurrentlyPlaying";

const FilmMaker = () => {
  return (
    <div>
      <div>
        <h1>Current Playback</h1>
      </div>
      <div>
        <CurrentlyPlaying />
      </div>
    </div>
  );
};

export default FilmMaker;

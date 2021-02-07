import React, { useState, useEffect } from "react";
import Track from "./Track";

const RecommendedTracks = () => {
  const [recommededTracks, setRecommendedTracks] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/user/recommended_tracks", {
      credentials: "include",
      //referrerPolicy: 'no-referrer-when-downgrade
      headers: {
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.recommended_tracks);
        setRecommendedTracks(data.recommended_tracks);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <React.Fragment>
      <h2>Recommended Tracks Based on Your Top Tracks:</h2>
      <ul style={{ marginLeft: "12rem" }}>
        {recommededTracks.map((track, index) => {
          return (
            <Track key={index} track={track} style={{ marginLeft: "150px" }} />
          );
        })}
      </ul>
    </React.Fragment>
  );
};

export default RecommendedTracks;

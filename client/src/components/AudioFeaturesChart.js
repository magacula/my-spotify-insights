import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";

const AudioFeaturesChart = () => {
  const [chartData, setChartData] = useState({});

  const fetchChartData = () => {
    // function used to get averages of each audio feature
    const avg = (arr) => arr.reduce((a, b) => a + b, 0) / arr.length;

    let acousticness = [];
    let danceability = [];
    let energy = [];
    let speechiness = [];
    let instrumentalness = [];
    let liveness = [];
    let valence = [];

    fetch("http://127.0.0.1:5000/user/top_audio_features", {
      credentials: "include",
      headers: {
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.top_tracks_audio_features);

        for (const dataObj of data.top_tracks_audio_features) {
          acousticness.push(dataObj.acousticness);
          danceability.push(dataObj.danceability);
          energy.push(dataObj.energy);
          speechiness.push(dataObj.speechiness);
          instrumentalness.push(dataObj.instrumentalness);
          liveness.push(dataObj.liveness);
          valence.push(dataObj.valence);
        }

        setChartData({
          data: {
            labels: [
              "acousticness",
              "danceability",
              "energy",
              "speechiness",
              "instrumentalness",
              "liveness",
              "valence",
            ],
            datasets: [
              {
                data: [
                  avg(acousticness),
                  avg(danceability),
                  avg(energy),
                  avg(speechiness),
                  avg(instrumentalness),
                  avg(liveness),
                  avg(valence),
                ],
                backgroundColor: [
                  "rgba(97, 199, 199, 0.7)",
                  "rgba(255, 99, 132, 0.7)",
                  "rgba(255, 159, 64, 0.7)",
                  "rgba(255, 206, 86, 0.7)",
                  "rgba(75, 192, 192, 0.7)",
                  "rgba(54, 162, 235, 0.7)",
                  "rgba(104, 132, 245, 0.7)",
                  "rgba(153, 102, 255, 0.7)",
                ],
              },
            ],
          },
        });
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetchChartData();
  }, []);

  return (
    <div style={{ marginLeft: "110px" }}>
      <Bar
        data={chartData.data}
        options={{
          legend: {
            display: false,
          },
          title: {
            display: true,
            text: `Top Tracks Audio Features (Avg.)`,
            fontSize: 20,
            fontColor: "#ffffff",
            padding: 30,
          },
          scales: {
            xAxes: [
              {
                gridLines: {
                  color: "rgba(255, 255, 255, 0.3)",
                },
                ticks: {
                  fontSize: 12,
                  fontColor: "rgba(255, 255, 255, 0.6)",
                },
              },
            ],
            yAxes: [
              {
                gridLines: {
                  color: "rgba(255, 255, 255, 0.3)",
                },
                ticks: {
                  beginAtZero: true,
                  fontSize: 12,
                },
              },
            ],
          },
        }}
      />
    </div>
  );
};

export default AudioFeaturesChart;

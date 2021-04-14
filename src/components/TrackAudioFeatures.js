import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Chart from "chart.js";
import PropTypes from "prop-types";

const audio_features = [
  "acousticness",
  "danceability",
  "energy",
  "instrumentalness",
  "liveness",
  "speechiness",
  "valence",
];

const Container = styled.div`
  display: grid;
  align-items: center;
  align-content: center;
  justify-items: center;
  margin: 6rem 4rem 4rem 4rem;

  #chart {
    margin: 0 auto;
    max-width: 50vw;
  }
`;

const TrackAudioFeatures = (props) => {
  // get average value of audio features from a user playlist
  const avg = (arr) => arr.reduce((a, b) => a + b, 0) / arr.length;

  useEffect(() => {
    const createDataset = (features) => {
      const dataset = {};

      audio_features.forEach((prop) => {
        dataset[prop] = features.length
          ? avg(features.map((feat) => feat && feat[prop]))
          : features[prop];
      });
      console.log(dataset);
      return dataset;
    };

    const createChart = (dataset) => {
      const { type } = props;
      const ctx = document.getElementById("chart");
      const labels = Object.keys(dataset);
      const data = Object.values(dataset);

      new Chart(ctx, {
        type: type || "bar",
        data: {
          labels,
          datasets: [
            {
              label: "",
              data,
              backgroundColor: [
                "rgba(97, 199, 199, 0.8)",
                "rgba(255, 99, 132, 0.8)",
                "rgba(255, 159, 64, 0.8)",
                "rgba(255, 206, 86, 0.8)",
                "rgba(54, 162, 235, 0.8)",
                "rgba(104, 132, 245, 0.8)",
                "rgba(153, 102, 255, 0.8)",
              ],
              borderWidth: 1,
            },
          ],
        },
        options: {
          layout: {
            padding: {
              left: 0,
              right: 0,
              top: 0,
              bottom: 0,
            },
          },
          title: {
            display: true,
            text: `Audio Features`,
            fontSize: 25,
            fontColor: "#ffffff",
            padding: 30,
          },
          legend: {
            display: false,
          },
          scales: {
            xAxes: [
              {
                gridLines: {
                  color: "rgba(255, 255, 255, 0.3)",
                },
                ticks: {
                  fontSize: 14,
                  fontColor: "rgba(255, 255, 255, 0.8)",
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
                  fontSize: 14,
                  fontColor: "rgba(255, 255, 255, 0.6)",
                },
              },
            ],
          },
        },
      });
    };

    const parseData = () => {
      const { features } = props;
      const dataset = createDataset(features);
      createChart(dataset);
    };

    parseData();
  }, [props]);

  return (
    <Container>
      <canvas id="chart" width="400" height="400" />
    </Container>
  );
};

TrackAudioFeatures.propTypes = {
  features: PropTypes.object,
  type: PropTypes.string,
};

export default TrackAudioFeatures;
